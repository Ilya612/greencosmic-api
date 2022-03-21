import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./router.js";
import errorMiddleware from "./Middleware/errorMiddleware.js";

dotenv.config();

const PORT = 3002;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://greencosmic-study-l6vh5k26n-ilya612.vercel.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
/*
app.use(
  cors({
    origin: "https://greencosmic-study-3jh7sj0yu-ilya612.vercel.app",
    credentials: true,
    methods: ["GET", "POST"],
  })
);*/
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log("vse zaebcom " + PORT);
    });
  } catch (error) {
    throw new Error();
  }
};

start();
