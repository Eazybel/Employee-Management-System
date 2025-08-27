const express=require("express")
const mongoose=require("mongoose")
const companyPost=require("./controllers/Company-Post")
require("dotenv").config()
const string=process.env.STRING
const app=express()
mongoose.connect(string)
.then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})
app.get("/",(req,res)=>{
    res.send("sucess")
})
app.post("/",companyPost)
app.listen(5000,()=>{
    console.log("Server Listening to Port 5000")
})