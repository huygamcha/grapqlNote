import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FolderModel = mongoose.model("folder", folderSchema);
export default FolderModel;
