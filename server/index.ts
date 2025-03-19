import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import errorHandler from "./src/middleware/errorhandler";
import cors from "cors";
import authRouter from "./src/routes/authrouter";

dotenv.config();

const server = express();


const corsOptions = {
    origin: process.env.FRONTENT_URI,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', "X-MongoDb-Id"],
    credentials: true,
};
server.use(express.json());
server.use(errorHandler);
server.use(cors(corsOptions));
server.use("/auth", authRouter);



mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
const PORT: number = 5000;

server.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
