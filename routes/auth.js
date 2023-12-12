import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken";
import joi from "joi";
import verifyToken from "../middleware/middle.js";
import cors from "cors";
const app=express();
const router=express.Router();
//app.use(cors());
app.use(cors({
  origin:'*',
  credentials:true,
}));
const userSchema=joi.object({
    name:joi.string().required(),
    email:joi.string().email().required(),
    phone:joi.number().required().min(10),
    password:joi.string().required().min(6)
    // password:joi.string().min(6).required()                                                                                                                                                                                                                                                 )                                                                                                                                                                                                  
  })


///////////////////register Api//////////////////////////////////////////////
router.post("/signup",async(req,res)=>{
  try{


    await userSchema.validate(req.body);
  const password=await bcrypt.hash(req.body.password,10)
 const user=new User({...req.body,password});

     const newUser= await user.save()
     const token=jwt.sign({_id:user._id,email:user.email,name:user.name},"TECH");
      res.cookie("token",token,{
        httpOnly:true,
        secure:true,
      })
  return res.status(200).send({message:"successfully added",newUser,token})
}
  catch(err){
    res.status(404).send({message:err.message})
  }
})
///////////////////////Login API/////////////////////////////////////////
router.post("/login",async(req,res)=>{
  try{
    const user=await User.findOne({email:req.body.email}).then(res=>res.toObject())

    if(!user){
      return res.status(401).send({status:401,message:"user not found"})
    }
    const compare=await bcrypt.compare(req.body.password, user.password)
    if(!compare){
      return res.status(404).send({status:401,message:"password not found"})
    }
   delete user.password;
   const token=jwt.sign({_id:user._id,email:user.email,name:user.name},"TECH");
      res.cookie("token",token,{
        httpOnly:true,
        secure:true,
      })
    return res.status(200).send({message:"login successfull",user,token})}
  catch(err){
    res.status(404).send({message:err.message})
  }
})
/////logout Api////////
router.post("/logout",(req,res)=>{
  try{
    // res.cookie("token","",{
    //   httpOnly:true,
    //   secure:true,
    // })
    res.clearCookie("token")
    res.status(200).send({message:"user successfully logout"})
  }catch(err){
    res.status(404).send({status:401,message:err.message})
  }
})




export default router;