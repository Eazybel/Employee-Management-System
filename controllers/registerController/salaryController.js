const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const salaryNew=async(req,res)=>{
 const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employee-name-insert})
    myEmployee.salary.push({date:req.body.lateArrivalDate,arrivalTime:req.body.lateArrivalTime,reason:req.body.lateArrivalReason})
    await myEmployee.save()
    res.json(req.body)
}
const salaryRaise=(req,res)=>{
res.send("raise")
}
module.exports={salaryNew,salaryRaise}