import mongoose from "mongoose";
const {Schema}=mongoose
const userSchema=new Schema(
    {
        name:{
            type:Schema.Types.String,
            required:true
        },
        email:{
            type:Schema.Types.String,
            required:true,
            unique:true
        },
        phone:{
            type:Schema.Types.Number,
            required:true
        },
        password:{
            type:Schema.Types.String,
            required:true
        }
    }
)
const User = mongoose.model('User', userSchema);
export default User;