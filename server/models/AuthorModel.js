import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AuthorModel = new mongoose.model("author", authorSchema);
export default AuthorModel;
