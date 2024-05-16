import { asyncHandler } from "../../lib/utils/asyncHandler.util.js";
import { ValidationError } from "../../lib/utils/errorDefinitions.util.js";
import inputValidator from "../../lib/utils/inputValidator.util.js";
import * as folderService from "../services/folder.service.js";
import * as noteService from "../services/note.service.js";
import { CreateNoteRequest } from "../requests/create-note.request.js";

export const createNote = asyncHandler(async (req, res, next) => {
    const payload = {
        author: req.user.sub,
        ...req.body
    };

  const errors = inputValidator(CreateNoteRequest, payload);

  if (errors)
    throw new ValidationError("Your note could not be created", errors);

  const note = await noteService.createNote(
    req.user.sub,
    req.params.folderId,
    req.body
  );

  return res.status(201).json({
    success: true,
    message: 'Note created successfully',
    data: {
      note
    },
  });
});

export const getAllNotesInAFolder = asyncHandler(async (req, res, next) => {
    const notes = await noteService.getNotes(req.user.sub, req.params.folderId);

    return res.status(200).json({
        success: true,
        message: 'Notes retrieved successfully',
        data: {
            notes
        }
    });
})

export const updateNote = asyncHandler(async (req, res, next) => {
  const errors = inputValidator(CreateNoteRequest, {
    author: req.user.sub,
    ...req.body,
  });

  if (errors)
    throw new ValidationError("Your note could not be updated", errors);

  const note = await noteService.updateNote(req.params.noteId, req.body)

  return res.status(200).json({
    success: true,
    message: 'Note updated successfully',
    data: {
      note,
    },
  });
});

export const deleteNote = asyncHandler(async (req, res, next) => {
    await noteService.deleteNote(req.params.noteId);

    return res.status(200).json({
      success: true,
      message: 'Note successfully deleted',
    });
});

export const getSingleNote = asyncHandler(async (req, res, next) => {
    const note = await noteService.getNote(req.params.noteId);

    return res.status(200).json({
        success: true,
        message: 'Note retrieved successfully',
        data: {
            note
        }
    })
});

export const getFavouriteNotes = asyncHandler(async (req, res, next) => {
    const notes = await noteService.getFavourites(req.user.sub);

    return res.status(200).json({
        success: true,
        message: 'Notes retrieved successfully',
        data: {
            notes
        }
    })
});

export const getArchivedNotes = asyncHandler(async (req, res, next) => {
    const notes = await noteService.getArchived(req.user.sub);

    return res.status(200).json({
      success: true,
      message: "Notes retrieved successfully",
      data: {
        notes,
      },
    });
})

export const getTrashedNotes = asyncHandler(async (req, res, next) => {
    const notes = await noteService.getTrashed(req.user.sub);

    return res.status(200).json({
        success: true,
        message: 'Notes retrieved successfully',
        data: {
            notes
        }
    })
});

export const restoreNote = asyncHandler(async (req, res, next) => {
    const note = await noteService.updateNote(req.params.noteId, {
        trashed: false,
    });

    return res.status(200).json({
        success: true,
        message: 'Note restored successfully',
        data: {
            note
        }
    })
});

export const unarchiveNote = asyncHandler(async (req, res, next) => {
    const note = await noteService.updateNote(req.params.noteId, {
        archived: false,
    });

    return res.status(200).json({
        success: true,
        message: 'Note unarchived successfully',
        data: {
            note
        }
    })
});

export const removeFromFavourites = asyncHandler(async (req, res, next) => {
     const note = await noteService.updateNote(req.params.noteId, {
       favourite: false,
     });

     return res.status(200).json({
       success: true,
       message: "Note removed from favourites successfully",
       data: {
         note,
       },
     });
});

export const addToFavourites = asyncHandler(async (req, res, next) => {
    const note = await noteService.updateNote(req.params.noteId, {
        favourite: true,
    });

    return res.status(200).json({
        success: true,
        message: "Note added to favourites successfully",
        data: {
            note,
        },
    });
});

export const getRecentNotes = asyncHandler(async (req, res, next) => {
    const notes = await noteService.getRecentNotes(req.user.sub);

    return res.status(200).json({
        success: true,
        message: 'Notes retrieved successfully',
        data: {
            notes
        }
    })
});

export const searchNotes = asyncHandler(async (req, res, next) => {
    const notes = await noteService.searchUserNotes(req.user.sub, req.query.s);

    return res.status(200).json({
        success: true,
        message: 'Notes retrieved successfully',
        data: {
            notes
        }
    })
});