import bcrypt from "bcrypt";
import {
  findAllUsersRepo,
  findAllProjectsRepo,
  findRoleByNameRepo,
  createUserRepo,
  updateUserRepo,
  deleteUserRepo,
} from "../repositories/user.repository";

export const getAllUsersService = () => {
  return findAllUsersRepo();
};

export const getAllProjectsService = () => {
  return findAllProjectsRepo();
};

export const createUserService = async (body: any) => {
    const { name, email, password, role } = body;
    const roleRecord = await findRoleByNameRepo(role);

    if (!roleRecord) throw new Error("Invalid role");

    const hashed = await bcrypt.hash(password, 10);

    return createUserRepo({
        name,
        email,
        password: hashed,
        roleId: roleRecord.id,
    });
};

export const updateUserService = async (id: number, body: any) => {
    const data = { ...body };
    if (data.role) {
        const roleRecord = await findRoleByNameRepo(data.role);

        if (!roleRecord) throw new Error("Invalid role");

        data.roleId = roleRecord.id;
        delete data.role;
    }

    return updateUserRepo(id, data);
};

export const deleteUserService = (id: number) => {
    return deleteUserRepo(id);
};
