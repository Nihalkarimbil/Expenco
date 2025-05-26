import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";

import prisma from "../../prisma/prisma";

export const addExpence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, amount, category, paymentMethord, note } = req.body;
  console.log(req.body);

  if (!amount || !category || !paymentMethord) {
    return next(new CustomError("all are requires", 400));
  }
  const newExpence = await prisma.expense.create({
    data: {
      user: {
        connect: {
          id: user,
        },
      },
      amount,
      category,
      paymentMethord,
      note,
    },
  });

  res.status(201).json({
    data: newExpence,
    message: "Expence added",
    error: false,
  });
};

export const allExpences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params);

  const allExpence = await prisma.expense.findMany({
    where: { userId: req.params.id, isDeleted: false },
  });

  console.log(allExpence);

  if (!allExpence) {
    return next(new CustomError("there is no expence for you", 400));
  }

  res.status(200).json({
    data: allExpence,
    message: "Your Expences",
    error: false,
  });
};

export const updateExpence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, amount, category, paymentMethord, note } = req.body;
  console.log(user);
  console.log(req.params);

  const updated = await prisma.expense.update({
    where: { id: req.params.id },
    data: {
      amount,
      category,
      paymentMethord,
      note,
    },
  });

  if (!updated) {
    return next(new CustomError("error on updating", 400));
  }

  res.status(200).json({
    data: updated,
    message: "expences updated",
    error: false,
  });
};

export const deletexp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deleteExpense = await prisma.expense.update({
    where: { id: req.params.id },
    data: { isDeleted: true },
  });
  console.log(deleteExpense);

  if (!deleteExpense) {
    return next(new CustomError("cannot delete this exp", 400));
  }

  res.status(200).json({
    data: deleteExpense,
    message: "expence deleted",
    error: false,
  });
};

export const montlyexp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { year, month } = req.params;
  const { userid } = req.body;

  const monthNum = month.padStart(2, "0");
  const startDate = new Date(`${year}-${monthNum}-01T00:00:00.000Z`);
  const endDate = new Date(`${year}-${monthNum}-31T23:59:59.999Z`);
  const expenses = await prisma.expense.findMany({
    where: {
      isDeleted: false,
      user: userid,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!expenses) {
    return next(new CustomError("error of getting exp", 400));
  }

  res.status(200).json({ error: false, data: expenses });
};

export const getExpbyid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const expence = await prisma.expense.findUnique({
    where: { id: req.params.id, isDeleted: false },
  });
  if (!expence) {
    return next(new CustomError("no expenses found with this id", 404));
  }
  res.status(200).json({
    message: "expence by id",
    data: expence,
    error: false,
  });
};
export const totalexp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.id;
  const totalExpense = await prisma.expense.aggregate({
    _sum:{
      amount:true
    },
    where:{
      userId:userId,
      isDeleted:false
    }
  });
  if (!totalExpense) {
    return next(new CustomError("error on agregate", 400));
  }

  res.status(200).json({
    data: totalExpense,
    error: false,
    message: "total expence",
  });
};