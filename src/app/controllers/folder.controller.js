import { asyncHandler } from "../../lib/utils/asyncHandler.util.js";
import { ValidationError } from "../../lib/utils/errorDefinitions.util.js";
import inputValidator from "../../lib/utils/inputValidator.util.js";
import { CreateFolderRequest } from "../requests/create-folder.request.js";
import * as folderService from "../services/folder.service.js";

export const createNewFolder = asyncHandler(async (req, res, next) => {
  const errors = inputValidator(CreateFolderRequest, req.body);

  if (errors)
    throw new ValidationError("Your folder could not be created.", errors);

  const folder = await folderService.createFolder(req.user.sub, req.body);

  res.status(201).json({
    success: true,
    message: "Folder created successfully",
    data: {
      folder,
    },
  });
});

export const getUserFoldersAndNotes = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const folders = await folderService.getUserFolders(user.sub);

  res.status(200).json({
    success: true,
    message: "Folders and notes retrieved successfully",
    data: {
      folders,
    },
  });
});

export const updateFolder = asyncHandler(async (req, res, next) => {
  const errors = inputValidator(CreateFolderRequest, req.body);

  if (errors)
    throw new ValidationError("Your folder name could not be updated", errors);

  const { id } = req.params;

  const folder = await folderService.updateFolder(id, req.body);

  res.status(200).json({
    success: true,
    message: "Folder updated successfully",
    data: {
      folder,
    },
  });
});

export const deleteFolder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await folderService.deleteFolder(id);

  res.status(204).json({
    success: true,
    message: "Folder deleted successfully",
  });
});
