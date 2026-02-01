import { Response } from "express";
import { Authrequest } from "../middlewares/authenticate";
import {
  getAllProjectsService,
  createProjectService,
  addMemberToProjectService,
  updateProjectService,
  deleteProjectService,
} from "../services/project.service";

export const getAllProjects = async (req: Authrequest,res: Response) => {
    const projects = await getAllProjectsService(
        req.user!.userId
    );
    res.status(200).json(projects);
};

export const createProject = async (req: Authrequest,res: Response) => {
    const project = await createProjectService(
        req.body,
        req.user!.userId
    );

    res.status(201).json({
        message: "Project created successfully",
        project,
    });
};

export const addMemberToProject = async (req: Authrequest,res: Response) => {
    await addMemberToProjectService(
        Number(req.params.id),
        req.body.userId,
        req.user!.userId
    );

    res.status(200).json({
        message: "Member added successfully",
    });
};

export const updateProject = async (req: Authrequest,res: Response) => {
    const project = await updateProjectService(
        Number(req.params.id),
        req.body,
        req.user!.userId
    );

    res.status(200).json({
        message: "Project updated successfully",
        project,
    });
};

export const deleteProject = async (req: Authrequest,res: Response) => {
    await deleteProjectService(
        Number(req.params.id),
        req.user!.userId
    );

    res.status(200).json({
        message: "Project deleted successfully",
    });
};
