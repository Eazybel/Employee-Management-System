const express=require("express")
const mongoose=require("mongoose")
const companyPost=require("./controllers/Company-Post")
const multer=require("multer")
const path=require("path")
require("dotenv").config()
const string=process.env.STRING
const app=express()
app.use("/uploads",express.static("uploads"))
app.use(express.static(path.join(__dirname,"public"),{index:false}))

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
    storage:storage,
    limits:{fileSize:5*1024*1024}
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
app.post("/",upload.single("image"),companyPost)
app.listen(5000,()=>{
    console.log("Server Listening to Port 5000")
})