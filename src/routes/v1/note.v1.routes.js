import { Router } from "express";
import authMiddleware from "../../app/middleware/auth.middleware.js";
import {
  createNote,
  deleteNote,
  getAllNotesInAFolder,
  getArchivedNotes,
  getFavouriteNotes,
  getRecentNotes,
  getSingleNote,
  getTrashedNotes,
  searchNotes,
  updateNote,
} from "../../app/controllers/note.controller.js";
const notesRouter = Router();

notesRouter.get("/:folderId", authMiddleware, getAllNotesInAFolder);
notesRouter.post("/:folderId", authMiddleware, createNote);
notesRouter.put("/:noteId", authMiddleware, updateNote);
notesRouter.delete("/:noteId", authMiddleware, deleteNote);
notesRouter.get("/:noteId", authMiddleware, getSingleNote);
notesRouter.get("/favourites/all", authMiddleware, getFavouriteNotes);
notesRouter.get('/archived/all', authMiddleware, getArchivedNotes);
notesRouter.get("/trashed/all", authMiddleware, getTrashedNotes);
notesRouter.get("/recents/all", authMiddleware, getRecentNotes);
notesRouter.get("/search/all", authMiddleware, searchNotes);

export default notesRouter;
