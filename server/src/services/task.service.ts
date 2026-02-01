import { findProjectByIdAndManagerRepo } from "../repositories/project.repository";
import { createTaskRepo, deleteTaskRepo, findProjectByIdRepo, findProjectMemberRepo, findTaskByIdRepo, findTasksByProjectAndUserRepo, findTasksByProjectRepo, updateTaskStatusRepo } from "../repositories/task.repositroy";


export const createTaskService = async (body: any,projectId: number,managerId: number) => {
  const { title, description, assignedTo } = body;

  const project = await findProjectByIdAndManagerRepo(projectId,managerId);
  if(!project) throw new Error("Not your project");

  const member = await findProjectMemberRepo(projectId,assignedTo);
  if(!member)throw new Error("User is not member of this project.");

  return createTaskRepo({title,description,projectId,assignedTo});
};

export const getMyTasksService = (userId: number) => {
  return findTasksByProjectAndUserRepo(userId);
};

export const getTasksOfProjectService = async (projectId: number,managerId: number) => {
  const project = await findProjectByIdAndManagerRepo(projectId,managerId);

  if(!project) throw new Error("Not your project");

  return findTasksByProjectRepo(projectId);
};

export const getAllTasksService = async (projectId: number) => {
  const project = await findProjectByIdRepo(projectId);

  if(!project)throw new Error("Project not found");

  return findTasksByProjectRepo(projectId);
};

export const updateTaskStatusService = async (taskId: number,status: string,userId: number) => {
  const task = await findTaskByIdRepo(taskId);

  if(!task) throw new Error("Task not found");
  if(!task.projectId) throw new Error("Task project not found");
  const project = await findProjectByIdAndManagerRepo(task.projectId,userId);

  const isAssignee = task.assignedTo === userId;
  if (!project && !isAssignee)throw new Error("Forbidden");

  return updateTaskStatusRepo(taskId, status);
};

export const deleteTaskService = async (taskId: number,projectId: number,managerId: number) => {
  const project = await findProjectByIdAndManagerRepo(projectId,managerId);

  if(!project) throw new Error("Not your project");

  const task = await findTaskByIdRepo(taskId);

  if(!task || task.projectId !== projectId) throw new Error("Task not found");

  return deleteTaskRepo(taskId);
};
