import * as userService from "./user.service.js";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../lib/utils/errorDefinitions.util.js";
import { verifyPassword } from "../providers/auth/password.auth-provider.js";
import { createToken } from "../providers/auth/jwt.auth-provider.js";
import * as noteService from "./note.service.js";

const createUser = async (payload) => {
  const existingRecord = await userService.findUserByEmail(payload.email);

  if (existingRecord)
    throw new ConflictError("This email address has already been used");

  const user = await userService.createUser(payload);

  return user;
};

const authenticateUser = async (payload) => {
  const user = await userService.findUserByEmail(payload.email);

  if (!user)
    throw new NotFoundError("A user with this email address does not exist");

  const isValidPassword = await verifyPassword(payload.password, user.password);

  if (!isValidPassword)
    throw new UnauthorizedError(
      "Your email or password is not valid please check and try again"
    );

  const token = createToken({
    sub: user._id,
    email: user.email,
    name: user.name,
  });

  const { name, email, _id } = user;

  const response = {
    user: {
      id: _id,
      name,
      email,
      notes: await noteService.getNotes(user._id),
      favourites: await noteService.getFavourites(user._id),
      trashed: await noteService.getTrashed(user._id),
      archived: await noteService.getArchived(user._id),
      recentNotes: await noteService.getRecentNotes(user._id),
    },
    authorization: {
      type: "bearer",
      token,
    },
  };

  return response;
};

export { createUser, authenticateUser };
