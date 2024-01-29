import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    folderId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NoteModel = new mongoose.model("note", noteSchema);
export default NoteModel;
