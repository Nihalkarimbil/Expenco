import express from "express"
import tryCatch from "../middleware/tryCatch"
import { addBudget, allBudgets, deletebuget, getmonthlyBudget, updateBudget } from "../controller/budgetcontroller"

const budgetroute=express.Router()

budgetroute
    .post("/addBudget",tryCatch(addBudget))
    .get("/getmonthlybudget/:id",tryCatch(getmonthlyBudget))

    .put("/updatebudget/:userId",tryCatch(updateBudget))
    .put("/deletebudget/:id",tryCatch(deletebuget))
    .get("/getBudgetof/:id",tryCatch(allBudgets))

export default budgetroute