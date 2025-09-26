const salaryRaiseModal=document.getElementById("salary-raise-modal")
const newSalaryForm=document.getElementById("new-salary-form")
const newSalaryModal=document.getElementById("salary-insert-modal")
const cancelBtnRaise=document.getElementById("cancel-button-raise")
const cancelBtnInsert=document.getElementById("cancel-button-insert")
const saveBtnRaise=document.getElementById("saveBtnRaise")
const salaryReports=document.getElementById("salaryReports")
const saveBtnInsert=document.getElementById("saveBtnInsert")
const grantSalaryRaise=document.getElementById("grantSalary")
const grantSalaryInsert=document.getElementById("addNewSalary")
const namesRaise=document.getElementById("employee-name-raise")
const namesInsert=document.getElementById("employee-name-insert")
const nameFinder=document.getElementById("nameFinder")
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
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 employeeName">${fullNames.personalInfo.fullName}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.employmentDetails.jobTitle}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.employmentDetails.department}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.salary[salaryLength-1].new}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.salary[salaryLength-1].date}</td>
                    </tr>`)
       }
    })

 
}).then(()=>{
     const employeeName=document.querySelectorAll("td.employeeName")
        nameFinder.addEventListener("keyup",(e)=>{
    let target=e.target.value.toLowerCase()
    employeeName.forEach(name => {
        let text=name.innerText.toLowerCase()
        if (text.includes(target)) {
            name.parentElement.style.display=""
        }else{
            name.parentElement.style.display="none"
            
        }
    });
})
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
saveBtnInsert.onclick=(e)=>{
 e.preventDefault()
if(newSalaryForm.checkValidity()){
const form=new FormData(newSalaryForm)
form.append("companyUID",localStorage.getItem("UID"))
 fetch("/salaryNew",{
      method:"POST",
      body:form
     }).then(()=>{
         alert("Saved")
        newSalaryForm.reset()  
     })
}else{
    newSalaryForm.reportValidity()
}

}