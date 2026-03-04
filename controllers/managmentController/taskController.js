const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const taskController=async(req,res)=>{
    const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employee})
    // // myEmployee.task.push({date:req.body.absenceDate,duration:req.body.absenceDuration,reason:req.body.absenceReason,ongoingStatus:true})
    // // await myEmployee.save()
    // res.send(myEmployee)
}
module.exports = taskController;

//Continue from updaating the task schema model