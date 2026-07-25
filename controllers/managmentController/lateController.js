const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const admin=require("firebase-admin")

const lateController=async(req,res)=>{  
     const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeNameInsert})
    myEmployee.lateArrival.push({date:req.body.lateArrivalDate,arrivalTime:req.body.lateArrivalTime,reason:req.body.lateArrivalReason})
    await myEmployee.save()
    res.json(req.body)
}
const nameData=async(req,res)=>{
    if(req.headers.authorization){
       const token=req.headers.authorization.split("Bearer ")[1]
       const decodedToken=await admin.auth().verifyIdToken(token)
       const clearToken= decodedToken.uid
const companyData=await Company.findOne({companyUID:clearToken})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.find()
       res.status(200).json(myEmployee)
    }else if(!req.headers.authorization){
        res.status(401).send("Unauthorized Request")

    }
    
}
module.exports={lateController,nameData}