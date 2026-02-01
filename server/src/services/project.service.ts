import {
  findProjectsByManagerRepo,
  createProjectRepo,
  findProjectByIdAndManagerRepo,
  addMemberRepo,
  updateProjectRepo,
  deleteProjectRepo,
} from "../repositories/project.repository";

export const getAllProjectsService = (managerId: number) => {
    return findProjectsByManagerRepo(managerId);
};

export const createProjectService = (body: any,managerId: number) => {
    const { name, description } = body;
    return createProjectRepo({
        name,
        description,
        createdBy: managerId,
    });
};

export const addMemberToProjectService = async (projectId: number,userId: number,managerId: number) => {
    const project = await findProjectByIdAndManagerRepo(projectId,managerId);

    if(!project) throw new Error("Project not found");

    return addMemberRepo(projectId, userId);
};

export const updateProjectService = async (projectId: number,body: any,managerId: number) => {
    const project = await findProjectByIdAndManagerRepo(projectId,managerId);

    if(!project) throw new Error("Project not found");

    return updateProjectRepo(projectId, body);
};

export const deleteProjectService = async (projectId: number,managerId: number) => {
    const project = await findProjectByIdAndManagerRepo(projectId,managerId);

    if(!project) throw new Error("Project not found");

    return deleteProjectRepo(projectId);
};
