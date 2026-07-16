import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBKSuvaWfC7v1bwH12pVJTilwyk3mamxxI",
    authDoheader: "employee-managment-syste-fdd4c.firebaseapp.com",
    projectId: "employee-managment-syste-fdd4c",
    storageBucket: "employee-managment-syste-fdd4c.firebasestorage.app",
    messagingSenderId: "1016929288920",
    appId: "1:1016929288920:web:0cc4e437af745933430dad"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
// VARIABLES ASSIHNMENT
const employeeNumber=document.getElementById("employeeNumber")
const companyName=document.getElementById("companyName")
const companyLogo=document.getElementById("companyLogo")
const adminName=document.getElementById("adminName")
const adminInfo=document.getElementById("adminInfo")
const dataContainer=document.getElementById("dataContainer")
const payRollShower=document.getElementById("payRollShower")
const employeesName=document.getElementById("employeesName")
const popupPost=document.getElementById("popupPost")
const announcementDialog=document.getElementById("announcementDialog")
const popupOpenBtn=document.getElementById("popupOpenBtn")
const popupCloseBtn=document.getElementById("popupCloseBtn")
const announcementBtn=document.getElementById("announcementBtn")
const announcementSumbitBtn=document.getElementById("announcementSumbitBtn")
const announcementCloseBtn=document.getElementById("announcementCloseBtn")
const announcementForm=document.getElementById("announcementForm")
const announceLogContainer=document.getElementById("announceLogContainer")
const pendingResignationCard=document.getElementById("pendingResignationCard")
const pendingTaskCard=document.getElementById("pendingTaskCard")
let lastLogTask=[]

// ADMIN DATA FETCH CODE BLOCK
fetch("/companyFetch",{
method:"POST",
headers:{"Content-type":"application/json"},
body:JSON.stringify({"companyUID":localStorage.getItem("UID")})
})
.then((res)=>{
return res.json()
})
.then((data)=>{
companyLogo.setAttribute("src",`${data.companyLogo}`)
companyName.innerText=`${data.companyName}`
adminName.innerText=`${data.adminAccount.adminName}`

})
// USER DAATA FETCHING CODE BLOCK

fetch("/nameData",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({companyUID:localStorage.getItem("UID")})
}).then(res=>{
    return res.json()
}).then(data=>{
if(data.length==0){
console.log(data)
//PAYROLL DAY LEFT CONTROLLER
payRollShower.innerText="No employee recorded to payroll"
dataContainer.innerHTML=`  <div class="text-center p-8 bg-white rounded-xl shadow-lg w-full col-span-full">
    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
        No employees registered
    </h1>
    <p class="text-sm text-gray-600 mb-6">
        Get started by adding your first employee to the system.
    </p>
    
    <!-- Added Button -->
    <button class="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 transition shadow-md addEmployeeBtn">
        + Add  Employee
    </button>
</div>`
employeeNumber.innerText=`${data.length} : Active-employees`
}else if(data.length!=0){
// ANNOUNCEMENT LOG CONFIG SECTION
for (let i = data[0].announcements.length; i > data[0].announcements.length-3 ; i--) {
 if (data[0].announcements[i-1].priorirty=="low") {
  announceLogContainer.insertAdjacentHTML("beforeend",
`
       <p class="text-sm text-gray-600 bg-gray-50 p-2 rounded border-l-4 border-green-500">
        ${data[0].announcements[i-1].title} 
        <span class="float-right text-xs text-gray-400 font-mono">${new Date(data[0].announcements[i-1].date).toDateString()}</span>
    </p>              
`)
}else if(data[0].announcements[i-1].priorirty=="high"){
   announceLogContainer.insertAdjacentHTML("beforeend",
`
      <p class="text-sm text-gray-600 bg-gray-50 p-2 rounded border-l-4 border-red-500">
       ${data[0].announcements[i-1].title}  
        <span class="float-right text-xs text-gray-400 font-mono">${new Date(data[0].announcements[i-1].date).toDateString()} </span>
    </p>              
`)
} else if(data[0].announcements[i-1].priorirty=="medium"){
   announceLogContainer.insertAdjacentHTML("beforeend",
`
     <p class="text-sm text-gray-600 bg-gray-50 p-2 rounded border-l-4 border-yellow-500">
        ${data[0].announcements[i-1].title} 
        <span class="float-right text-xs text-gray-400 font-mono">${new Date(data[0].announcements[i-1].date).toDateString()}</span>
    </p>                  
`)
}
}



//  PENDING RESIGNATION CODE BLOCK {#be6,14}
const lastLogResignation=[]
for (let i = 0; i < data.length; i++) {
if(data[i].resignation.length==0){
// console.log("resignation not found")
}else if(data[i].resignation.length!=0){
data[i].resignation.forEach(resign=>{

// HAVE A LOGIC BUG {#e23,4}
if(new Date(resign.noticeDate).getTime()>new Date().getTime()&&resign.ongoingStatus==true){
lastLogResignation.push(data[i])
}
})
}
}
//PENDING TASKS CODE BLOCK

for (let i = 0; i < data.length; i++) {
  if(data[i].task.length!=0){
console.log(data[i].task)
}
  
}

lastLogResignation.slice(0,3).forEach((resigns,i)=>{
pendingResignationCard.insertAdjacentHTML("beforeend",
`<p class="text-sm text-gray-700 bg-yellow-50 p-2 rounded flex justify-between items-center">
                    <span>Resignation: ${resigns.personalInfo.fullName}</span>
                    <span class="text-xs text-yellow-600/70 font-mono"> ${new Date(resigns.resignation[0].noticeDate).toDateString()}</span>
                </p>
`
)
})



const now=new Date()
payRollShower.innerText=`${now.getMonth()+1-30} Days left`.replace("-","")
employeeNumber.innerText=`${data.length} : Active-employees`
data.forEach(employees => {
  employeesName.insertAdjacentHTML("beforeend",`<option class="fullProfile" value="${employees.employmentDetails.employeeID}">${employees.personalInfo.fullName}</option>`)
const profileBtn=document.getElementById("fullProfileBtn")
//FULL PROFILE SHOW BASED ON SEARCH BAR
 profileBtn.onclick=()=>{
const fullProfileInput=document.getElementById("fullProfileInput").value
const profilerID=fullProfileInput
   localStorage.setItem("profilerID",profilerID)
   window.location="./Employee-Profile.html"

  }
});

}

})
//POST VACCANCY POPUP BUTTON CONFIG
popupOpenBtn.onclick=()=>{

popupPost.showModal()
}
popupCloseBtn.onclick=()=>{

popupPost.close()
}
// ANNOUNCEMENT POPUP SETUP SECTION
announcementBtn.onclick=()=>{
announcementDialog.showModal()
}
announcementCloseBtn.onclick=()=>{
announcementDialog.close()
window.location.reload()
}
// ANNOUNCEMENT DATA SETUP SECTION
announcementSumbitBtn.onclick=()=>{
const title=document.getElementById("title").value
const description=document.getElementById("description").value
const priorirty=document.getElementById("priorirty").value
const announceData={
title:title,
description:description,
priorirty:priorirty,
date:new Date(),
UID:localStorage.getItem("UID")
}
fetch("/dashboard",{
method:"POST",
headers:{"Content-type":"application/json"},
body:JSON.stringify(announceData)
})
.then((res)=>{
return res.json()
})
.then((data)=>{
console.log(data)
})
}
// SIGNING OUT SECTION
 const logoutBtn=document.getElementById("logoutBtn")
logoutBtn.onclick=()=>{
  signOut(auth)
      .then(()=>{
        window.location="./logIn.html"
      })
}   
    const uid = user.uid;
    // ...
  } else {
    window.location.href="./logIn.html"
  }
});
