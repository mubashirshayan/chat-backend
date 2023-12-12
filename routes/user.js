import express from "express";
import User from "../models/user.js";

//import cors from "cors";
//const app=express();
const router=express.Router();
//app.use(cors());


router.get("/users",async(req,res,next)=>{
const users=await User.find({})
delete users.password;
res.status(200).send(users)
})
////////check Login Status Api////////////////////////////////////
router.get("/ping",(req,res,next)=>{
  res.status(200).send({message:"user login"})
})
router.get("/profile",async (req,res,next)=>{
  try{
    const user=await User.findOne({email:req.body.decoded.email})
    res.status(200).send({message:"user login profile",
    data:{
      fullName:user.name,
      email:user.email,
      phone:user.phone,
      id:user._id,
    }})
  }
  catch(error){
    res.status(400).send({message:"user not found"})
  }
})
export default router;