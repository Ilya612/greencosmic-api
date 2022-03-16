import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./router.js";
import errorMiddleware from "./Middleware/errorMiddleware.js";

dotenv.config();

const PORT = 3002;

/*const DB_URL =
  "mongodb+srv://Jobs_Sneakers:a2tmi0fap5PIOBW4@cluster0.vugol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
*/
const app = express();

/*app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
    "Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});*/
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://greencosmic-study-1i4soiig5-ilya612.vercel.app",
  })
);
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
