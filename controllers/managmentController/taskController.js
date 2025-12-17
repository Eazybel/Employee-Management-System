const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const taskController=async(req,res)=>{
     const companyData=await Company.findOne({companyUID:req.body.companyUID})
        const companyName=companyData.companyName
        const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
        const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employee})
        myEmployee.task.push({assignedPerson:req.body.employee,taskName:req.body.taskName,dueDate:req.body.dueDate,priorityLevel:req.body.priority,description:req.body.description,active:true,overdue:false})
        await myEmployee.save()
        res.json(req.body)
}
const taskAction=(req,res)=>{
        res.json(req.body)
}
module.exports={taskController,taskAction}