import { Request, Response } from "express";
import {
  getAllUsersService,
  getAllProjectsService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../services/user.service";

export const getAllUser = async (_: Request, res: Response) => {
    const users = await getAllUsersService();
    res.status(200).json(users);
};

export const getAllProjects = async (_: Request, res: Response) => {
    const projects = await getAllProjectsService();
    res.status(200).json(projects);
};

export const createUser = async (req: Request, res: Response) => {
    const user = await createUserService(req.body);

    res.status(200).json({
        message: "User created successfully",
        user,
    });
};

export const updateUser = async (req: Request, res: Response) => {
    const user = await updateUserService(Number(req.params.id), req.body);

    res.status(200).json({
        message: "User updated successfully",
        user,
    });
};

export const deleteUser = async (req: Request, res: Response) => {
    await deleteUserService(Number(req.params.id));

    res.status(200).json({
        message: "User deleted successfully",
    });
};
