const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const promotionController=async(req,res)=>{  
     const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeName})
    myEmployee.promotion.push({date:req.body.effectiveDate,currentPosition:req.body.currentPosition,newPosition:req.body.newPosition})
    await myEmployee.save()
    res.json(req.body)
}
const nameDataPromotion=async(req,res)=>{
    const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.find()
    res.json(myEmployee)
}
module.exports={promotionController,nameDataPromotion}