import { Schema, model } from "mongoose";

export const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    trashed: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    folder: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
  },
  { timestamps: true }
);

NoteSchema.index({
  title: "text",
  content: "text",
});

export const Note = model("Note", NoteSchema);
