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
onAuthStateChanged(auth,async (user) => {
  if (user) {
// VARIABLE DECLARATION
const token=await user.getIdToken()
const grantLeaveBtn=document.getElementById("grantLeaveBtn")
const leaveRequestModal=document.getElementById("leaveRequestModal")
const submitBtn=document.getElementById("submitBtn")
const cancelBtn=document.getElementById("cancelBtn")
const employeeName=document.getElementById("employeeName")
const body=document.querySelector("body")
const logContainer=document.getElementById("logContainer")
const activeContainer=document.getElementById("activeRequestsList")
grantLeaveBtn.onclick=()=>{
    leaveRequestModal.classList.remove("hidden")
}
cancelBtn.onclick=()=>{
    window.location.reload()
}
// employee list fetcher data
fetch("/nameData",{
    method:"POST",
    headers:{"Content-type":"application/json",
        "Authorization":`Bearer ${token}`
    },
    body:JSON.stringify({companyUID:localStorage.getItem("UID")})
}).then(res=>{
    return res.text()
}).then(data=>{

    if(data.length==0){
body.innerHTML=`<div class="text-center p-8 bg-white rounded-xl shadow-lg w-full col-span-full">
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
    }else if(data.length!=0){
let dataCount=0
    data.forEach((employee,i)=>{
        // name list update code block
  employeeName.insertAdjacentHTML("beforeend",`<option value="${employee.personalInfo.fullName}">${employee.personalInfo.fullName}</option>`)
// logs and ongoing requests update block
if(employee.leaveRequest.length!=0){
dataCount++
}
})
if(dataCount==0){
document.querySelector("main").innerHTML=`<div class="text-center p-8 bg-white rounded-xl shadow-lg w-full col-span-full">
    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
        No employees leave request registered
    </h1>
    <p class="text-sm text-gray-600 mb-6">
        Get started by adding the first leave request.
    </p>

</div>`
}else if(dataCount>0){
  data.forEach(employee=>{
    if(employee.leaveRequest.length!=0){
        employee.leaveRequest.forEach(requests=>{
             if(requests.logStatus==="active"){
                // active container log code block
          activeContainer.insertAdjacentHTML("beforeend",
            `
             <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <div class="flex items-center space-x-2 mb-1">
                            <p class="text-lg font-medium text-gray-800 employeeName">${requests.employeeName}</p>
                            <span class="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Pending</span>
                        </div>
                        <p class="text-sm text-gray-600">Type: ${requests.reason} | From: ${requests.startDate} To: ${requests.endDate}</p>
                    </div>
                    <div class="flex items-center space-x-3 w-full sm:w-auto justify-end">
                        <button class="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow transition duration-200 flex items-center approve">
                            <i class="fas fa-check mr-1.5"></i> Approve
                        </button>
                        <button class="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow transition duration-200 flex items-center deny">
                            <i class="fas fa-times mr-1.5"></i> Deny
                        </button>
                    </div>
                </div>
            `
          )


        }
        })
    }
})
const logBtns=document.querySelectorAll(".approve, .deny")
logBtns.forEach(btns=>{
    console.log(btns)
})

}
 
 
       

// filter action code block {#61f,12}
body.addEventListener("keyup",(e)=>{
const target=(e.target.value || "").toLowerCase()
const employeeName=document.querySelectorAll(".employeeName")
employeeName.forEach(employee=>{
    const text=employee.innerText.toLowerCase()
    if(text.includes(target)){
      employee.parentElement.parentElement.parentElement.style.display=""
    }else{
      employee.parentElement.parentElement.parentElement.style.display="none"
    }
})
})


  }
// form validation and server fetch code block
submitBtn.onclick=(e)=>{
e.preventDefault()
const leaveRequestForm=document.getElementById("leaveRequestForm")
const form=new FormData(leaveRequestForm)
form.append("companyUID",localStorage.getItem("UID"))
if(leaveRequestForm.checkValidity()){
const formDataClear=Object.fromEntries(form.entries())

fetch("/leaveController",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify(formDataClear)
}).then(res=>{
    return res.json()
}).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})
window.alert("Request Saved")
leaveRequestForm.reset()
}else if(!leaveRequestForm.checkValidity()){
leaveRequestForm.reportValidity()
}
}


})
  } else {
    window.location.href="./logIn.html"
  }
});
