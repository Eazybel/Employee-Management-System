// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// initialisation of the tags
const messageBox = document.getElementById("message-box");
const registrationForm = document.getElementById("registration-form");
const btn=document.getElementById("btn")
// Company Information
const companyName = document.getElementById("company-name");
const sector = document.getElementById("sector");
const address = document.getElementById("address");
const employees = document.getElementById("employees");
const logo = document.getElementById("logo");
const foundationDate = document.getElementById("foundation-date");
// Primary Contact
const primaryName = document.getElementById("primary-name");
const primaryEmail = document.getElementById("primary-email");
const primaryPhone = document.getElementById("primary-phone");
// HR Contact
const hrName = document.getElementById("hr-name");
const hrEmail = document.getElementById("hr-email");
const hrPhone = document.getElementById("hr-phone");
// Admin Account

  // Your web app's Firebase configuration
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
  const auth = getAuth();
  const form=document.getElementById("form")
btn.onclick=(e)=>{
     const forms=new FormData(form)
  e.preventDefault()
const email = document.getElementById("admin-email").value.trim();
const password = document.getElementById("admin-password").value.trim();
const passwordConfirm = document.getElementById("confirm-password").value.trim();
if(!form.checkValidity()){
  form.reportValidity()
  return
}
    if (password!==passwordConfirm) {
       return alert("Password Missmatch")
    }else if(password===passwordConfirm){
        createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        forms.append("companyUID",user.uid)
   
      }).then(()=>{
        fetch("/",{
          method:"POST",
          body:forms
        })
        .then(()=>{
          alert("Company Registered Sucessfully")
          window.location="./logIn.html"
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
    }


  }