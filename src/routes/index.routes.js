import { Router } from 'express'
import authRouter from './v1/auth.v1.routes.js';
const router = Router()

// Version 1 routes
router.all('/v1/auth').get('/register').post('/sign');

export const appRouter = router;