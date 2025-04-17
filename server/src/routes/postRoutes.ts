import express from "express";
import { addNewComment, toggleLike } from "../controllers/PostContriller";
import {
  createPost,
  getAllPostsToDisplayInFeed,
  getSinglePostData,
} from "../controllers/PostController";
import { isAuth } from "../utils";

const postRouter = express.Router();

postRouter.post("/", isAuth, createPost);
postRouter.post("/:postId/like", isAuth, toggleLike);
postRouter.post("/:postId/comment", isAuth, addNewComment);
postRouter.get("/", getAllPostsToDisplayInFeed);
postRouter.get("/:postId", isAuth, getSinglePostData);

export default postRouter;
