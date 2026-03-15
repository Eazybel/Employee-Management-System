const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const taskController=async(req,res)=>{
    const companyData=await Company.findOne({companyUID:req.body.formObject.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.formObject.employee})
    myEmployee.task.push({assignedPerson:req.body.formObject.employee,taskName:req.body.formObject.taskName,dueDate:req.body.formObject.dueDate,priorityLevel:req.body.formObject.priority,description:req.body.formObject.description,active:true,overdue:false,taskID:`TSK-ID-${req.body.taskID}`})
    await myEmployee.save()
    res.send(myEmployee)
}
const taskLength=async(req,res)=>{
     const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employee})
    res.send(myEmployee.task.length);
}
module.exports = {taskController,taskLength};

