import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { signOut,getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
  // sidebar toggle
      const menuBtn = document.getElementById('menuBtn');
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('overlay');
      const closeSidebar = document.getElementById('closeSidebar');

      function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }

      function close() {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }

      menuBtn?.addEventListener('click', openSidebar);
      closeSidebar?.addEventListener('click', close);
      overlay?.addEventListener('click', close);
const closeBtn = document.getElementById('closeBtn');
const submitBtn = document.getElementById('btn');
const registerContainer=document.getElementById("registerContainer")
const main=document.querySelector("main")
const header=document.querySelector("header")
const form = document.getElementById('form');
 const firebaseConfig = {
    apiKey: "AIzaSyBKSuvaWfC7v1bwH12pVJTilwyk3mamxxI",
    authDoheader: "employee-managment-syste-fdd4c.firebaseapp.com",
    projectId: "employee-managment-syste-fdd4c",
    storageBucket: "employee-managment-syste-fdd4c.firebasestorage.app",
    messagingSenderId: "1016929288920",
    appId: "1:1016929288920:web:0cc4e437af745933430dad"
  };
  let cloudImage;
  let cloudRaw;
fetch("/hide")
.then(res=>{
  return res.json()
})
.then(data=>{
cloudImage=data.urlImage
cloudRaw=data.urlRaw
})
// Variables initialization
 const jobTitleFilter = document.getElementById('job-title-filter');
 const nameFilter = document.getElementById('name-filter');
const addEmployeeBtn = document.getElementById('addEmployeeBtn');
const logoutBtn = document.getElementById('logoutBtn');
// Get the filter input elements by their IDs
let dataLength;
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
    dataLength=data.allEmployee.length
   if (data.allEmployee.length>0) {
    for (let i = 0; i < data.allEmployee.length; i++) {
   employeeList.insertAdjacentHTML("beforeend",`<div class="employee-card bg-white rounded-3xl shadow-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center"
     data-name="${data.allEmployee[i].personalInfo.fullName}" 
     data-job-title="${data.allEmployee[i].employmentDetails.jobTitle}" 
     data-job-type="${data.allEmployee[i].employmentDetails.employeeType}">

  <img src="${data.allEmployee[i].personalInfo.profilePhoto}" alt="${data.allEmployee[i].personalInfo.fullName}" class="w-24 h-24 rounded-full border-4 border-indigo-400 mb-4 shadow-lg">

  <h3 class="text-lg font-bold text-gray-900 names">${data.allEmployee[i].personalInfo.fullName}</h3>
  <p class="text-indigo-600 font-medium mb-2 jobTitles">${data.allEmployee[i].employmentDetails.jobTitle}</p>
  <p class="text-gray-500 font-semibold mb-2 jobType">${data.allEmployee[i].employmentDetails.employeeType}</p>

  <div class="text-sm text-gray-600 mb-4 space-y-1">
    <p class="employeeID"><i class="fas fa-id-badge mr-2" ></i>ID: ${data.allEmployee[i].employmentDetails.employeeID}</p> <!-- 👈 Employee ID added -->
    <p><i class="fas fa-envelope mr-2"></i>${data.allEmployee[i].personalInfo.email}</p>
    <p><i class="fas fa-phone-alt mr-2"></i>${data.allEmployee[i].personalInfo.phone}</p>
    <p><i class="fas fa-venus-mars mr-2"></i>${data.allEmployee[i].personalInfo.gender}</p>
    <p><i class="fas fa-calendar-alt mr-2"></i>Hired: ${data.allEmployee[i].employmentDetails.dateOfHire.slice(0,10)}</p>
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
                No employees registered
            </h1>
            <p class="text-sm text-gray-600">
                Get started by adding your first employee to the system.
            </p>
        </div>`
    )
   }
  return data
  }).then((data)=>{
    //FILTERING CODE SECTION
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
  return data
  }).then((data)=>{
    submitBtn.onclick=async(e)=>{
   
    const forms=new FormData(form)
    forms.append("UID",user.uid)
    if(!form.checkValidity()){
        form.reportValidity()
        return
    }
    e.preventDefault()
try {
   // Employee Register Managment Section
   
       let employeeID;
          let companyAbr=data.companyName
            const now= new Date()
            const year=now.getFullYear()
            let employeeNumber=String(dataLength).padStart(3,"0")
            employeeNumber=Number(employeeNumber)+1
            employeeNumber=String(employeeNumber).padStart(3,"0")
        employeeID=`${companyAbr.slice(0,3)}${year}${employeeNumber}`
        dataLength++
        // data sent to the api below this code
    const cv=document.getElementById("document").files[0]
    const cloudinary1=new FormData()
        cloudinary1.append("file",cv)
        cloudinary1.append("upload_preset","employeeDocument")
        
    const cloudinary2=new FormData()
const profileImage=document.getElementById("profile-photo").files[0]
        cloudinary2.append("file",profileImage)
        cloudinary2.append("upload_preset","employeeProfile")

const [cvRes,profileRes]=await Promise.all([
     fetch(cloudRaw,{
        method:"POST",
        body:cloudinary1
    }),
    fetch(cloudImage,{
            method:"POST",
            body:cloudinary2
        })
])
const data1=await cvRes.json()
const data2=await profileRes.json()
forms.append("documentUrl",data1.url)
forms.append("profileUrl",data2.url)
forms.append("employeeID",employeeID)
const toTheBackend=fetch("/employeeRegister",{
        method:"POST",
        body:forms
    })
    const res3=await toTheBackend
    const data3=await res3.json()
    .then(()=>{
        alert("Employee Registered Sucessully You Can Add-More")
        form.reset()
    })
} catch (error) {
    console.log(error)
}
}
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
  //POPUP MODAL OPENING
  addEmployeeBtn.onclick=()=>{
  
    registerContainer.classList.remove("hidden")
    main.classList.add("hidden")
    header.classList.add("hidden")
  }
  closeBtn.onclick=()=>{
    registerContainer.classList.add("hidden")
    main.classList.remove("hidden")
    header.classList.remove("hidden")
    window.location.reload()
  }
  } else {
     window.location="./logIn.html"
  }
});