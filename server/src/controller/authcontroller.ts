
import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prisma";

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("registering user");

  const { username, email, password } = req.body;
  console.log(username);

  const bycripted = bcrypt.hashSync(password, 10);
  const user= await prisma.user.create({
    data:{
      username:username,
      email:email,
      password:bycripted
    }
  })
  
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
  const refreshtoken = jwt.sign(
    { id: user.id, email: user.email, name: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
  res.status(201).json({
    data: { user: user, token: token, refreshtoken: refreshtoken },
    message: "user registered successfully",
    error: false,
  });
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await prisma.user.findUnique({where :{email:email}});
  if (!user) {
    return next(new CustomError("Invalid credentials", 400));
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 400));
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
  const refreshtoken = jwt.sign(
    { id: user.id, email: user.email, name: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
  res.status(200).json({
    data: { user: user, token: token, refreshtoken: refreshtoken },
    message: "user logged in successfully",
  });
};
