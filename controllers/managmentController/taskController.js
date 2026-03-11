const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const taskController=async(req,res)=>{
    const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employee})
    myEmployee.task.push({assignedPerson:req.body.employee,taskName:req.body.taskName,dueDate:req.body.dueDate,priorityLevel:req.body.priority,description:req.body.description,active:true,overdue:false,taskID:"1"})
    await myEmployee.save()
    res.send(myEmployee)
}
const taskLength=((req,res)=>{
    res.send(req.body)
})
module.exports = {taskController,taskLength};

//Continue from updaating the task schema model