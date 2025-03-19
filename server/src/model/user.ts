import mongoose,{Document,Schema,Model} from "mongoose";

interface UserType extends Document{
    username: string;
    email: string;
    password: string;
}
const userSchema: Schema<UserType> = new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const User: Model<UserType> = mongoose.model("User",userSchema);
export default User;