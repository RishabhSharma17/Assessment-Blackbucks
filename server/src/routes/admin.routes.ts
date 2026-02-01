import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getAllProjects } from "../controllers/user.controller";

const adminRouter = Router();

adminRouter.get('/projects',asyncHandler(getAllProjects));

export default adminRouter;