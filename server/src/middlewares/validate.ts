import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate = (schema:ZodSchema<any>) => 
    (req:Request, res:Response, next: NextFunction) => {
        try {
            schema.safeParse(req.body);
            next();
        } catch (error: any) {
            return res.status(400).json({
                message:"validation error",
                error:error.errors
            })
        }
}