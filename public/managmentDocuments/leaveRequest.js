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
// VARIABLE DECLARATION
const grantLeaveBtn=document.getElementById("grantLeaveBtn")
const leaveRequestModal=document.getElementById("leaveRequestModal")
const cancelBtn=document.getElementById("cancelBtn")
const employeeName=document.getElementById("employeeName")
const body=document.querySelector("body")
grantLeaveBtn.onclick=()=>{
    leaveRequestModal.classList.remove("hidden")
}
cancelBtn.onclick=()=>{
    window.location.reload()
}
// employee list fetcher data
fetch("/nameData",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({companyUID:localStorage.getItem("UID")})
}).then(res=>{
    return res.json()
}).then(data=>{
    if(data.length==0){
body.innerHTML=`  <div class="text-center p-8 bg-white rounded-xl shadow-lg w-full col-span-full">
    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
        No employees registered
    </h1>
    <p class="text-sm text-gray-600 mb-6">
        Get started by adding your first employee to the system in the home page.
    </p>
    
    <!-- Added Button -->
    <a href="../index.html" class="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 transition shadow-md addEmployeeBtn">
        Home page
    </a>
</div>`
    }else if(data.length!=0)[
        data.forEach(employee=>{
  employeeName.insertAdjacentHTML("beforeend",`<option value="${employee.personalInfo.fullName}">${employee.personalInfo.fullName}</option>`)
        })
       
    ]
})
  } else {
    window.location.href="./logIn.html"
  }
});
