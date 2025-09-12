// const {EmployeeSchema}=require("../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
// const mongoose=require("mongoose")
const lateController=(req,res)=>{
    
    res.send("sucess")
}
const nameData=async(req,res)=>{
    const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    res.json(companyName)
}
module.exports={lateController,nameData}