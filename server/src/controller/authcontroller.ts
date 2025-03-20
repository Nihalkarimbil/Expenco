import User from "../model/user";
import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const userRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    console.log("registering user");

    const { username, email, password } = req.body;
    console.log(username);

    const bycripted = bcrypt.hashSync(password, 10);
    const user = new User({ username, email, password: bycripted });
    await user.save();
    const token = jwt.sign(
        { id: user._id, email: user.email, name: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );
    const refreshtoken = jwt.sign(
        { id: user._id, email: user.email, name: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );
    res.status(201).json({
        data: { user: user, token: token, refreshtoken: refreshtoken },
        message: "user registered successfully",
        error: false
    });
};

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new CustomError("Invalid credentials", 400));
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        next(new CustomError("Invalid credentials", 400));
    }
    const token = jwt.sign(
        { id: user._id, email: user.email, name: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );
    const refreshtoken = jwt.sign(
        { id: user._id, email: user.email, name: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );
    res.status(200).json({
        data: user,
        message: "user logged in successfully",
        token: token,
        refreshtoken: refreshtoken,
    });
};
