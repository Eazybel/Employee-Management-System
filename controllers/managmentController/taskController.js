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
const taskAction=async(req,res)=>{
        const companyData=await Company.findOne({companyUID:req.body.companyUID})
        const companyName=companyData.companyName
        const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
        const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.p2})
        myEmployee.task.forEach(task=>{
                if(task.assignedPerson=="Benjamin Carter"){
                        console.log(task)
                }
        })
        myEmployee.task.updateOne({assignedPerson:req.body.employee,taskName:req.body.taskName,dueDate:req.body.dueDate,priorityLevel:req.body.priority,description:req.body.description,active:true,overdue:false})
        await myEmployee.save()
        res.json(req.body)
}
const taskLength=async(req,res)=>{
        const companyData=await Company.findOne({companyUID:req.body.companyUID})
        const companyName=companyData.companyName
        const employeesModel=mongoose.model("employeeModel",EmployeeSchema,companyName)
        const myEmployee=await employeesModel.findOne({"personalInfo.fullName":req.body.employee})
        res.send(myEmployee.task.length)
}
module.exports={taskController,taskAction,taskLength}
















