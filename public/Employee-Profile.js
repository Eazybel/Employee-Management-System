import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
 const firebaseConfig = {
    apiKey: "AIzaSyBKSuvaWfC7v1bwH12pVJTilwyk3mamxxI",
    authDomain: "employee-managment-syste-fdd4c.firebaseapp.com",
    projectId: "employee-managment-syste-fdd4c",
    storageBucket: "employee-managment-syste-fdd4c.firebasestorage.app",
    messagingSenderId: "1016929288920",
    appId: "1:1016929288920:web:0cc4e437af745933430dad"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
// Main Buttons
const saveBtn = document.getElementById('saveBtn');
const editBtn=document.querySelectorAll(".edit-btn")
      // Personal and Employment Details
const employeeTitle = document.getElementById('employee-title');
const profilePhoto = document.getElementById('profile-photo');
const employeenameheading = document.getElementById('employee-name-heading');
const fullNameValue = document.getElementById('full-name-value');
const genderValue = document.getElementById('gender-value');
const phoneValue = document.getElementById('phone-value');
const birthdateValue = document.getElementById('birthdate-value');
const maritalStatusValue = document.getElementById('marital-status-value');
const emailValue = document.getElementById('email-value');
const addressValue = document.getElementById('address-value');
const contactNameValue = document.getElementById('contact-name-value');
const contactPhoneValue = document.getElementById('contact-phone-value');
const jobTitleValue = document.getElementById('job-title-value');
const employeeIdValue = document.getElementById('employee-id-value');
const employeeTypeValue = document.getElementById('employee-type-value');
const hireDateValue = document.getElementById('hire-date-value');
const bankAccountValue = document.getElementById('bank-account-value');
const viewCv = document.getElementById('view-cv-link');
  if (user) {
    const uid = user.uid;
    fetch("/profileFetch",{
      method:"POST",
        headers:{
"Content-type":"application/json"
  },
      body:JSON.stringify({
        companyID:localStorage.getItem("UID"),
        profilerID:localStorage.getItem("profilerID")
      })
    }).then(res=>{
      return res.json()
    }).then(data=>{
      profilePhoto.setAttribute("src",data.personalInfo.profilePhoto)
      viewCv.setAttribute("href",data.employmentDetails.document)
      employeenameheading.innerText=data.personalInfo.fullName
      employeeTitle.innerText=data.employmentDetails.jobTitle
      fullNameValue.innerText=data.personalInfo.fullName
      genderValue.innerText=data.personalInfo.gender
      maritalStatusValue.innerText=data.personalInfo.maritalStatus
      phoneValue.innerText=data.personalInfo.phone
      birthdateValue.innerText=data.personalInfo.birthdate.slice(0,10)
      emailValue.innerText=data.personalInfo.email
      addressValue.innerText=data.personalInfo.address
      contactNameValue.innerText=data.personalInfo.emergencyContact.name
      contactPhoneValue.innerText=data.personalInfo.emergencyContact.phone
      bankAccountValue.innerText=data.employmentDetails.bankAccount
      hireDateValue.innerText=data.employmentDetails.dateOfHire.slice(0,10)
      employeeIdValue.innerText=data.employmentDetails.employeeID
      employeeTypeValue.innerText=data.employmentDetails.employeeType
      jobTitleValue.innerText=data.employmentDetails.jobTitle
}).then(()=>{
      editBtn.forEach(btn=>{
  
        btn.onclick=()=>{
          const editable=btn.parentElement.querySelectorAll("p")[1]
          editable.contentEditable="true"
          editable.focus()
        }
      })
      
    })
saveBtn.onclick=()=>{
 
}
  } else {
     window.location="./logIn.html"
  }
});