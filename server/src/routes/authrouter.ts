import express from "express";
import { userLogin, userRegister } from "../controller/authcontroller";
import tryCatch from "../middleware/tryCatch";


const authRouter = express.Router();

authRouter
    .post("/register",tryCatch(userRegister))
    .post("/login",tryCatch(userLogin))


export default authRouter