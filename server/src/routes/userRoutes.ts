import express from "express";
import {
  signInUser,
  signUpUser,
  getSingleUserDetails,
} from "../controllers/UserController";
import { isAuth } from "../utils";

const userRouter = express.Router();

userRouter.post("/signUp", signUpUser);
userRouter.post("/signIn", signInUser);
userRouter.get("/:userId", isAuth, getSingleUserDetails);

export default userRouter;
