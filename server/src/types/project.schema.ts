import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(5)
});

export const addMemberSchema = z.object({
    userId : z.number()
})