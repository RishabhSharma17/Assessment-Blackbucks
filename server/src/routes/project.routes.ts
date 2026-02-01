import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  addMemberToProject,
  getMyProjects,
} from "../controllers/project.controller";
import {
  addMemberSchema,
  createProjectSchema,
} from "../types/project.schema";
import { validate } from "../middlewares/validate";
import { asyncHandler } from "../utils/asyncHandler";

import {
  createTask,
  deleteTask,
  getTasksOfProject,
} from "../controllers/task.controller";
import { createTaskSchema } from "../types/task.schema";

const projectRouter = Router();

projectRouter.use(authenticate, authorize(["MANAGER"]));

// Project
projectRouter.get("/", asyncHandler(getMyProjects));
projectRouter.post("/",validate(createProjectSchema),asyncHandler(createProject));
projectRouter.put("/:id",asyncHandler(updateProject));
projectRouter.delete("/:id",asyncHandler(deleteProject));

// Project members
projectRouter.post("/:id/member",validate(addMemberSchema),asyncHandler(addMemberToProject));

// Tasks under project
projectRouter.get("/:projectId/tasks",asyncHandler(getTasksOfProject));
projectRouter.post("/:projectId/tasks",validate(createTaskSchema),asyncHandler(createTask));
projectRouter.delete("/:projectId/tasks/:taskId",asyncHandler(deleteTask));

export default projectRouter;
