const salaryModal=document.getElementById("salary-raise-modal")
const cancelBtn=document.getElementById("cancel-button")
const saveBtn=document.getElementById("saveBtn")
const grantSalary=document.getElementById("grantSalary")
const names=document.getElementById("employee-name")
  //all employee Data Fetch
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
    //     if (fullNames.lateArrival.length!==0) {
    //         fullNames.lateArrival.forEach(lateData=>{
            
    //         lateArrivalReports.insertAdjacentHTML("beforeend",`<div  class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
    //                 <div>
    //                     <p  class="text-lg font-medium text-gray-800 employeeName">${fullNames.personalInfo.fullName} - <span class="font-normal text-sm text-gray-500">Reason: ${lateData.reason}</span></p>
    //                     <p class="text-sm text-gray-600">Date: ${lateData.date}, Time: ${lateData.arrivalTime}</p>
    //                 </div>
    //             </div>`)

    //      })
    //    }
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
grantSalary.onclick=()=>{
    salaryModal.classList.remove("hidden")
}
cancelBtn.onclick=()=>{
    salaryModal.classList.add("hidden")
}