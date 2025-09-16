const grantPromotionBtn=document.getElementById("grantPromotionBtn")
const submitBtn=document.getElementById("submitBtn")
const promptionReports=document.getElementById("promptionReports")
const cancelBtn=document.getElementById("cancelBtn")
const promotionForm=document.getElementById("promotionForm")
const promotionModal=document.getElementById("promotionModal")
const names=document.getElementById("employeeName")
const filterBtn=document.getElementById("filterBtn")
  //all employee Data Fetch
fetch("/nameDataPromotion",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({companyUID:localStorage.getItem("UID")})
}
).then(res=>{
    return res.json()
}).then(data=>{
    data.forEach(fullNames=>{
        names.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
        if (fullNames.promotion.length!==0) {
            fullNames.promotion.forEach(promotion=>{
            
            promptionReports.insertAdjacentHTML("beforeend",` <div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <p class="text-lg font-medium text-gray-800 employeeName">${fullNames.personalInfo.fullName} - <span class="font-normal text-sm text-gray-500">From: ${promotion.currentPosition}</span></p>
                        <p class="text-sm text-gray-600">To: ${promotion.newPosition}, Effective: ${promotion.date}</p>
                    </div>
                </div>`)

         })
       }
    })
}).then(()=>{
const employeeName=document.querySelectorAll("p.employeeName")

filterBtn.addEventListener("keyup",(e)=>{
    let target=e.target.value.toLowerCase()
    employeeName.forEach(names=>{
        let text =names.innerText.toLowerCase()
        if(text.includes(target)){
            names.parentElement.parentElement.style.display=""
        }else{
         names.parentElement.parentElement.style.display="none"
        }
    })
})
})
grantPromotionBtn.onclick=()=>{
    promotionModal.classList.remove("hidden")
}
cancelBtn.onclick=()=>{
   window.location.reload()
}
submitBtn.onclick=(e)=>{
    e.preventDefault()
const form=new FormData(promotionForm)
form.append("companyUID",localStorage.getItem("UID"))
if(promotionForm.checkValidity()){
    fetch("/promotionController",{
    method:"POST",
    body:form
}).then(res=>{
    return res.json()
}).then(data=>{
    promptionReports.insertAdjacentHTML("beforeend",` <div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <p class="text-lg font-medium text-gray-800 employeeName">${data.employeeName} - <span class="font-normal text-sm text-gray-500">From: ${data.currentPosition}</span></p>
                        <p class="text-sm text-gray-600">To: ${data.newPosition}, Effective: ${data.effectiveDate}</p>
                    </div>
                </div>`)
})
    alert("Saved")
    promotionForm.reset()
}else{
    promotionForm.reportValidity()
}
}