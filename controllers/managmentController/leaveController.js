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
for (const employeeData of myEmployee) {
    if(employeeData.leaveRequest.length!=0){
        for (const element of employeeData.leaveRequest) {
               if(element.logStatus=="active"&&new Date(element.endDate).getTime()<new Date().getTime()){
                   const dataFunction= async()=>{
                        const employee=await employeesModel.findOne({"leaveRequest._id":element._id})

                        let targetRequest=employee.leaveRequest.id(element._id)
                   targetRequest.logStatus="expired"
                   await employee.save()
                   }
                   await dataFunction()
                   }
              }
    }
    
}


    res.status(200).send(myEmployee)
        }else if(req.body.logAction=="approved"){
        const companyDate=await Company.findOne({companyUID:clearToken})
        const companyName=companyDate.companyName
        const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
        const employee=await employeesModel.findOne({"personalInfo.fullName":req.body.employeeName})
        for (const employeeData of employee.leaveRequest) {
           if(employee.leaveRequest.logStatus=="active"){
           console.log(employee.employeeName)
           }
        }
        }else if(req.body.logAction=="denyed"){
 
            res.status(200).send("denied")
        }
    }else if(!req.headers.authorization){
        res.status(401).send("Unauthorized Request")
    }

}
module.exports={leaveController,logLeaveRequest}