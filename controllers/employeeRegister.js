const EmployeeSchema=require("../model/Employee-Schema")
const Company=require("../model/Company-Schema")
const mongoose=require("mongoose")

const employeeRegister=async(req,res)=>{
    const companyName=await Company.findOne({"companyUID":`${req.body.UID}`})
    console.log(companyName.companyName)
    res.send(companyName.companyName)
}
module.exports=employeeRegister