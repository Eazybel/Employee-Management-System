const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
  personalInfo: {
    fullName: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    birthdate: {
      type: Date,
      required: true
    },
    maritalStatus: {
      type: String,
      required: true
    },
    profilePhoto: String,
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    address: {
      type: String,
      required: true
    },
    emergencyContact: {
      name: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      }
    }
  },
  employmentDetails: {
     employeeID: {
      type: String,
      required: true
    },
    jobTitle: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    employeeType: {
      type: String,
      required: true
    },
    dateOfHire: {
      type: Date,
      required: true
    },
    bankAccount: {
      type: String,
      required: true
    },
    document: String,
    
    
  },
  lateArrival:[{date:{type:String},arrivalDate:{type:String},arrivalTime:{type:String},reason:{type:String}}],
  leaveRequest:[{startDate:{type:String},endDate:{type:String},reason:{type:String},expiry:{type:Boolean},logStatus:{type:Boolean}}],
  overtime:[{date:{type:String},overtimeDate:{type:String},hour:{type:String},reason:{type:String}}],
  promotion:[{date:{type:String},currentPosition:{type:String},newPosition:{type:String}}],
  salary:[{Effectivedate:{type:String},lastRaisedate:{type:String},previous:{type:String},new:{type:String}}],
  absence:[{date:{type:String},duration:{type:String},reason:{type:String},ongoingStatus:{type:Boolean}}],
  resignation:[{noticeDate:{type:String},lastDate:{type:String},reason:{type:String},ongoingStatus:{type:Boolean},acceptanceStatus:{type:Boolean}}],
  task:[{noticeDate:{type:String},lastDate:{type:String},reason:{type:String},ongoingStatus:{type:Boolean},acceptanceStatus:{type:Boolean}}]
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});
const employeesModel=mongoose.model("employeesModel",EmployeeSchema)
module.exports = {employeesModel,EmployeeSchema};