import express, { query } from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./resolvers/index.js";
import "./firebaseConfig.js";
import { getAuth } from "firebase-admin/auth";

const app = express();
const httpServer = http.createServer(app);

const URL = `mongodb+srv://${process.env.BD_NAME}:${process.env.BD_PASSWORD}@cluster0.gvne4zq.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;

const typeDefs = `#graphql
    scalar Date

    type Folder {
        id: String,
        name: String,
        createdAt: String,
        author: Author,
        notes: [Note]
    }

    type Author {
        uid: String,
        name: String,
    }

    type Note {
        id: String,
        content: String
        updatedAt: Date,
    }
    
    type Query {
        folders: [Folder],
        folder(folderId: String): Folder,
        note(noteId: String): Note
    }

    type Mutation {
        register(uid: String!, name: String!): Author
        addFolder(name: String!): Folder,
        addNote(content: String, folderId: String!): Note
        deleteNote(id: String!): Note
        deleteFolder(id: String!): Folder
        updateNote(content: String!, id: String!): Note
        notification(content: String): Message
        updateFolder(id: String!, name: String!): Folder
    }

    type Message {
        message: String
    }

    type Subscription {
       folderCreated: Message
       pushNotification: Message
    }


`;
const schema = makeExecutableSchema({ typeDefs, resolvers });

// 3 type chính gồm Query, Mutation, Subscription

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: "/",
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }), // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();
const authorizationJWT = async (req, res, next) => {
  // console.log(
  //   "««««« req.headers.authorization »»»»»",
  //   req.headers.authorization
  // );
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(" ")[1];

    // hàm decode token
    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        console.log("««««« decodedToken »»»»»", decodedToken);
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch((error) => {
        console.log(error);
        res.status(401).json({ message: "Forbidden", error: error });
      });
  } else {
    // return res.status(403).json({ message: "Unauthorized" });
    next();
  }
};
app.use(
  cors(),
  authorizationJWT,
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid };
    },
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(URL).then(async () => {
  console.log("Connected to DB");
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log("🚀 Server ready at http://localhost:4000");
});
