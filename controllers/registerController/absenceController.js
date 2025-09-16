const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const absenceController=async(req,res)=>{  
     const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeName})
    myEmployee.absence.push({date:req.body.absenceDate,duration:req.body.absenceDuration,reason:req.body.absenceReason})
    await myEmployee.save()
    res.json(req.body)
}
const nameDataAbsence=async(req,res)=>{
    const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.find()
    res.json(myEmployee)
}
const continueAbsence=async(req,res)=>{
    const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
   const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeName})
   const continueAbsence=Number(myEmployee.absence[myEmployee.absence.length-1].duration)+1
   myEmployee.absence[myEmployee.absence.length-1].duration=continueAbsence
  await myEmployee.save()
    res.json(myEmployee)
}
module.exports={absenceController,nameDataAbsence,continueAbsence}