const salaryRaiseModal=document.getElementById("salary-raise-modal")
const newSalaryForm=document.getElementById("new-salary-form")
const salaryRaiseForm=document.getElementById("salaryRaiseForm")
const newSalaryModal=document.getElementById("salary-insert-modal")
const cancelBtnRaise=document.getElementById("cancel-button-raise")
const cancelBtnInsert=document.getElementById("cancel-button-insert")
const saveBtnRaise=document.getElementById("saveBtnRaise")
const salaryReports=document.getElementById("salaryReports")
const saveBtnInsert=document.getElementById("saveBtnInsert")
const grantSalaryRaise=document.getElementById("grantSalary")
const grantSalaryInsert=document.getElementById("addNewSalary")
const namesRaise=document.getElementById("employeeNameRaise")
const namesInsert=document.getElementById("employeeNameInsert")
const nameFinder=document.getElementById("nameFinder")
const employeeNameRaise=document.getElementById("employeeNameRaise")
const currentSalary=document.getElementById("currentSalary")
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
        if (fullNames.salary.length!==0) { 
             namesRaise.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)  
            // currentSalary.value+=`${fullNames.salary[salaryLength-1].new}}`
            salaryReports.insertAdjacentHTML("beforeend",`<tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 employeeName">${fullNames.personalInfo.fullName}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.employmentDetails.jobTitle}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.employmentDetails.department}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.salary[salaryLength-1].new}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.salary[salaryLength-1].lastRaisedate}</td>
                    </tr>`)
employeeNameRaise.addEventListener("change",(e)=>{
    let targetValue=e.target.value
    if(targetValue===fullNames.personalInfo.fullName){
    currentSalary.value=`$`+`${fullNames.salary[salaryLength-1].new}`

    }
})
       }else if(fullNames.salary.length===0){
        namesInsert.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
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
    window.location.reload()
}
grantSalaryInsert.onclick=()=>{
    newSalaryModal.classList.remove("hidden")
}
cancelBtnInsert.onclick=()=>{
    newSalaryModal.classList.add("hidden")
    window.location.reload()
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
saveBtnRaise.onclick=(e)=>{
 e.preventDefault()
if(salaryRaiseForm.checkValidity()){
const form=new FormData(salaryRaiseForm)
form.append("companyUID",localStorage.getItem("UID"))
currentSalary.value=currentSalary.value.replace("$","")
form.append("previous",currentSalary.value)
 fetch("/salaryRaise",{
      method:"POST",
      body:form
     }).then((res)=>{
         alert("Saved")
        salaryRaiseForm.reset()  
     })
}else{
    salaryRaiseForm.reportValidity()
}

}