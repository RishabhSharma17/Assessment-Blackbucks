import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import { errorHandler } from "./middlewares/errorHandler";
import adminRouter from "./routes/admin.routes";
import authRouter from "./routes/auth.routes";
import projectRouter from "./routes/project.routes";
import taskRouter from "./routes/task.routes";

export const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRouter);
app.use('/admin',adminRouter);
app.use('/users',userRouter);
app.use('/projects',projectRouter);
app.use('/tasks',taskRouter);

app.use((_,res) => {
    res.status(404).json({message:"Not Found"});
});

app.use(errorHandler);