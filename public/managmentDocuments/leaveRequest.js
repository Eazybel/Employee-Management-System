    const leaveRequestModal=document.getElementById("leaveRequestModal")
    const submitBtn=document.getElementById("submitBtn")
    const cancelBtn=document.getElementById("cancelBtn")
    const GrantleaveRequest=document.getElementById("GrantleaveRequest")
    const names=document.getElementById("employeeName")
    const ongoing=document.getElementById("ongoing")
    const leaveRequestForm=document.getElementById("leaveRequestForm")
    const leaveReports=document.getElementById("expiryReports")
    GrantleaveRequest.onclick=()=>{
    leaveRequestModal.classList.remove("hidden")
    }
    cancelBtn.onclick=()=>{
    leaveRequestModal.classList.add("hidden")
    }
    fetch("/nameData",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({companyUID:localStorage.getItem("UID")})
    }
    ).then(res=>{
        return res.json()
    }).then(data=>{
        data.forEach(fullNames=>{
            names.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
           let leaveRequest=fullNames.leaveRequest
          if(leaveRequest.length!==0){
              for (let i = 0; i < leaveRequest.length; i++) {
                  if (leaveRequest[i].logStatus===false) {
                        let today=new Date()
                        let expiry=new Date(leaveRequest[i].endDate)
                        if(today>expiry){
                        ongoing.insertAdjacentHTML("beforeend",`<div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <p class="text-lg font-medium text-gray-800 employeeName">${fullNames.personalInfo.fullName} - <span class="font-normal text-sm text-gray-500">${leaveRequest[i].reason}</span></p>
                            <p class="text-sm text-gray-600">Start: ${leaveRequest[i].startDate}, End: ${leaveRequest[i].endDate}</p>
                        </div>
                        <div class="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 flex items-center space-x-2">
                            <span class=" inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                Expired
                            </span>
                            <span class="hidden inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Ongoing
                            </span>
                            <div class="flex gap-2 mt-4 sm:mt-0">
                                    <button id="logger" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
                                            Add Log
                                        </button>
                                <button id="fullProfile" class="bg-purple-800 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
                                    Full Profile
                                </button>
                            </div>
                        </div>
                    </div>`)
                        }else{
               ongoing.insertAdjacentHTML("beforeend",`<div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <p class="text-lg font-medium text-gray-800 employeeName">${fullNames.personalInfo.fullName} - <span class="font-normal text-sm text-gray-500">${leaveRequest[i].reason}</span></p>
                    <p class="text-sm text-gray-600">Start: ${leaveRequest[i].startDate}, End: ${leaveRequest[i].endDate}</p>
                </div>
                <div class="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 flex items-center space-x-2">
                    <span class="hidden inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                        Expired <span class="ml-1 font-bold">4 days ago</span>
                    </span>
                    <span class=" inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Ongoing
                    </span>
                    <div class="flex gap-2 mt-4 sm:mt-0">
                            <button id="logger" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
                                    Add Log
                                </button>
                        <button id="fullProfile" class="bg-purple-800 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
                            Full Profile
                        </button>
                    </div>
                </div>
            </div>`)                
           }
            
            }else if (leaveRequest[i].logStatus===true){
                
                leaveReports.insertAdjacentHTML("beforeend",`<div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
            <p class="text-lg font-medium text-gray-800 employeeName">${fullNames.personalInfo.fullName} - <span class="font-normal text-sm text-gray-500">${leaveRequest[i].reason}</span></p>
            <p class="text-sm text-gray-600">Start: ${leaveRequest[i].startDate}, End: ${leaveRequest[i].endDate}</p>
        </div>
        <div class="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 flex items-center space-x-2">
            <span class="hidden inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                Expired upon log <span class="ml-1 font-bold">4 days ago</span>
            </span>
            <div class="flex gap-2 mt-4 sm:mt-0">
                <button id="fullProfile" class="bg-purple-800 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
                    Full Profile
                </button>
            </div>
        </div>
    </div>`)
            }
           }
          }
        })

    
    }).then(()=>{
   const employeeName=document.querySelectorAll("p.employeeName")
const filterBtn=document.getElementById("nameFinder")
filterBtn.addEventListener("keyup",(e)=>{
    let target= e.target.value.toLowerCase()
    employeeName.forEach(employee=>{
        let text=employee.innerText.toLowerCase()
        if(text.includes(target)){
                employee.parentElement.parentElement.style.display=""
            }else{
            employee.parentElement.parentElement.style.display="none"

        }
    })
})

const log=document.querySelectorAll("#logger")
 log.forEach(btn=>{
    btn.onclick=()=>{
        let employeeName=btn.parentElement.parentElement.parentElement.querySelector("p.employeeName").innerText.split("-")
        employeeName=employeeName[0].trimEnd()
        fetch("/logLeaveRequest",{
               method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({companyUID:localStorage.getItem("UID"),employeeName:employeeName,logStatus:true})
        }).then((res)=>{
            return res.json()
        }).then(data=>{
             btn.parentElement.parentElement.parentElement.style.display="none"
                  leaveReports.insertAdjacentHTML("beforeend",`<div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
            <p class="text-lg font-medium text-gray-800 employeeName">${data.personalInfo.fullName} - <span class="font-normal text-sm text-gray-500">${data.leaveRequest[data.leaveRequest.length-1].reason}</span></p>
            <p class="text-sm text-gray-600">Start: ${data.leaveRequest[data.leaveRequest.length-1].startDate}, End: ${data.leaveRequest[data.leaveRequest.length-1].endDate}</p>
        </div>
        <div class="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 flex items-center space-x-2">
            <span class="hidden inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                Expired upon log <span class="ml-1 font-bold">4 days ago</span>
            </span>
            <div class="flex gap-2 mt-4 sm:mt-0">
                <button id="fullProfile" class="bg-purple-800 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
                    Full Profile
                </button>
            </div>
        </div>
    </div>`)
        })
    }
 })
    })
submitBtn.onclick=(e)=>{
e.preventDefault()
if(leaveRequestForm.checkValidity()){
const form=new FormData(leaveRequestForm)
form.append("companyUID",localStorage.getItem("UID"))
 fetch("/leaveController",{
      method:"POST",
      body:form
     }).then((res)=>{
            return res.json()
     }).then(data=>{
        console.log(data)
        ongoing.insertAdjacentHTML("beforeend",`<div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <p class="text-lg font-medium text-gray-800 employeeName">${fullNames.personalInfo.fullName} - <span class="font-normal text-sm text-gray-500">${leaveRequest[i].reason}</span></p>
                    <p class="text-sm text-gray-600">Start: ${leaveRequest[i].startDate}, End: ${leaveRequest[i].endDate}</p>
                </div>
                <div class="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 flex items-center space-x-2">
                    <span class="hidden inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                        Expired <span class="ml-1 font-bold">4 days ago</span>
                    </span>
                    <span class=" inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Ongoing
                    </span>
                    <div class="flex gap-2 mt-4 sm:mt-0">
                            <button id="logger" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
                                    Add Log
                                </button>
                        <button id="fullProfile" class="bg-purple-800 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
                            Full Profile
                        </button>
                    </div>
                </div>
            </div>`)
     })
     alert("Saved")
    leaveRequestForm.reset()
}else{
    leaveRequestForm.reportValidity()
}

}