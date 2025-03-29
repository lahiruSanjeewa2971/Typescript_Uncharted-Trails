import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import userRouter from "./routes/userRoutes";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.DB_CONNECTION;

mongoose.set("strictQuery", true);

const app = express();
app.use(express.json());

mongoose
  .connect(MONGO_URL!)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(() => {
    console.log("Cannot connect to the mongoDB");
  });

app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
