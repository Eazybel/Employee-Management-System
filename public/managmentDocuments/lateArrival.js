const employeeName=document.querySelectorAll("p.employeeName")
const nameFinder=document.getElementById("nameFinder")
const reportLateArrivalBtn=document.getElementById("reportLateArrivalBtn")
const lateArrivalModal=document.getElementById("lateArrivalModal")
const closeBtn=document.getElementById("closeBtn")
const submitBtn=document.getElementById("submitBtn")
const lateArrivalReports=document.getElementById("lateArrivalReports")
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
        names.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
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

if(names.value!==""){   
    let form=new FormData(lateArrivalForm)
    form.append("companyUID",localStorage.getItem("UID"))
     fetch("/lateController",{
      method:"POST",
      body:form
      
     }).then((res)=>{
            return res.json()
     }).then(data=>{
        // lateArrivalReports.insertAdjacentHTML("beforeend",`<div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        //             <div>
        //                 <p  class="text-lg font-medium text-gray-800 employeeName">${} - <span class="font-normal text-sm text-gray-500">Reason: ${}</span></p>
        //                 <p class="text-sm text-gray-600">Date: ${}, Time: ${}</p>
        //             </div>
        //         </div>`)
        console.log(data)
     })
}else{
   return alert("Employee not found please select from the available options only")
}
    alert("Saved")
    lateArrivalForm.reset()

}