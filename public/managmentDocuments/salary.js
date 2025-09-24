const salaryRaiseModal=document.getElementById("salary-raise-modal")
const newSalaryModal=document.getElementById("salary-insert-modal")
const cancelBtnRaise=document.getElementById("cancel-button-raise")
const cancelBtnInsert=document.getElementById("cancel-button-insert")
const saveBtnRaise=document.getElementById("saveBtnRaise")
const grantSalaryRaise=document.getElementById("grantSalary")
const grantSalaryInsert=document.getElementById("addNewSalary")
const namesRaise=document.getElementById("employee-name-raise")
const namesInsert=document.getElementById("employee-name-insert")
  //all employee Data Fetch
fetch("/nameData",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({companyUID:localStorage.getItem("UID")})
}
).then(res=>{
    return res.json()
}).then(data=>{
    console.log(data)
    data.forEach(fullNames=>{
        namesRaise.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
        namesInsert.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
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
grantSalaryRaise.onclick=()=>{
    salaryRaiseModal.classList.remove("hidden")
}
cancelBtnRaise.onclick=()=>{
    salaryRaiseModal.classList.add("hidden")
}
grantSalaryInsert.onclick=()=>{
    newSalaryModal.classList.remove("hidden")
}
cancelBtnInsert.onclick=()=>{
    newSalaryModal.classList.add("hidden")
}