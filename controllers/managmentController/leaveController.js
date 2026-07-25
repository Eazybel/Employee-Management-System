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
        if(req.body.logAction=="expiryCheck"){
            const companyData=await Company.findOne({companyUID:clearToken})
            const companyName=companyData.companyName
            const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
            const myEmployee=await employeesModel.find()
            const employeeData={}
            //  Start from this line of code and implement a for of loop instead of forEach loop to loop through datas and update them remove the for Each loops {#beb,9}
            myEmployee.forEach(employees=>{
            if(employees.leaveRequest.length!=0){
                employees.leaveRequest.forEach(requests=>{
                   if(requests.logStatus=="active"&&new Date(requests.endDate).getTime()<new Date().getTime()){
                   
                   }
                })
            }
            })
//    myEmployee.leaveRequest[myEmployee.leaveRequest.length-1].logStatus=true
    // await myEmployee.save()
    res.status(200).send(myEmployee)
        }else if(req.body.logAction=="approved"){
             res.status(200).send("denyed")
        }else if(req.body.logAction=="denyed"){
 
            res.status(200).send("denied")
        }
    }else if(!req.headers.authorization){
        res.status(401).send("Unauthorized Request")
    }

}
module.exports={leaveController,logLeaveRequest}