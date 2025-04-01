import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Post, PostModel } from "../models/PostModel";
import mongoose from "mongoose";
import { Ref } from "@typegoose/typegoose";
import { User } from "../models/UserModel";

export const getAllPostsToDisplayInFeed = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const postList = await PostModel.find();

      res.status(200).json({ data: postList });
    } catch (error) {
      console.log("Error in get all posts :", error);
      res.status(500).json({ message: "Server error." });
    }
  }
);

export const getSinglePostData = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;

      const singlePost = await PostModel.findById(postId);

      if (!singlePost) {
        res.status(404).json({ message: "No post was found." });
        return;
      }

      res.status(200).json({ data: singlePost });
    } catch (error) {
      console.log("Error in getSinglePost :", error);
      res.status(500).json({ message: "Server error." });
    }
  }
);

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

export const addNewComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { text } = req.body;
    const { postId } = req.params;
    const userId = req.user;

    try {
      const post = await PostModel.findById(postId);

      if (!post) {
        res.status(404).json({ message: "No existing post was found." });
        return;
      }

      const newComment = {
        userId,
        text,
        createdAt: new Date(),
      };

      post.comments.push(newComment as any);

      await post.save();

      res.status(201).json({ message: "Comment added", data: post });
    } catch (error) {
      console.log("Error in adding a new Comment :", error);
      res.status(500).json({ message: "Server error." });
    }
  }
);

// delete a comment - API

// edit a comment - API
