const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const lateController=async(req,res)=>{  
     const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeNameInsert})
    myEmployee.lateArrival.push({date:req.body.lateArrivalDate,arrivalTime:req.body.lateArrivalTime,reason:req.body.lateArrivalReason})
    await myEmployee.save()
    res.json(req.body)
}
const nameData=async(req,res)=>{
    const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.find()
    res.json(myEmployee)
}
module.exports={lateController,nameData}