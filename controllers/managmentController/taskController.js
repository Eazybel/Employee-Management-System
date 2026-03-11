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
const taskLength = async (req, res) => {
    try {
        const companyData = await Company.findOne({ companyUID: req.body.companyUID });
        if (!companyData) {
            return res.status(404).send({ error: "Company not found" });
        }
        const companyName = companyData.companyName;
        const employeesModel = mongoose.model("employeeModel", EmployeeSchema, companyName);
        const myEmployee = await employeesModel.findOne({ "personalInfo.fullName": req.body.employee });
        if (!myEmployee) {
            return res.status(404).send({ error: "Employee not found" });
        }
        // Return the length of the task array
        res.send({ taskLength: myEmployee.task.length });
    } catch (error) {
        console.error("Error in taskLength:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
module.exports = {taskController,taskLength};

