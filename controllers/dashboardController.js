const {EmployeeSchema}=require("../model/Employee-Schema")
const Company=require("../model/Company-Schema")
const mongoose=require("mongoose")
const dashboard=async(req,res)=>{
 const companyName=await Company.findOne({"companyUID":`${req.body.UID}`})
const employeeModel=mongoose.model("employeeModel",EmployeeSchema,`${companyName.companyName}`)
const myEmployee=await employeeModel.find()
for (const elements of myEmployee) {
elements.announcements.push(req.body)
await elements.save()
}
res.send(myEmployee)
}
module.exports= dashboard;