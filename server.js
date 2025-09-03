const express=require("express")
const mongoose=require("mongoose")
const companyPost=require("./controllers/Company-Post")
const employeesFetch=require("./controllers/employeesFetch")
const employeeRegister=require("./controllers/employeeRegister")
const companyFetch=require("./controllers/companyFetch")
const path=require("path")
require("dotenv").config()
const string=process.env.STRING
const app=express()
app.use("/uploads",express.static("uploads"))
app.use(express.static(path.join(__dirname,"public"),{index:false}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
mongoose.connect(string)
.then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
})
app.get("/companyFetch",companyFetch)
app.post("/employeeRegister",employeeRegister)
app.post("/",companyPost)
app.listen(5000,()=>{
    console.log("Server Listening to Port 5000")
})