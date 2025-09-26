const salaryRaiseModal=document.getElementById("salary-raise-modal")
const newSalaryModal=document.getElementById("salary-insert-modal")
const cancelBtnRaise=document.getElementById("cancel-button-raise")
const cancelBtnInsert=document.getElementById("cancel-button-insert")
const saveBtnRaise=document.getElementById("saveBtnRaise")
const salaryReports=document.getElementById("salaryReports")
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
        let salaryLength=fullNames.salary.length
        namesRaise.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
        namesInsert.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
        if (fullNames.salary.length!==0) {   
            salaryReports.insertAdjacentHTML("beforeend",`<tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${fullNames.personalInfo.fullName}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.employmentDetails.jobTitle}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.employmentDetails.department}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.salary[salaryLength-1].new}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.salary[salaryLength-1].date}</td>
                    </tr>`)
       }
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