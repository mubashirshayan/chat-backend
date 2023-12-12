import  express  from "express";
import mongoose from "./database/index.js";
import router from "./routes/index.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import  jwt  from "jsonwebtoken";
import { Server } from "socket.io";
import { createServer } from "http";
import 'dotenv/config'
import Message from "./models/message.js";
console.log("process.env.PORT", process.env.PORT);
const PORT=process.env.PORT ||8000;

const app=express();
app.use(express.json());
app.use(cors({

  origin:'*',
  origin:'http://localhost:5173',
  credentials:true,
}));
app.use(cookieParser())
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("dbconnected")
})

app.use("/api/v1",router)


app.use((req,res,next)=>{
  
  try{

  let token=req.cookies.token;
   let decoded=jwt.verify(token,process.env.JWT_SECRET)
    // if (err) {
    //     return res.status(401).send({ message: "unauthorized", err })
    // }
  
    req.body.decoded={
        id:decoded._id,
        fullName:decoded.name,
        email:decoded.email,

    }
    
    return next();

} catch (err) {
return res.status(401).send({ err })
}
 
})

app.use("/api",router
  )
///////////////////save message//////////////////////////////
  app.post("/api/v2/message",async(req,res,next)=>{
  
    try{
        let messages={
            content:req.body.content,
            sender:req.body.decoded.id,
            recevier:req.body.recevier,
        }
        console.log(req.body)
 const newUser= await Message.create(messages);
 
const populatedData=await Message.findById(newUser._id)
.populate({ path: 'sender', select: 'name email' })
.populate({ path: 'recevier', select: 'name email' }).exec(); 
console.log("from",req.body.recevier,"to",req.body.decoded.id)
io.emit(`${req.body.recevier}-${req.body.decoded.id}`,populatedData);
         res.status(200).send({message:"successfully added",messagesdata:newUser})
    }catch(error){
       return res.status(400).send({message:"message not found"})
    }
})
/////////////////////////send message////////////////////////
app.get("/api/v1/message/:id",async(req,res,next)=>{
  try{
console.log(req.params.id)
       const messages= await Message.find({
          $or: [
              {
                  sender: req.body.decoded.id,
                  recevier: req.params.id
              },
              {
                  sender: req.params.id,
                  recevier: req.body.decoded.id,
              }
          ]
      })
           .populate({ path: 'sender', select: 'email name'})
           .populate({ path: 'recevier', select: 'email name' })
      res.status(200).send({message:"successfully found",messagedata:messages})
  }catch(error){
      return res.status(400).send({message:"message all not found"})
  }
})










  const httpServer = createServer(app);

  const io = new Server(httpServer, { cors: '*' });

  io.on("connection", (socket) => {
    //console.log("Made socket connection", socket.id);

      socket.on("join chat",(room)=>{
            console.log("room---",room)
            socket.join(room);
      })

     
  });
httpServer.listen(PORT,()=>{
    console.log(`sever is running on port ${PORT}`)
})
