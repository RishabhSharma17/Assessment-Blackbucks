import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(3),
    assignedTo: z.number(),
});

export const updateTaskStatusSchema = z.object({
    status: z.enum(['TO-DO','IN-PROGRESS','DONE'])
})