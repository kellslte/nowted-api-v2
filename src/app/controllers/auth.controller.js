import { asyncHandler } from "../../lib/utils/asyncHandler.util.js";
import { ValidationError } from "../../lib/utils/errorDefinitions.util.js";
import inputValidator from "../../lib/utils/inputValidator.util.js";
import { LoginRequest } from "../requests/login.request.js";
import { RegisterRequest } from "../requests/register.request.js";
import * as authService from "../services/auth.service.js";
import * as noteService from '../services/note.service.js';

export const login = asyncHandler(async (req, res, next) => {
  // check the request body and make sure the required keys are there
  const errors = inputValidator(LoginRequest, req.body);

  if (errors)
    throw new ValidationError(
      "The request failed with the following errors",
      errors
    );

  const token = await authService.authenticateUser(req.body);

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    authorization: {
      type: "bearer",
      token,
    },
  });
});

export const register = asyncHandler(async (req, res, next) => {
  // check the request body and make sure the required keys are there
  const errors = inputValidator(RegisterRequest, req.body);

  if (errors)
    throw new ValidationError(
      "The request failed with the following errors",
      errors
    );

  const user = await authService.createUser(req.body);

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: {
      user,
    },
  });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const notes = await noteService.getNotes(user.sub);
  const favourites = await noteService.getFavourites(user.sub);
  const trashed = await noteService.getTrashed(user.sub);
  const archived = await noteService.getArchived(user.sub);
  const recentNotes = await noteService.getRecentNotes(user.sub);

  return res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: {
      user,
      notes,
      favourites,
      trashed,
      archived,
      recentNotes
    }
  })
})
