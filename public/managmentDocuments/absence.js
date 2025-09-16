const reportAbsenceBtn=document.getElementById("reportAbsenceBtn")
const cancelBtn=document.getElementById("cancelBtn")
const absenceModal=document.getElementById("absenceModal")
const absenceForm=document.getElementById("absenceForm")
const ongoing=document.getElementById("ongoing")
const names=document.getElementById("employeeName")
const submitBtn=document.getElementById("submitBtn")
fetch("/nameDataAbsence",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({companyUID:localStorage.getItem("UID")})
}).then(res=>{
    return res.json()
}).then(data=>{
    data.forEach(fullNames=>{
        names.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
        if (fullNames.absence.length!==0) {
            fullNames.absence.forEach(absences=>{
            ongoing.insertAdjacentHTML("beforeend",`<div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
    <div class="flex-grow">
        <p class="text-lg font-medium text-gray-800 employeeName">${fullNames.personalInfo.fullName} - <span class="font-normal text-sm text-gray-500">${absences.reason}</span></p>
        <p class="text-sm text-gray-600 duration">Date: ${absences.date}, Duration: ${absences.duration} days</p>
    </div>
    <div class="flex gap-2 mt-4 sm:mt-0">
        <button id="continuer" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
            Continue
        </button>
        <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
            Add Log
        </button>
    </div>
</div>`)

         })
       }
    })
}).then(()=>{
const continuer=document.querySelectorAll("#continuer")
continuer.forEach(btn=>{
    btn.onclick=()=>{
    // let employeeName=btn.parentElement.parentElement.querySelector("p.employeeName").innerText.split("-")
    
    // employeeName=employeeName[0].trimEnd()
    // fetch("/continueAbsence",{
    //     method:"POST",
    //     headers:{"Content-type":"application/json"},
    //     body:JSON.stringify({companyUID:localStorage.getItem("UID"),employeeName:employeeName})
    // }).then(res=>{
    //     return res.json()
    // }).then(data=>{
    //     console.log(data)
    // })
  
    let durationUpdate=btn.parentElement.parentElement.querySelector("p.duration").innerText.split(",")
    durationUpdate=durationUpdate[1].replace(" Duration: ","")
    durationUpdate=Number(durationUpdate.replace(" days",""))+1
    console.log(durationUpdate)
}
})
})
reportAbsenceBtn.onclick=()=>{
    absenceModal.classList.remove("hidden")
}
cancelBtn.onclick=()=>{
    window.location.reload()

}
submitBtn.onclick=(e)=>{
e.preventDefault()
if(absenceForm.checkValidity()){
const form=new FormData(absenceForm)
form.append("companyUID",localStorage.getItem("UID"))
 fetch("/absenceController",{
      method:"POST",
      body:form
      
     }).then((res)=>{
            return res.json()
     }).then(data=>{
        ongoing.insertAdjacentHTML("beforeend",`<div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
    <div class="flex-grow">
        <p class="text-lg font-medium text-gray-800">${data.employeeName} - <span class="font-normal text-sm text-gray-500">Illness</span></p>
        <p class="text-sm text-gray-600">Date: ${data.absenceDate}, Duration: ${data.absenceDuration} days</p>
    </div>
    <div class="flex gap-2 mt-4 sm:mt-0">
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
            Continue
        </button>
        <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
            Add Log
        </button>
    </div>
</div>`)
     })
     alert("Saved")
    absenceForm.reset()
}else{
    absenceForm.reportValidity()
}

}