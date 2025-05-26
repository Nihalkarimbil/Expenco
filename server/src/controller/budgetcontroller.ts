import { NextFunction, Request, Response } from "express";
import Budget from "../model/budget";
import CustomError from "../utils/CustomError";
import Expence from "../model/expence";

import prisma from "../../prisma/prisma";
import { connect } from "http2";

export const addBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, category, amount, year } = req.body;
  console.log(req.body);
  const month = parseInt(req.body.month);
  const existingBudget = await prisma.budget.findFirst({
    where: {
      userId: user,
      month,
      year,
    },
  });

  if (existingBudget) {
    return next(
      new CustomError("Budget already exists for this user/month/year", 400)
    );
  }
 

  const newBudget = await prisma.budget.create({
    data: {
      user: { connect: { id: user } },
      category,
      amount: parseFloat(amount),
      month,
      year,
    },
  });

  res.status(201).json({
    message: "Budget added for this month",
    data: newBudget,
    error: false,
  });
};

export const getmonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { month, year } = req.query;

  if (!month || !year) {
    return next(new CustomError("Month and year are required", 400));
  }

  const budget = await prisma.budget.findFirst({
    where: {
      isDeleted: false,
      userId: id,
      month: Number(month),
      year: Number(year),
    },
  });
  console.log("wertdbsjnask", budget);

  if (!budget) {
    return next(new CustomError("No budget found for this month", 404));
  }

  res.status(200).json({
    success: true,
    data: budget,
  });
};

export const updateBudget = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { amount, month, year } = req.body;

  const budget = await prisma.budget.update({
    where: {
      userId_month_year: {
        userId,
        month,
        year,
      },
      isDeleted: false,
    },
    data: {
      amount: amount,
    },
  });

  if (!budget) {
    return res
      .status(404)
      .json({ success: false, message: "Budget not found" });
  }

  res.status(200).json({
    success: true,
    data: budget,
    message: "Budget updated successfully",
  });
};

export const deletebuget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deletebudge = await prisma.budget.update({
    where: { id: req.params.id },
    data: { isDeleted: true },
  });
  if (!deletebudge) {
    return next(new CustomError("cannot delete this exp", 400));
  }

  res.status(200).json({
    data: deletebudge,
    message: "expence deleted",
    error: false,
  });
};

export const allBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allBudget = await prisma.budget.findMany({
    where: { userId: req.params.id, isDeleted: false },
  });
  console.log(allBudget);

  if (!allBudget) {
    return next(new CustomError("there is no Budget for This User", 404));
  }
  res.status(200).json({
    error: false,
    data: allBudget,
    message: "all budgets of the user",
  });
};
