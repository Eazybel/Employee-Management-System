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
  const fullName = document.getElementById('full-name').value.trim();
const gender = document.getElementById('gender').value.trim();
const birthdate = document.getElementById('birthdate').value.trim();
const maritalStatus = document.getElementById('marital-status').value.trim();
const profilePhoto = document.getElementById('profile-photo').value.trim();
const email = document.getElementById('email').value.trim();
const address = document.getElementById('address').value.trim();
const emergencyName = document.getElementById('emergency-name').value.trim();
const emergencyPhone = document.getElementById('emergency-phone').value.trim();
const jobTitle = document.getElementById('job-title').value.trim();
const employeeType = document.getElementById('employee-type').value.trim();
const dateOfHire = document.getElementById('date-of-hire').value.trim();
const bankAccount = document.getElementById('bank-account').value.trim();
const documents = document.getElementById('document').value.trim();
  if (user) {
    const uid = user.uid;
btn.onclick=()=>{
  console.log(fullName,gender,birthdate,maritalStatus,profilePhoto,email,address,emergencyName,emergencyPhone,jobTitle,employeeType,dateOfHire,bankAccount,documents)
}
  } else {
     window.location="./logIn.html"
  }
});