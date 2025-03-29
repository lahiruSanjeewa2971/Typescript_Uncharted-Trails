import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel";
import { generateToken } from "../utils";

export const signUpUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  // Check if user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User already exists." }); // ✅ Added return to stop execution
    return;
  }

  // Hash password asynchronously
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = await UserModel.create({
    email,
    name,
    password: hashedPassword, // ✅ Store hashed password
  });

  if (!newUser) {
    res.status(500).json({ message: "Something went wrong." });
    return;
  }

  // Send response with user data
  res.status(201).json({
    message: "New user has been created.",
    data: {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      token: generateToken(newUser),
    },
  });
});
