const grantPromotionBtn=document.getElementById("grantPromotionBtn")
const promptionReports=document.getElementById("promptionReports")
const cancelBtn=document.getElementById("cancelBtn")
const employeeName=document.querySelectorAll("p.employeeName")
const promotionModal=document.getElementById("promotionModal")
const names=document.getElementById("employeeName")

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
})
// .then(()=>{
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
// })
grantPromotionBtn.onclick=()=>{
    promotionModal.classList.remove("hidden")
}
cancelBtn.onclick=()=>{
    promotionModal.classList.add("hidden")
}
const filterBtn=document.getElementById("filterBtn")
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
