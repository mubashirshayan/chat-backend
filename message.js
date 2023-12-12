// import  express  from "express";
// const router=express.Router();
// import Message from "../models/message.js";









// router.post("/message",async(req,res,next)=>{
   

//     try{
//         let messages={
//             content:req.body.content,
//             sender:req.body.decoded.id,
//             recevier:req.body.recevier,
          
//         }
//  const newUser= await Message.create(messages);
 
// const populatedData=await Message.findById(newUser._id)
// .populate({ path: 'sender', select: 'name email' })
// .populate({ path: 'recevier', select: 'name email' }).exec(); 


// console.log("popoule------",populatedData)
// io.emit(`${req.body.recevier}-${req.body.decoded.id}`, populatedData)
//          res.status(200).send({message:"successfully added",messagesdata:newUser})
//     }catch(error){
//        return res.status(400).send({message:"message not found"})
//     }
// })

 

    


// router.get("/message/:id",async(req,res,next)=>{
//     try{
// console.log(req.params.id)
//          const messages= await Message.find({
//             $or: [
//                 {
//                     sender: req.body.decoded.id,
//                     recevier: req.params.id
//                 },
//                 {
//                     sender: req.params.id,
//                     recevier: req.body.decoded.id,
//                 }
//             ]
//         })
//              .populate({ path: 'sender', select: 'email name'})
//              .populate({ path: 'recevier', select: 'email name' })
//         res.status(200).send({message:"successfully found",messagedata:messages})
//     }catch(error){
//         return res.status(400).send({message:"message all not found"})
//     }
// })



// export default router;
