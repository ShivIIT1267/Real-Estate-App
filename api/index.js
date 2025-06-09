import express from "express";
import mongoose, { mongo, MongooseError } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.user.js";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// here we create an api route
// initially we are running our front end in the 5173 but the backend in the 3000, so this response will be in the 300 port
// but we can create a proxy which will help us go to 3000 directly

// we dont create such api routs for all the pages, instead we will go to another folder and create api routes over there

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
