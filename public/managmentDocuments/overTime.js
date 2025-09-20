const overtimeModal=document.getElementById("overtimeModal")
const grantOvertimeBtn=document.getElementById("grantOvertimeBtn")
const filterBtn=document.getElementById("filterBtn")
const submitBtn=document.getElementById("submitBtn")
const names=document.getElementById("names")
const overtimeReports=document.getElementById("overtimeReports")
const overtimeForm=document.getElementById("overtimeForm")
const cancelBtn=document.getElementById("cancelBtn")
fetch("/nameData",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({companyUID:localStorage.getItem("UID")})
}).then(res=>{
    return res.json()
}).then(data=>{
    data.forEach(fullNames=>{
        names.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
        if (fullNames.overtime.length!==0) {
            fullNames.overtime.forEach(overtimeData=>{
            
            overtimeReports.insertAdjacentHTML("beforeend",`<div  class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <p  class="text-lg font-medium text-gray-800 employeeName">${fullNames.personalInfo.fullName} - <span class="font-normal text-sm text-gray-500">Reason: ${overtimeData.reason}</span></p>
                        <p class="text-sm text-gray-600">Date: ${overtimeData.date}, Time: ${overtimeData.hour}</p>
                    </div>
                </div>`)
         })
       }
    })
}).then(()=>{
            const employeeName=document.querySelectorAll("p.employeeName")
filterBtn.addEventListener("keyup",(e)=>{
    let target=e.target.value.toLowerCase()
    employeeName.forEach(employee=>{
        let name=employee.innerText.toLowerCase()
        if (name.includes(target)) {
            employee.parentElement.parentElement.style.display=""
        }else{
            employee.parentElement.parentElement.style.display="none"
        }
    })
}  
)
})
grantOvertimeBtn.onclick=()=>{
    overtimeModal.classList.remove("hidden")
}
cancelBtn.onclick=()=>{
  window.location.reload()
}

submitBtn.onclick=(e)=>{
    e.preventDefault()
if(overtimeForm.checkValidity()){
    let form=new FormData(overtimeForm)
       form.append("companyUID",localStorage.getItem("UID"))
        fetch("/overtimeController",{
         method:"POST",
         body:form
         
        }).then((res)=>{
               return res.json()
        }).then(data=>{
                alert("Saved")
               overtimeForm.reset()
        })
}else{
    overtimeForm.reportValidity()
}
}