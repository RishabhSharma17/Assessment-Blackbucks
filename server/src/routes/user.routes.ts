import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { createUser, deleteUser, getAllProjects, getAllUser, updateUser } from "../controllers/user.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validate";
import { updateUserSchema, userSchema } from "../types/user.schema";

const userRouter = Router();

userRouter.use(authenticate,authorize(['ADMIN']));

userRouter.get('/',asyncHandler(getAllUser));
userRouter.post('/',validate(userSchema),asyncHandler(createUser));
userRouter.put('/:id',validate(updateUserSchema),asyncHandler(updateUser));
userRouter.delete('/:id',asyncHandler(deleteUser));

export default userRouter;