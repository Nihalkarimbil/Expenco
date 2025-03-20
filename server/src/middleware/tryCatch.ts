import { Request, Response, NextFunction } from "express";

type Controller = (req: Request,res: Response,next: NextFunction) => Promise<void>;

const tryCatch = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};
export default tryCatch