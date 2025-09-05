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
    jobTitle: {
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
    
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});
const employeesModel=mongoose.model("employeesModel",EmployeeSchema)
module.exports = {employeesModel,EmployeeSchema};