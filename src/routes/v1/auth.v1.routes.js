import { Router } from "express";
import {
  getUser,
  login,
  register,
} from "../../app/controllers/auth.controller.js";
import authMiddleware from "../../app/middleware/auth.middleware.js";
const authRouter = Router();

authRouter.post("/sign-up", register);
authRouter.post("/sign-in", login);

export default authRouter;
