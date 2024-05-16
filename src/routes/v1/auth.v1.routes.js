import { Router } from "express";
import { login, register } from "../../app/controllers/auth.controller.js";
const authRouter = Router();

authRouter.post("/sign-up", register);
authRouter.post("/sign-in", login);

export default authRouter;
