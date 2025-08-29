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
// Variables initialization
const addEmployeeBtn = document.getElementById('addEmployeeBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Get the filter input elements by their IDs
const nameFilter = document.getElementById('name-filter');
const jobTitleFilter = document.getElementById('job-title-filter');
const jobTypeFilter = document.getElementById('job-type-filter');

// Get the filter and employee list elements
const filterBtn = document.getElementById('filterBtn');
const employeeList = document.getElementById('employee-list');
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
  addEmployeeBtn.onclick=()=>{
    window.location="./Employee-Register.html"
  }
    console.log("sucess")
  } else {
     window.location="./logIn.html"
  }
});