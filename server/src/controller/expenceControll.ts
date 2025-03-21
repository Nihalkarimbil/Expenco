import { NextFunction, Request, Response } from "express";
import Expence from "../model/expence";
import CustomError from "../utils/CustomError";
import mongoose from "mongoose";

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
    const newExpence = new Expence({
        user,
        amount,
        category,
        paymentMethord,
        note,
    });

    await newExpence.save();
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
    const allExpence = await Expence.find({ user: req.params.id });
    if (!allExpence) {
        return next(new CustomError("there is no expence for you", 400));
    }

    res.status(200).json({
        data: allExpence,
        message: "Your Expences",
        error: false,
    });
};

export const updateExpence = async (req: Request, res: Response, next: NextFunction) => {
    const { user, amount, category, paymentMethord, note } = req.body;

    const updatedata = { user, amount, category, paymentMethord, note }
    const updated = await Expence.findByIdAndUpdate(
        req.params.id,
        updatedata,
        { new: true }
    );


    if (!updated) {
        return next(new CustomError("error on updating", 400))
    }

    res.status(200).json({
        data: updated,
        message: "expences updated",
        error: false
    })

}

export const deletexp = async (req: Request, res: Response, next: NextFunction) => {
    const deleteExpense = await Expence.findByIdAndUpdate(
        req.params.id,
        { isDeleted: true },
        { new: true },
    )
    if (!deleteExpense) {
        return next(new CustomError("cannot delete this exp", 400))
    }

    res.status(200).json({
        data: deleteExpense,
        message: "expence deleted",
        error: false
    })
}

export const montlyexp = async (req: Request, res: Response, next: NextFunction) => {
    const { year, month } = req.params;
    const { userid } = req.body

    const monthNum = month.padStart(2, "0");
    const startDate = new Date(`${year}-${monthNum}-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-${monthNum}-31T23:59:59.999Z`);


    const expenses = await Expence.find({
        user: userid,
        createdAt: { $gte: startDate, $lte: endDate }
    }).sort({ createdAt: -1 });

    if (!expenses) {
        return next(new CustomError("error of getting exp", 400))
    }

    res.status(200).json({ error: false, data: expenses });
}


export const totalexp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params.id;
    const totalExpense = await Expence.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId), isDeleted: false } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);
    if (!totalExpense) {
        return next(new CustomError("error on agregate", 400))
    }

    
    res.status(200).json({
        data:totalExpense,
        error:false,
        message:"total expence"
    })

}