import { NextFunction, Response } from "express"
import { Authrequest } from "./authenticate"

export const authorize = (roles: string[]) => {
    return (req:Authrequest, res:Response, next:NextFunction) => {
        if(!req.user || !roles.includes(req.user.role)){
            return res.status(403).json({ message:"Forbidden" });
        }
        next();
    };
};