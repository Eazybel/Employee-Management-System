const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const salaryNew=async(req,res)=>{
 const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeNameInsert})
    myEmployee.salary.push({Effectivedate:req.body.effectiveDate,lastRaisedate:"none",previous:"none",new:req.body.salaryAmount})
    await myEmployee.save()
    res.json(req.body)
}
const salaryRaise=async(req,res)=>{
const companyData=await Company.findOne({companyUID:req.body.companyUID})
const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeNameRaise})
    myEmployee.salary.push({Effectivedate:req.body.effectivedate,lastRaisedate:req.body.effectivedate,previous:req.body.previous,new:req.body.newSalary})
    await myEmployee.save()
    res.json(req.body)
}
module.exports={salaryNew,salaryRaise}