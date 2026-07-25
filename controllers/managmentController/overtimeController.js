const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const overtimeController=async(req,res)=>{
     const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeName})
    myEmployee.overtime.push({date:req.body.overtimeDate,hour:req.body.overtimeHours,reason:req.body.overtimeReason})
    await myEmployee.save()
    res.json(req.body)
}
module.exports=overtimeController