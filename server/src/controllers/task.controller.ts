import { Response } from "express";
import { Authrequest } from "../middlewares/authenticate";
import {
  createTaskService,
  deleteTaskService,
  getMyTasksService,
  getTasksOfProjectService,
  updateTaskStatusService,
} from "../services/task.service";

export const createTask = async (req: Authrequest, res: Response) => {
    const projectId = Number(req.params.projectId);
    const managerId = Number(req.user!.userId);

    const task = await createTaskService(req.body,projectId,managerId);

    res.status(201).json({
        message: "Task created successfully",
        task,
    });
};

export const getMyTasks = async (req: Authrequest, res: Response) => {
    const userId = Number(req.user!.userId);

    const tasks = await getMyTasksService(userId);

    res.status(200).json(tasks);
};

export const getTasksOfProject = async (req: Authrequest,res: Response) => {
    const projectId = Number(req.params.projectId);
    const managerId = Number(req.user!.userId);

    const tasks = await getTasksOfProjectService(projectId,managerId);

    res.status(200).json(tasks);
};

export const updateTaskStatus = async (req: Authrequest,res: Response) => {
    const taskId = Number(req.params.taskId);
    const { status } = req.body;
    const userId = Number(req.user!.userId);

    await updateTaskStatusService(taskId, status, userId);

    res.status(200).json({
        message: "Task updated successfully",
    });
};

export const deleteTask = async (req: Authrequest,res: Response) => {
    const projectId = Number(req.params.projectId);
    const taskId = Number(req.params.taskId);
    const managerId = Number(req.user!.userId);

    await deleteTaskService(taskId, projectId, managerId);

    res.status(200).json({
        message: "Task deleted successfully",
    });
};
