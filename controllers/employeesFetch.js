const {EmployeeSchema}=require("../model/Employee-Schema")
const Company=require("../model/Company-Schema")
const mongoose=require("mongoose")
const myEmployees=async(req,res)=>{
    const allCompanys=await Company.findOne({companyUID:req.body.uid})
    const myCompany=allCompanys.companyName
    const myEmployeeModel=mongoose.model("myEmployeeModel",EmployeeSchema,myCompany)
    const allEmployees=await myEmployeeModel.find()
res.json({allEmployee:allEmployees,companyName:myCompany})
}
module.exports=myEmployees