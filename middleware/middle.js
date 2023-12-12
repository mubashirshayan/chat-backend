import express, { json } from "express";
import  jwt  from "jsonwebtoken";
let verifyToken=(req, res, next)=>{
    try{
    
    const {authorization}=req.headers;
    const token=authorization&&authorization.split(" ")[1];
    console.log(token);


 jwt.verify(token,"TECH", function (err, decoded) {
    if (err) {
        return res.status(401).send({ message: "unauthorized", err })
    }
    console.log("decoded",decoded)
    return next();
});
} catch (err) {
return res.status(401).send({ err })
}
 
}
export default verifyToken;