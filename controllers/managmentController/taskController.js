const {EmployeeSchema}=require("../../model/Employee-Schema")
const Company=require("../../model/Company-Schema")
const mongoose=require("mongoose")
const taskController=async(req,res)=>{
    const companyData=await Company.findOne({companyUID:req.body.formObject.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.formObject.employee})
    myEmployee.task.push({assignedPerson:req.body.formObject.employee,taskName:req.body.formObject.taskName,dueDate:req.body.formObject.dueDate,priorityLevel:req.body.formObject.priority,description:req.body.formObject.description,taskID:`TSK-ID-${req.body.taskID}`,status:"active",logDate:"none",editStatus:"none"})
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
const taskAction=async(req,res)=>{
     const companyData=await Company.findOne({companyUID:req.body.companyUID})
    const companyName=companyData.companyName
    const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
    const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.assignedPerson})
//logger code block
  if(req.body.action==="log"){
myEmployee.task.forEach(tasks=>{
        if(tasks.taskID==req.body.taskID){
        tasks.status=req.body.status
        tasks.logDate=req.body.logDate
    res.send(tasks);
     }
        })
// editer code block
}else if(req.body.action==="edit"){
myEmployee.task.forEach(tasks=>{
        if(tasks.taskID==req.body.taskID){
        tasks.editStatus="edited"
    res.send(tasks);
     }
        })
}

    await myEmployee.save()
    res.send("employee not found");
}
module.exports = {taskController,taskLength,taskAction};

