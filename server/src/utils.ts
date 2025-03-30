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

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(403).json({ message: "Unauthorized. No token provided." });
      return;
    }

    const token = authorization.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
    return;
  }
};
