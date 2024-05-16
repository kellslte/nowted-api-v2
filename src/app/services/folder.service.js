import { ConflictError } from "../../lib/utils/errorDefinitions.util.js";
import { Folder } from "../schema/folder.schema.js";
import { Note } from "../schema/note.schema.js";

const createFolder = async (userId, {name}) => {
  const existingFolder = await Folder.findOne({ name });

  if (existingFolder)
    throw new ConflictError(
      "A folder with this name already exists, you can only have one folder with this name"
    );

  const newFolder = new Folder({ user:userId, name });
  return await newFolder.save();
};

const updateFolder = async (id, payload) => {
  const folder = await Folder.findByIdAndUpdate(
    id,
    { name: payload.name },
    { new: true }
  );
  return await folder.save();
};

const deleteFolder = async (id) => {
  const folder = await Folder.findByIdAndDelete(id);
  return folder;
};

const getUserFolders = async (id) => {
  const folders = await Folder.find({ user: id });
  return folders;
};

export {
  createFolder,
  updateFolder,
  deleteFolder,
  getUserFolders
};
