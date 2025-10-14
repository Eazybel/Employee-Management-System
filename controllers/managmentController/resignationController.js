const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const resignationController=async(req,res)=>{
 const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeName})
    myEmployee.resignation.push({noticeDate:req.body.noticeDay,lastDate:req.body.lastDay,reason:req.body.reason,ongoingStatus:true,acceptanceStatus:false})
    await myEmployee.save()
    res.json(req.body)
}
module.exports=resignationController