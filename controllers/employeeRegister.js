const EmployeeSchema=require("../model/Employee-Schema")
const Company=require("../model/Company-Schema")
const mongoose=require("mongoose")

const employeeRegister=async(req,res)=>{
    const companyName=await Company.findOne()

    res.send(companyName)
}
module.exports=employeeRegister