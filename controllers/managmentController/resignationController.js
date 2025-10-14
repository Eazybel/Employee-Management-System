const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const resignationController=async(req,res)=>{
res.send(req.body)
}
module.exports=resignationController