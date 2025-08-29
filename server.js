const express=require("express")
const mongoose=require("mongoose")
const companyPost=require("./controllers/Company-Post")
const employeesFetch=require("./controllers/employeesFetch")
const employeeRegister=require("./controllers/employeeRegister")
const multer=require("multer")
const path=require("path")
require("dotenv").config()
const string=process.env.STRING
const app=express()
app.use("/uploads",express.static("uploads"))
app.use(express.static(path.join(__dirname,"public"),{index:false}))
app.use(express.json())

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        const unique=Date.now()+"-"+Math.floor(Math.random()*1E9)
        cb(null,unique+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})
mongoose.connect(string)
.then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
})
app.post("/employeeRegister",upload.fields([
    {name:"profilePhoto",maxCount:1},
    {name:"document",maxCount:1}
]),employeeRegister)
app.post("/",upload.single("image"),companyPost)
app.listen(5000,()=>{
    console.log("Server Listening to Port 5000")
})