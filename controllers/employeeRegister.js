const EmployeeSchema=require("../model/Employee-Schema")
const Company=require("../model/Company-Schema")
const mongoose=require("mongoose")

const employeeRegister=(req,res)=>{
    res.json(req.body)
}
module.exports=employeeRegister