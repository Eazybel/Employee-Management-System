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
fetch("/myEmployees",{
  method:"POST",
  headers:{
"Content-type":"application/json"
  },
  body:JSON.stringify({uid:user.uid})
})
  .then(res=>{
    return res.json()
  })
  .then(data=>{
    console.log(data)
  for (let i = 0; i < data.length; i++) {
   employeeList.insertAdjacentHTML("beforeend",`<div class="employee-card bg-white rounded-3xl shadow-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center"
                 data-name="John Doe" data-job-title="Software Engineer" data-job-type="Full-time">
                <img src="${data[i].profilePhoto}" alt="${data[i].personalInfo.fullName}" class="w-24 h-24 rounded-full border-4 border-indigo-400 mb-4 shadow-lg">
                <h3 class="text-2xl font-bold text-gray-900">${data[i].personalInfo.fullName}</h3>
                <p class="text-indigo-600 font-medium mb-2">${data[i].employmentDetails.jobTitle}</p>
                <div class="text-sm text-gray-600 mb-4 space-y-1">
                    <p><i class="fas fa-envelope mr-2"></i>${data[i].email}</p>
                    <p><i class="fas fa-phone-alt mr-2"></i>${data[i].email}</p>
                    <p><i class="fas fa-venus-mars mr-2"></i>Male</p>
                    <p><i class="fas fa-calendar-alt mr-2"></i>Hired: 2020-03-15</p>
                </div>
                <button class="see-profile-btn bg-indigo-600 text-white w-full py-3 rounded-xl font-medium shadow-md hover:bg-indigo-700 transition-colors duration-300">
                    See Full Profile
                </button>
            </div>`) 
    
  }
  }).catch(err=>{
    console.log(err)
  })
  addEmployeeBtn.onclick=()=>{
    window.location="./Employee-Register.html"
  }
  } else {
     window.location="./logIn.html"
  }
});