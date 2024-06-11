import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
const app = new express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credential: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

export { app };
