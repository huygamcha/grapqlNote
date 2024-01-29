import { GraphQLScalarType } from "graphql";
import {
  AuthorModel,
  FolderModel,
  NoteModel,
  NotificationModel,
} from "../models/index.js";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();
// lấy query theo context.uid sau đó lấy được folder
//  folder đó chứa AuthorId và sau đó lấy được Author theo authorId

const resolvers = {
  // định nghĩa 1 kiểu dữ liệu mới
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),

  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        createdAt: -1,
      });
      return folders;
    },

    // lấy theo folderId
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const folderValue = await FolderModel.findOne({ _id: folderId });
      return folderValue;
    },

    // lấy theo noteId
    note: async (parent, args) => {
      // return fakeApi.notes.find((note) => note.id === noteId);
      const data = await NoteModel.findOne({ _id: args.noteId });
      return data;
    },
  },

  // xử lí lấy dữ liệu từ Author trong
  // tham số thứ nhất lấy dữ liệu ở trên xuống
  // parent là những phần tử được query ở trên
  Folder: {
    author: async (parent, args) => {
      const authorId = parent.authorId;
      const authorValue = await AuthorModel.findOne({ uid: authorId });
      return authorValue;
      // return fakeApi.authors.find((author) => author.id === authorId);
    },

    // trả về notes theo folderId  = parent.id
    notes: async (parent, args) => {
      // parent trả về những gì đã được query theo context uid ở trên
      // const data = fakeApi.notes.filter((note) => parent.id === note.folderId);
      // return data;

      const data = await NoteModel.find({ folderId: parent.id }).sort({
        updatedAt: -1,
      });
      return data;
    },
  },

  Mutation: {
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({
        ...args,
        authorId: context.uid,
      });
      pubsub.publish("FOLDER_CREATED", {
        folderCreated: {
          message: "A new folder created",
        },
      });
      await newFolder.save();
      return newFolder;
    },

    // đăng kí author theo tài khoản google
    register: async (parent, args) => {
      const foundAuthor = await AuthorModel.findOne({ uid: args.uid });
      if (!foundAuthor) {
        const newAuthor = new AuthorModel(args);
        await newAuthor.save();
      }
      return foundAuthor;
    },
    addNote: async (parent, args) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
    updateNote: async (parent, args) => {
      const noteId = args.id;
      const updateNote = await NoteModel.findByIdAndUpdate(noteId, args);
      return updateNote;
    },
    notification: async (parent, args) => {
      const newNotification = new NotificationModel(args);
      await newNotification.save();
      pubsub.publish("NOTIFICATION", {
        pushNotification: {
          message: args.content,
        },
      });
      return { message: "success" };
    },
  },

  Subscription: {
    folderCreated: {
      subscribe: () => pubsub.asyncIterator(["FOLDER_CREATED"]),
    },
    pushNotification: {
      subscribe: () => pubsub.asyncIterator(["NOTIFICATION"]),
    },
  },
};
export default resolvers;
