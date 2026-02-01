import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { validate } from "../middlewares/validate";
import { asyncHandler } from "../utils/asyncHandler";
import { getMyTasks, updateTaskStatus } from "../controllers/task.controller";
import { updateTaskStatusSchema } from "../types/task.schema";
import { authorize } from "../middlewares/authorize";

const taskRouter = Router();

taskRouter.use(authenticate);

taskRouter.put("/:taskId/status",validate(updateTaskStatusSchema),asyncHandler(updateTaskStatus));
taskRouter.get("/",authorize(["USER"]),asyncHandler(getMyTasks));

export default taskRouter;
