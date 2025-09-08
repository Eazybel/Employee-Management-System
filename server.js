const express=require("express")
const mongoose=require("mongoose")
const hide=require("./controllers/hiddenFrontend")
const myEmployees=require("./controllers/employeesFetch")
const profileFetch=require("./controllers/profileFetch")
const companyPost=require("./controllers/Company-Post")
const employeeRegister=require("./controllers/employeeRegister")
const companyFetch=require("./controllers/companyFetch")
const multer=require("multer")
const upload=multer()
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
app.post("/myEmployees",myEmployees)
app.post("/profileFetch",profileFetch)
app.get("/companyFetch/:uid",companyFetch)
app.get("/hide",hide)
app.post("/employeeRegister",upload.fields([
   { name:"profilePhoto",maxCount:1},
   { name:"document",maxCount:1}
]),employeeRegister)
app.post("/",upload.single("image"),companyPost)
app.listen(5000,()=>{
    console.log("Server Listening to Port 5000")
})