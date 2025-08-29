import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
const fullNameInput = document.getElementById('full-name');
const genderSelect = document.getElementById('gender');
const birthdateInput = document.getElementById('birthdate');
const maritalStatusSelect = document.getElementById('marital-status');
const profilePhotoInput = document.getElementById('profile-photo');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');
const emergencyNameInput = document.getElementById('emergency-name');
const emergencyPhoneInput = document.getElementById('emergency-phone');
const jobTitleInput = document.getElementById('job-title');
const employeeTypeSelect = document.getElementById('employee-type');
const dateOfHireInput = document.getElementById('date-of-hire');
const bankAccountInput = document.getElementById('bank-account');
const documentInput = document.getElementById('document');
const submitBtn = document.getElementById('btn');
const form = document.getElementById('form');
 const firebaseConfig = {
    apiKey: "AIzaSyBKSuvaWfC7v1bwH12pVJTilwyk3mamxxI",
    authDomain: "employee-managment-syste-fdd4c.firebaseapp.com",
    projectId: "employee-managment-syste-fdd4c",
    storageBucket: "employee-managment-syste-fdd4c.firebasestorage.app",
    messagingSenderId: "1016929288920",
    appId: "1:1016929288920:web:0cc4e437af745933430dad"
  };
  const app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
    submitBtn.onclick=(e)=>{
    const forms=new FormData(form)
    if(!form.checkValidity()){
        form.reportValidity()
        return
    }
    e.preventDefault()
    fetch("/employeeRegister",{
        method:"POST",
        body:forms
    }).then(()=>{
        alert("Employee Registered Sucessully")
        window.location="./Employee-Register.html"
    }).catch(err=>{
        console.log(err)
    })
}
    } else {
       window.location="./logIn.html"
    }
  });
   