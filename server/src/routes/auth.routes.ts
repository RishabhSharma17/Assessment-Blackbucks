import { Router } from "express";
import { authSchema } from "../types/auth.schema";
import { validate } from "../middlewares/validate";
import { login, logout } from "../controllers/auth.controller";
import { ZodType } from "zod";
import { asyncHandler } from "../utils/asyncHandler";

const authRouter = Router();

authRouter.post('/login', validate(authSchema), asyncHandler(login));
authRouter.post('/logout',asyncHandler(logout));

export default authRouter;