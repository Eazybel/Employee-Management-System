    const leaveRequestModal=document.getElementById("leaveRequestModal")
    const submitBtn=document.getElementById("submitBtn")
    const cancelBtn=document.getElementById("cancelBtn")
    const GrantleaveRequest=document.getElementById("GrantleaveRequest")
    const names=document.getElementById("employeeName")
    const ongoing=document.getElementById("ongoing")
    const leaveRequestForm=document.getElementById("leaveRequestForm")
    const expiryReports=document.getElementById("expiryReports")
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
    //        let expiry=fullNames.expiry
    //       if(expiry.length!==0){
    //        for (let i = 0; i < expiry.length; i++) {
    //         if (expiry[i].expiry===false) {
    //          ongoing.insertAdjacentHTML("beforeend",`<div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
    //     <div>
    //         <p class="text-lg font-medium text-gray-800">Michael Scott - <span class="font-normal text-sm text-gray-500">Vacation</span></p>
    //         <p class="text-sm text-gray-600">Start: 2024-09-01, End: 2024-09-05</p>
    //     </div>
    //     <div class="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 flex items-center space-x-2">
    //         <span class="hidden inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
    //             Expired <span class="ml-1 font-bold">4 days ago</span>
    //         </span>
    //         <span class=" inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
    //             Ongoing
    //         </span>
    //         <div class="flex gap-2 mt-4 sm:mt-0">
    //                 <button id="logger" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
    //                         Add Log
    //                     </button>
    //             <button id="fullProfile" class="bg-purple-800 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
    //                 Full Profile
    //             </button>
    //         </div>
    //     </div>
    // </div>`)
    //         }else if (expiry[i].expiry===true){
                
    //             expiryReports.insertAdjacentHTML("beforeend",`<div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
    //     <div>
    //         <p class="text-lg font-medium text-gray-800">Michael Scott - <span class="font-normal text-sm text-gray-500">Vacation</span></p>
    //         <p class="text-sm text-gray-600">Start: 2024-09-01, End: 2024-09-05</p>
    //     </div>
    //     <div class="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 flex items-center space-x-2">
    //         <span class="hidden inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
    //             Expired upon log <span class="ml-1 font-bold">4 days ago</span>
    //         </span>
    //         <div class="flex gap-2 mt-4 sm:mt-0">
    //             <button id="fullProfile" class="bg-purple-800 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
    //                 Full Profile
    //             </button>
    //         </div>
    //     </div>
    // </div>`)
    //         }
    //        }
    //       }
        })

    
    }).then(()=>{
    //      const employeeName=document.querySelectorAll("p.employeeName")
    //         nameFinder.addEventListener("keyup",(e)=>{
    //     let target=e.target.value.toLowerCase()
    //     employeeName.forEach(name => {
    //         let text=name.innerText.toLowerCase()
    //         if (text.includes(target)) {
    //             name.parentElement.parentElement.style.display=""
    //         }else{
    //             name.parentElement.parentElement.style.display="none"
                
    //         }
    //     });
    // })
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
//         ongoing.insertAdjacentHTML("beforeend",`<div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
//     <div class="flex-grow">
//         <p class="text-lg font-medium text-gray-800">${data.employeeName} - <span class="font-normal text-sm text-gray-500">Illness</span></p>
//         <p class="text-sm text-gray-600">Date: ${data.absenceDate}, Duration: ${data.absenceDuration} days</p>
//     </div>
//     <div class="flex gap-2 mt-4 sm:mt-0">
//         <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
//             Continue
//         </button>
//         <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
//             Add Log
//         </button>
//     </div>
// </div>`)
     })
     alert("Saved")
    leaveRequestForm.reset()
}else{
    leaveRequestForm.reportValidity()
}

}