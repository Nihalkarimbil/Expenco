import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./src/routes/authrouter";
import errorHandler from "./src/middleware/errorhandler";
import ExpenceRoute from "./src/routes/expenceRoute";
import budgetroute from "./src/routes/budgetrout";

dotenv.config(); 

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"], 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/exp",ExpenceRoute)
app.use("/api/budg",budgetroute)
app.use(errorHandler);



if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables.");
}


const PORT=5000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
