import { Router } from "express";
import { createNewFolder, deleteFolder, getUserFoldersAndNotes, updateFolder } from "../../app/controllers/folder.controller.js";
import authMiddleware from "../../app/middleware/auth.middleware.js";
const folderRouter = Router();

folderRouter.post('/', authMiddleware, createNewFolder);
folderRouter.get('/', authMiddleware, getUserFoldersAndNotes);
folderRouter.put('/:id', authMiddleware, updateFolder)
folderRouter.delete('/:id', authMiddleware, deleteFolder);

export default folderRouter;