import { NextFunction, Request, Response } from "express";
import Budget from "../model/budget";
import CustomError from "../utils/CustomError";
import Expence from "../model/expence";

import prisma from "../../prisma/prisma";

export const addBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("sssssss", req.body);

  const { userId, category, amount, month, year } = req.body;
  const existingbudget = await prisma.budget.findUnique({where:month});
  if (existingbudget) {
    return next(new CustomError("budget existing in this month", 400));
  } else {
      const newBudget = await prisma.budget.create({
        data: {
          userId,
          category,
          amount: parseFloat(amount),
          month,
          year,
        },
      });

    res.status(201).json({
      message: "budget added for this month",
      data: newBudget,
      error: false,
    });
  }
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

  const budget = await Budget.findOne({
    isDeleted:false,
    user: id,
    month: Number(month),
    year: Number(year),
  });
  

  if (!budget) {
    return next(new CustomError("No budget found for this month", 404));
  }

  res.status(200).json({
    success: true,
    data: budget,
  });
};

export const compareBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { month, year } = req.query;

    if (!month || !year) {
      return next(new CustomError("Month and year are required", 400));
    }

    const budget = await Budget.findOne({
      user: userId,
      month: Number(month),
      year: Number(year),
    });

    if (!budget) {
      res.status(404).json({
        success: false,
        message: "No budget found for this period",
      });
      return;
    }

    const totalExpense = await Expence.aggregate([
      {
        $match: {
          user: userId,
          isDeleted: false,
          $expr: {
            $and: [
              { $eq: [{ $month: "$createdAt" }, Number(month)] },
              { $eq: [{ $year: "$createdAt" }, Number(year)] },
            ],
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expenseTotal = totalExpense.length > 0 ? totalExpense[0].total : 0;
    const remainingBudget = Number(budget.amount) - expenseTotal;

    res.status(200).json({
      success: true,
      budget: budget.amount,
      expenses: expenseTotal,
      remainingBudget,
      message: remainingBudget >= 0 ? "Within budget" : "Budget exceeded!",
    });
  } catch (error) {
    next(error);
  }
};


export const updateBudget = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { amount, month, year } = req.body;

  const budget = await Budget.findOneAndUpdate(
    { user: userId, month, year },
    { $set: { amount } },
    { new: true }
  );

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
  const deletebudge = await Budget.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );
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
  const allBudget = await Budget.find({
    user: req.params.id,
    isDeleted: false,
  });
  console.log(req.params);
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
