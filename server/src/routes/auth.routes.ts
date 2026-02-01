import { Router } from "express";
import { authSchema } from "../types/auth.schema";
import { validate } from "../middlewares/validate";
import { login, logout, me } from "../controllers/auth.controller";
import { ZodType } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middlewares/authenticate";

const authRouter = Router();

authRouter.get('/me',authenticate,asyncHandler(me));
authRouter.post('/login', validate(authSchema), asyncHandler(login));
authRouter.post('/logout',asyncHandler(logout));

export default authRouter;