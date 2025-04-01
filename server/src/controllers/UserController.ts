import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel";
import { generateToken } from "../utils";

export const getSingleUserDetails = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userDetails = await UserModel.findById(userId);

      if (!userDetails) {
        res.status(404).json({ message: "No user found." });
        return;
      }

      res.status(200).json({ data: userDetails });
    } catch (error) {
      console.log("Error in getting single user details :", error);
      res.status(500).json({ message: "Server error." });
    }
  }
);

export const signInUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    res.status(404).json({ message: "No user found." });
    return;
  }

  if (bcrypt.compareSync(password, user.password)) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
    return;
  } else {
    res.status(400).json({ message: "Invalid credentials." });
    return;
  }
});

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
