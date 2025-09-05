const {EmployeeSchema}=require("../model/Employee-Schema")
const Company=require("../model/Company-Schema")
const mongoose=require("mongoose")

const employeeRegister=async(req,res)=>{
    const companyName=await Company.findOne({"companyUID":`${req.body.UID}`})
    const employeeModel=mongoose.model("employeeModel",EmployeeSchema,`${companyName.companyName}`)
    const newEmployee=new employeeModel({
         personalInfo: {
            fullName:req.body.fullName,
            gender:req.body.gender,
            phone:req.body.phone,
            birthdate:req.body.birthdate,
            maritalStatus:req.body.maritalStatus,
            profilePhoto:req.body.profileUrl,
            email:req.body.email,
            address:req.body.address,
            emergencyContact: {
              name:req.body.emergencyName,
              phone:req.body.emergencyPhone
            }
          },
          employmentDetails: {
            jobTitle:req.body.jobTitle,
            employeeType:req.body.employeeType,
            dateOfHire:req.body.dateOfHire,
            bankAccount:req.body.bankAccount,
            document: req.body.documentUrl,
            
          }
    })
    newEmployee.save()
    .then(()=>{
        console.log(`Employee Saved For ${companyName.companyName}`)
    })
    res.send(req.body)
}
module.exports=employeeRegister