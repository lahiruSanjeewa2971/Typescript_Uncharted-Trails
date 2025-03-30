import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Post, PostModel } from "../models/PostModel";
import mongoose from "mongoose";
import { Ref } from "@typegoose/typegoose";
import { User } from "../models/UserModel";

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { title, description, images, location } = req.body;
    const userId = req.user?._id;

    if (
      !title ||
      !description ||
      !images ||
      !Array.isArray(images) ||
      images.length === 0
    ) {
      res.status(400).json({
        message: "Title, description, and at least one image are required",
      });
      return;
    }

    const newPost = new PostModel({
      title,
      description,
      images,
      userId,
      location: location
        ? { latitude: location.latitude, longitude: location.longitude }
        : undefined,
    });

    await newPost.save();

    res
      .status(200)
      .json({ message: "New post created successfully.", data: newPost });
    return;
  } catch (error) {
    console.log("Error in creating a post :", error);
    res.status(500).json({ message: "Something went wrong", error: error });
  }
});

export const toggleLike = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const post = await PostModel.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    let likesArray = post.likes as unknown as mongoose.Types.ObjectId[];

    const likesStringArray = likesArray.map((id) => id.toString());
    const userIdString = userId.toString();

    if (likesStringArray.includes(userIdString)) {
      likesArray = likesArray.filter((id) => id.toString() !== userIdString);
    } else {
      likesArray.push(userId);
    }

    // Assign the updated likes array back to post.likes as Ref<User>
    post.likes = likesArray as unknown as Ref<User>[];

    await post.save();

    res.json({ message: "Like status toggled", likes: post.likes.length });
  } catch (error) {
    console.log("Error in like a post", error);
    res.status(500).json({ message: "Server error." });
  }
});
