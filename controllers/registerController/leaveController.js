const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const leaveController=async(req,res)=>{
    const companyData=await Company.findOne({companyUID:req.body.companyUID})
        const companyName=companyData.companyName
        const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
        const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeName})
        myEmployee.leaveRequest.push({startDate:req.body.leaveStartDate,endDate:req.body.leaveEndDate,reason:req.body.leaveReason,expiry:true})
        await myEmployee.save()
        res.json(req.body)
}
module.exports=leaveController