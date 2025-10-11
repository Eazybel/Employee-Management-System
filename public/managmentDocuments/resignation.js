const resigModalOpener=document.getElementById("resigModalOpener")
const resigModal=document.getElementById("resignation-modal")
const closeModal=document.getElementById("close-modal-x")
const closeModalBtn=document.getElementById("close-modal-btn")
resigModalOpener.onclick=()=>{
    resigModal.classList.remove("hidden")
}
closeModal.onclick=()=>{
    resigModal.classList.add("hidden")
}
closeModalBtn.onclick=()=>{
   window.location.reload()
}
fetch("/nameData",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({companyUID:localStorage.getItem("UID")})
}).then(res=>{
    return res.json()
}).then(data=>{
    data.forEach(fullNames=>{
        names.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
    //     if (fullNames.overtime.length!==0) {
    //         fullNames.overtime.forEach(overtimeData=>{
            
    //         overtimeReports.insertAdjacentHTML("beforeend",`<div  class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
    //                 <div>
    //                     <p  class="text-lg font-medium text-gray-800 employeeName">${fullNames.personalInfo.fullName} - <span class="font-normal text-sm text-gray-500">Reason: ${overtimeData.reason}</span></p>
    //                     <p class="text-sm text-gray-600">Date: ${overtimeData.date}, Time: ${overtimeData.hour}</p>
    //                 </div>
    //             </div>`)
    //      })
    //    }
    })
}).then(()=>{
//  const employeeName=document.querySelectorAll("td.employeeName")
// filterBtn.addEventListener("keyup",(e)=>{
//     let target=e.target.value.toLowerCase()
//     employeeName.forEach(employee=>{
//         let name=employee.innerText.toLowerCase()
//         if (name.includes(target)) {
//             employee.parentElement.style.display=""
//         }else{
//             employee.parentElement.style.display="none"
//         }
//     })
// }  
// )
})