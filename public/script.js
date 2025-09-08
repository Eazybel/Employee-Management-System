import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { signOut,getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
 const firebaseConfig = {
    apiKey: "AIzaSyBKSuvaWfC7v1bwH12pVJTilwyk3mamxxI",
    authDomain: "employee-managment-syste-fdd4c.firebaseapp.com",
    projectId: "employee-managment-syste-fdd4c",
    storageBucket: "employee-managment-syste-fdd4c.firebasestorage.app",
    messagingSenderId: "1016929288920",
    appId: "1:1016929288920:web:0cc4e437af745933430dad"
  };
// Variables initialization
 const jobTitleFilter = document.getElementById('job-title-filter');
 const nameFilter = document.getElementById('name-filter');
const addEmployeeBtn = document.getElementById('addEmployeeBtn');
const logoutBtn = document.getElementById('logoutBtn');
const body=document.querySelector("body")
// Get the filter input elements by their IDs

const jobTypeFilter = document.getElementById('job-type-filter');

// Get the filter and employee list elements
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
   localStorage.setItem("numberOfEmployee",data.length)
   if (data.length>0) {
    for (let i = 0; i < data.length; i++) {
   employeeList.insertAdjacentHTML("beforeend",`<div class="employee-card bg-white rounded-3xl shadow-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center"
     data-name="${data[i].personalInfo.fullName}" 
     data-job-title="${data[i].employmentDetails.jobTitle}" 
     data-job-type="${data[i].employmentDetails.employeeType}">

  <img src="${data[i].personalInfo.profilePhoto}" alt="${data[i].personalInfo.fullName}" class="w-24 h-24 rounded-full border-4 border-indigo-400 mb-4 shadow-lg">

  <h3 class="text-lg font-bold text-gray-900 names">${data[i].personalInfo.fullName}</h3>
  <p class="text-indigo-600 font-medium mb-2 jobTitles">${data[i].employmentDetails.jobTitle}</p>
  <p class="text-gray-500 font-semibold mb-2 jobType">${data[i].employmentDetails.employeeType}</p>

  <div class="text-sm text-gray-600 mb-4 space-y-1">
    <p class="employeeID"><i class="fas fa-id-badge mr-2" ></i>ID: ${data[i].employmentDetails.employeeID}</p> <!-- 👈 Employee ID added -->
    <p><i class="fas fa-envelope mr-2"></i>${data[i].personalInfo.email}</p>
    <p><i class="fas fa-phone-alt mr-2"></i>${data[i].personalInfo.phone}</p>
    <p><i class="fas fa-venus-mars mr-2"></i>${data[i].personalInfo.gender}</p>
    <p><i class="fas fa-calendar-alt mr-2"></i>Hired: ${data[i].employmentDetails.dateOfHire.slice(0,10)}</p>
  </div>

  <button id="profileBtn" class="see-profile-btn bg-indigo-600 text-white w-full py-3 rounded-xl font-medium shadow-md hover:bg-indigo-700 transition-colors duration-300">
    See Full Profile
  </button>
</div>
`) 
  }
   }else{
    employeeList.insertAdjacentHTML("beforeend",
      `  <div class="text-center p-8 bg-white rounded-xl shadow-lg w-full col-span-full">
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                No employees registered, please add employees
            </h1>
            <p class="text-sm text-gray-600">
                Get started by adding your first employee to the system.
            </p>
        </div>`
    )
   }
  
  }).then(()=>{
 const jobTitles=document.querySelectorAll("p.jobTitles")
 const names=document.querySelectorAll("h3.names")
 const jobType=document.querySelectorAll("p.jobType")
const profileBtn=document.querySelectorAll("#profileBtn")

  jobTitleFilter.addEventListener("keyup",(e)=>{
    let target=e.target.value
   let targetValue=target.toLowerCase()
   jobTitles.forEach(titles => {
   let text=titles.innerText.toLowerCase()
    if (text.includes(targetValue)) {
      titles.parentElement.style.display=""
    }else{
      titles.parentElement.style.display="none"
    }
   });
  })
  nameFilter.addEventListener("keyup",(e)=>{
    let target=e.target.value
   let targetValue=target.toLowerCase()
   names.forEach(name => {
   let text=name.innerText.toLowerCase()
    if (text.includes(targetValue)) {
      name.parentElement.style.display=""
    }else{
      name.parentElement.style.display="none"
    }
   });
  })
  jobTypeFilter.addEventListener("keyup",(e)=>{
    let target=e.target.value
   let targetValue=target.toLowerCase()
   jobType.forEach(types => {
   let text=types.innerText.toLowerCase()
    if (text.includes(targetValue)) {
      types.parentElement.style.display=""
    }else{
      types.parentElement.style.display="none"
    }
   });
  })
  profileBtn.forEach(btns=>{
  btns.onclick=()=>{
   const profilerID=btns.parentElement.querySelector("p.employeeID").innerText.replace("ID: ","")
   localStorage.setItem("profilerID",profilerID)
   window.location="./Employee-Profile.html"
  }
  })
  })
  .catch(err=>{
    console.log(err)
  })
  logoutBtn.onclick=()=>{
      signOut(auth)
      .then(()=>{
        window.location="./logIn.html"
      })
  }
  addEmployeeBtn.onclick=()=>{
    window.location="./Employee-Register.html"
  }
  } else {
     window.location="./logIn.html"
  }
});