import { ConflictError } from "../../lib/utils/errorDefinitions.util.js";
import { Note } from "../schema/note.schema.js";

export const createNote = async (userId, folderId, payload) => {
  const existingNote = await Note.findOne({ title: payload.title });

  if (existingNote)
    throw new ConflictError("You can only have one note with this title");

  const newNote = new Note({
    author: userId,
    folder: folderId,
    ...payload,
  });

  return await newNote.save();
};

export const updateNote = async (id, payload) => {
  const existingNote = await Note.findByIdAndUpdate(id, payload, { new: true });

  return await existingNote.save();
};

export const deleteNote = async (id) => {
  return await Note.findByIdAndDelete(id);
};

export const getNote = async (id) => {
  return await Note.findById(id);
};

export const getNotes = async (userId) => {
  const notes = await Note.find({ author: userId }).populate("folder").exec();

  // const sortedNotes = notes.reduce((acc, note) => {
  //   const folderName = note.folder.name;
  //   if (!acc[folderName]) {
  //     acc[folderName] = [];
  //   }
  //   const { folder, ...rest } = note._doc;
  //   acc[folderName].push(rest);
  //   return acc;
  // }, {});

  // const response = Object.keys(sortedNotes).map((folderName) => ({
  //   folder: folderName,
  //   notes: sortedNotes[folderName],
  // }));

  return notes;
};

export const getFavourites = async (userId) => {
  const notes = await Note.find({ author: userId, favourite: true }).populate(
    "folder"
  );

  return notes;
};

export const getTrashed = async (userId) => {
  const notes = await Note.find({ author: userId, trashed: true })
    .populate("folder")
    .exec();

  return notes;
};

export const getArchived = async (userId) => {
  const notes = await Note.find({ author: userId, archived: true })
    .populate("folder")
    .exec();

  return notes;
};

export const getRecentNotes = async (userId) => {
  const notes = await Note.find({ author: userId }).populate("folder").exec();

  return notes
    .flat()
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 3);
};

export const searchUserNotes = async (userId, query) => {
  const notes = await Note.find({ author: userId, $text: { $search: query } })
    .populate("folder")
    .exec();

  return notes;
};
