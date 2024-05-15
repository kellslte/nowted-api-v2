import { Router } from "express";
const authRouter = Router()

authRouter.post('/sign-up');
authRouter.post('/sign-in');
authRouter.post('/forgot-password');
authRouter.post('/reset-password');

export default authRouter;