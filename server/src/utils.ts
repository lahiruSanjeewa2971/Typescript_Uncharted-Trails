import { User } from "./models/UserModel";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "8h",
    }
  );
};
