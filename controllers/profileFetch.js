const Company=require("../model/Company-Schema")
const {EmployeeSchema}=require("../model/Employee-Schema")
const mongoose=require("mongoose")
const profileFetch=async(req,res)=>{
    const employeeCompanyData=await Company.findOne({companyUID:req.body.companyID})
    const employeeCompanyName=await employeeCompanyData.companyName
   const EmployeeModel=mongoose.model("myEmployeeModel",EmployeeSchema,employeeCompanyName)
   const employeeData=await EmployeeModel.findOne({"employmentDetails.employeeID":req.body.profilerID})

    res.json(employeeData)
}
module.exports=profileFetch