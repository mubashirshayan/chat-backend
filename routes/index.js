import express from 'express';
import user from "./user.js"
import cors from "cors";
import auth from "./auth.js"
//import message from "../message.js"
const app=express();
app.use(cors())
//app.use(cookieParser())
const router = express.Router() 
router.use("/v1",user)
router.use("/user",auth)
//router.use("/v1",message)
export default router;