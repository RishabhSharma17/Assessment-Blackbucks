import jwt from "jsonwebtoken";

export const generateToken = (userId: number, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET! ?? "Secret", {
    expiresIn: "1d",
  });
};