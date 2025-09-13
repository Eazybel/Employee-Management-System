const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const lateArrival=require("../../model/lateArrivalSchema")
const mongoose=require("mongoose")
const lateController=async(req,res)=>{  
    res.json("lateEmployee")
}
const nameData=async(req,res)=>{
    const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.find().select("personalInfo.fullName")
    res.json(myEmployee)
}
module.exports={lateController,nameData}