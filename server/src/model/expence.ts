import mongoose, { Document, Schema, Model } from "mongoose";

interface ExpenceType extends Document {
    user: mongoose.ObjectId,
    amount: number,
    category: Enumerator,
    paymentMethord: Enumerator,
    note: string
    isDeleted: boolean
    
}

const expenceschema: Schema<ExpenceType> = new Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true, enum: ["Food", "Transport", "Rent", "Entertainment", "Business", "Other"] },
    paymentMethord: { type: String, enum: ["Cash", "Card", "UPI", "Bank Transfer"], required: true },
    note: { type: String },
    isDeleted: { type: Boolean, default: false },
 
}, { timestamps: true })

const Expence: Model<ExpenceType> = mongoose.model("Expence", expenceschema)
export default Expence