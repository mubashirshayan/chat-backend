
import mongoose from "mongoose";
import { Schema } from "mongoose";
const messageSchema=new Schema(
    {
        content:{
            type:Schema.Types.String,
            required:true
        },
        sender:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
         recevier:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
    
    },
    {
        timestamps:true,
    }
)

const Message = mongoose.model('Message', messageSchema);
export default Message;