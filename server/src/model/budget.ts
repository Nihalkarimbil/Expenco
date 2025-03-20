import mongoose, { Document, Schema, Model } from "mongoose";

interface budgetType extends Document {
    user: mongoose.ObjectId,
    category: string,
    amount: string,
    month:number,
    year:number

}

const budgetschema: Schema<budgetType> = new Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    amount:{type:String,required:true},
    month: { type: Number, required: true }, 
    year: { type: Number, required: true }, 

},{timestamps:true})

const Budget :Model<budgetType>=mongoose.model("Budet",budgetschema)
export default Budget