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

// Profile & Personal Information
const profilePhotoInput = document.getElementById('profilePhotoInput');
const profileName = document.getElementById('profileName');
const jobTitle = document.getElementById('jobTitle');
const personalInfoSection = document.getElementById('personalInfoSection');
const emergencyContactSection = document.getElementById('emergencyContactSection');
const employmentDetailsSection = document.getElementById('employmentDetailsSection');
const documentsSection = document.getElementById('documentsSection');

// Employee History Tables
const absencesTableBody = document.getElementById('absencesTableBody');
const lateArrivalsTableBody = document.getElementById('lateArrivalsTableBody');
const overtimeTableBody = document.getElementById('overtimeTableBody');
const leaveRequestsTableBody = document.getElementById('leaveRequestsTableBody');
const promotionsTableBody = document.getElementById('promotionsTableBody');
  if (user) {
    const uid = user.uid;
saveBtn.onclick=()=>{
  
}
  } else {
     window.location="./logIn.html"
  }
});