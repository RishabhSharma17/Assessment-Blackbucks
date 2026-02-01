import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { db } from "../db";
import { users, roles } from "../db/schema";
import { eq } from "drizzle-orm";
import { Authrequest } from "../middlewares/authenticate";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await db
    .select({
      userId: users.id,
      userName: users.name,
      userEmail: users.email,
      userPassword: users.password,
      roleId: roles.id,
      roleName: roles.name,
    })
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id))
    .where(eq(users.email, email));

  const row = result[0];

  if (!row) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, row.userPassword);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(row.userId, row.roleName ?? "USER");

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  
  const safeUser = {
    id: row.userId,
    name: row.userName,
    email: row.userEmail,
    role: {
      id: row.roleId,
      name: row.roleName,
    },
  };

  res.json({
    message: "Logged in successfully",
    user: safeUser,
  });
};


export const logout = async (_: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logged out successfully",
  });
};

export const me = async (req: Authrequest, res: Response) => {
  const userId = Number(req.user!.userId);

  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: roles.name,
    })
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id))
    .where(eq(users.id, userId));

  res.json(result[0]);
};
