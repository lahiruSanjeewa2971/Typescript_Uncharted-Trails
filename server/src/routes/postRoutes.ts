import express from "express";
import { createPost, toggleLike } from "../controllers/PostContriller";
import { isAuth } from "../utils";

const postRouter = express.Router();

postRouter.post("/", isAuth, createPost);
postRouter.post("/:postId/like", isAuth, toggleLike);

export default postRouter;
