import express from "express";
import { signUpUser } from "../controllers/UserController";

const userRouter = express.Router();

userRouter.post("/signUp", signUpUser);

export default userRouter;
