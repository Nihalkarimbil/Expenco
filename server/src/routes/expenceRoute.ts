import express from "express"
import tryCatch from "../middleware/tryCatch"
import { addExpence, allExpences, deletexp, totalexp, updateExpence } from "../controller/expenceControll"


const ExpenceRoute=express.Router()

ExpenceRoute
    .post("/addExpence",tryCatch(addExpence))
    .get("/allExpence/:id",tryCatch(allExpences))
    .put("/editExp/:id",tryCatch(updateExpence))
    .put("/deleteExp/:id",tryCatch(deletexp))
    .get("/totalamout/:id",tryCatch(totalexp))
    
    
    

export default ExpenceRoute