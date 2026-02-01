import { api } from "./axios";

export const getAllProjectsAdmin = async () => {
  const res = await api.get("/admin/projects");
  return res.data;
};

export const getMyProjects = async () => {
  const res = await api.get("/projects/");
  console.log(res.data);
  return res.data;
};

export const createProject = async (data: any) => {
  const res = await api.post("/projects", data);
  return res.data;
};

export const addMember = async (projectId: string, userId: string) => {
  await api.post(`/projects/${projectId}/member`, { userId });
};

export const getProjectTasks = async (projectId: string) => {
  const res = await api.get(`/projects/${projectId}/tasks`);
  return res.data;
};

export const createTask = async (projectId: string, data: any) => {
  await api.post(`/projects/${projectId}/tasks`, data);
};

export const updateTaskStatus = async (
  taskId: string,
  status: string
) => {
  await api.put(`/tasks/${taskId}/status`, { status });
};

export const getMyTasks = async () => {
  const res = await api.get("/tasks/");
  return res.data;
};
