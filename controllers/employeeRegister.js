const EmployeeSchema=require("../model/Employee-Schema")
const Company=require("../model/Company-Schema")
const mongoose=require("mongoose")

const employeeRegister=async(req,res)=>{
    const companyName=await Company.findOne({"companyUID":`${req.body.UID}`})
    res.send(req.file)
}
module.exports=employeeRegister