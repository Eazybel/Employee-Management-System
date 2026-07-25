const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const admin=require("firebase-admin")
const leaveController=async(req,res)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split("Bearer ")[1]
        const decodedToken=await admin.auth().verifyIdToken(token)
        const clearToken=decodedToken.uid
        const companyData=await Company.findOne({companyUID:clearToken})
        const companyName=companyData.companyName
        const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
        const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeName})
        myEmployee.leaveRequest.push({employeeName:req.body.employeeName,startDate:req.body.leaveStartDate,endDate:req.body.leaveEndDate,reason:req.body.reason,logStatus:"active"})
        await myEmployee.save()
    res.status(200).json(myEmployee)
    }else if(!req.headers.authorization){
        res.status(401).send("Unauthorized Request")
    }
  
}
const logLeaveRequest=async(req,res)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split("Bearer ")[1]
        const decodedToken=await admin.auth().verifyIdToken(token)
        const clearToken=decodedToken.uid
        res.status(200).send(clearToken)
    }else if(!req.headers.authorization){
        res.status(401).send("Unauthorized Request")
    }
//     const companyData=await Company.findOne({companyUID:req.body.companyUID})
//     const companyName=companyData.companyName
//     const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
//    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeName})
// //    myEmployee.leaveRequest[myEmployee.leaveRequest.length-1].logStatus=true
//     await myEmployee.save()
//     res.json(myEmployee)
}
module.exports={leaveController,logLeaveRequest}