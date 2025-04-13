/**
|--------------------------------------------------
| This will receive HTTP requests, process them, and call the service layer to perform business logic.
|--------------------------------------------------
*/

import { Request, Response } from "express";
import { postService } from "../services/PostService";
import asyncHandler from "express-async-handler";

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { title, description, images, location } = req.body;
    const userId = req.user?._id;

    const post = await postService.create({
      title,
      description,
      images,
      userId,
      location: location
        ? { latitude: location.latitude, longitude: location.longitude }
        : { latitude: 0, longitude: 0 },
    });

    res
      .status(201)
      .json({ message: "New post created successfully.", data: post });
  } catch (error) {
    console.log("Error in creating a post :", error);
    res.status(500).json({ message: "Something went wrong.", error: error });
  }
});

export const getAllPostsToDisplayInFeed = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const posts = await postService.getAll();
      res.status(200).json({ data: posts });
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
      const singlePost = await postService.getSinglePostData(postId);
      if (!singlePost) {
        res.status(404).json({ message: "No post was found." });
        return;
      }

      res.status(200).json({ data: singlePost });
    } catch (error) {
      console.log("Error in get single posts :", error);
      res.status(500).json({ message: "Server error." });
    }
  }
);
