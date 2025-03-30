import express from "express";
import { signInUser, signUpUser } from "../controllers/UserController";

const userRouter = express.Router();

userRouter.post("/signUp", signUpUser);
userRouter.post("/signIn", signInUser);

export default userRouter;
