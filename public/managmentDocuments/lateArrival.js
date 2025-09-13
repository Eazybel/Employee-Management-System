const employeeName=document.querySelectorAll("p.employeeName")
const nameFinder=document.getElementById("nameFinder")
const reportLateArrivalBtn=document.getElementById("reportLateArrivalBtn")
const lateArrivalModal=document.getElementById("lateArrivalModal")
const closeBtn=document.getElementById("closeBtn")
const submitBtn=document.getElementById("submitBtn")
const employeeNameModal=document.getElementById("employeeName")
const names=document.getElementById("names")
  const lateArrivalForm=document.getElementById("lateArrivalForm")
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
        names.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}"></option>`)
    })
})
  // searching filter codebase
nameFinder.addEventListener("keyup",(e)=>{
    let target=e.target.value.toLowerCase()
    employeeName.forEach(name => {
        let text=name.innerText.toLowerCase()
        if (text.includes(target)) {
            name.parentElement.parentElement.style.display=""
        }else{
            name.parentElement.parentElement.style.display="none"
            
        }
    });
})
// reporting button area
reportLateArrivalBtn.onclick=()=>{
lateArrivalModal.classList.remove("hidden")
}
closeBtn.onclick=()=>{
    lateArrivalModal.classList.add("hidden")

}
submitBtn.onclick=(e)=>{
    e.preventDefault()
const allEmployees=document.querySelectorAll("option")
const matchEmployee=Array.from(allEmployees).find(employee=>{
  return  employeeNameModal.value===employee.value
})
if(matchEmployee){   
    let form=new FormData(lateArrivalForm)
    form.append("companyUID",localStorage.getItem("UID"))
     fetch("/lateController",{
      method:"POST",
      body:form
      
     })
}else{
    alert("Employee not found please selevt from the available options only")
}
    alert("Saved")
    lateArrivalForm.reset()

}