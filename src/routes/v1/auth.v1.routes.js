import { Router } from "express";
import {
  getAuthenticatedUserData,
  login,
  register,
} from "../../app/controllers/auth.controller.js";
import authMiddleware from "../../app/middleware/auth.middleware.js";
const authRouter = Router();

authRouter.post("/sign-up", register);
authRouter.post("/sign-in", login);
authRouter.get("/user-data", authMiddleware, getAuthenticatedUserData);

export default authRouter;
