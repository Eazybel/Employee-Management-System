const EmployeeSchema=require("../model/Employee-Schema")
const Company=require("../model/Company-Schema")
const mongoose=require("mongoose")

const employeeRegister=async(req,res)=>{
    const companyName=await Company.find()

    res.send(req.body.companyName)
}
module.exports=employeeRegister