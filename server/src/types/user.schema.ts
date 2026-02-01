import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(["ADMIN", "MANAGER", "USER"])
});

export const updateUserSchema = z.object({
    name: z.string().min(2),
    email: z.email().optional(),
    role: z.enum(['ADMIN','USER','MANAGER']).optional()
});