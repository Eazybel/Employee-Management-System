const resigModalOpener=document.getElementById("resigModalOpener")
const resigModal=document.getElementById("resignation-modal")
const closeModal=document.getElementById("close-modal-x")
const closeModalBtn=document.getElementById("close-modal-btn")
const ongoingList=document.getElementById("resignation-list")
const logList=document.getElementById("logList")
const submitBtn=document.getElementById("submitBtn")
const resignationForm=document.getElementById("resignation-form")

resigModalOpener.onclick=()=>{
    resigModal.classList.remove("hidden")
}

closeModalBtn.onclick=()=>{
   window.location.reload()
}

fetch("/nameData",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({companyUID:localStorage.getItem("UID")})
}).then(res=>{
    return res.json()
}).then(data=>{
    console.log(data)
    data.forEach(fullNames=>{
        if(fullNames.resignation[fullNames.resignation.length-1].ongoingStatus===false){
            names.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
        }
       if(fullNames.resignation[fullNames.resignation.length-1].ongoingStatus===true){
             ongoingList.insertAdjacentHTML("beforeend",`
                <tr class=' transition duration-150'>
                               <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 employeeName">${fullNames.personalInfo.fullName}</td>
                               <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 noticeDate">${fullNames.resignation[fullNames.resignation.length-1].noticeDate}</td>
                               <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold lastDate">${fullNames.resignation[fullNames.resignation.length-1].lastDate}</td>
                               <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell truncate max-w-xs reason">${fullNames.resignation[fullNames.resignation.length-1].reason}</td>
                               <td class="px-6 py-4 whitespace-nowrap text-sm">
                                   <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">Pending Review</span>
                               </td>
                               <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                   <button class="bg-green-600 text-white hover:bg-green-700 py-2 px-4 rounded-xl text-sm font-semibold transition duration-150 ease-in-out shadow-md hover:shadow-lg acceptBtn">
                                       <i class="fas fa-check mr-1"></i> Accept
                                   </button>
                                   <button class="bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-xl text-sm font-semibold transition duration-150 ease-in-out shadow-md hover:shadow-lg denyBtn">
                                       <i class="fas fa-times mr-1"></i> Deny
                                   </button>
                               </td>
                           </tr>
               `)
        }else if(fullNames.resignation[fullNames.resignation.length-1].ongoingStatus===false){
            if(fullNames.resignation[fullNames.resignation.length-1].acceptanceStatus===true){
                logList.insertAdjacentHTML("beforeend",`
                    <tr class='hover:bg-gray-50 transition duration-150'>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 employeeName">${fullNames.personalInfo.fullName}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.resignation[fullNames.resignation.length-1].lastDate}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell truncate max-w-xs">${fullNames.resignation[fullNames.resignation.length-1].reason}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-300">Accepted</span>
                                </td>
                            </tr>
                    `)
            }else if(fullNames.resignation[fullNames.resignation.length-1].acceptanceStatus===false){
                logList.insertAdjacentHTML("beforeend",`
                    <tr class='hover:bg-gray-50 transition duration-150'>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 employeeName">${fullNames.personalInfo.fullName}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fullNames.resignation[fullNames.resignation.length-1].lastDate}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell truncate max-w-xs">${fullNames.resignation[fullNames.resignation.length-1].reason}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 border border-red-300">Denied</span>
                                </td>
                            </tr>
                    `)
                
   }
            }
      
 
    })
}).then(()=>{
const logBtns=document.querySelectorAll("button")
 const employeeName=document.querySelectorAll("td.employeeName")
filterBtn.addEventListener("keyup",(e)=>{
    let target=e.target.value.toLowerCase()
    employeeName.forEach(employee=>{
        let name=employee.innerText.toLowerCase()
        if(   employee.parentElement.style.display!=="none"){
            if (name.includes(target)) {
            employee.parentElement.style.display=""
        }else{
            employee.parentElement.style.display="none"
        }
        }
    })
}  
)
logBtns.forEach(btn=>{
    if(btn.classList.contains("acceptBtn")){
        btn.onclick=()=>{
          btn.parentElement.parentElement.style.display="none"
          logList.insertAdjacentHTML("beforeend",`
                    <tr class='hover:bg-gray-50 transition duration-150'>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 employeeName">${btn.parentElement.parentElement.querySelector("td.employeeName").innerText}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${btn.parentElement.parentElement.querySelector("td.lastDate").innerText}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell truncate max-w-xs">${btn.parentElement.parentElement.querySelector("td.reason").innerText}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-300">Accepted</span>
                                </td>
                            </tr>
                    `)
                    fetch("/statusController",{
                        method:"POST",
                         headers:{"Content-type":"application/json"},
                        body:JSON.stringify({companyUID:localStorage.getItem("UID"),status:true,employeeName:btn.parentElement.parentElement.querySelector("td.employeeName").innerText})
                    }).then(res=>{
                        return res.text()
                    }).then(data=>{
                        console.log(data)
                    })     
        }
    }
    if(btn.classList.contains("denyBtn")){
        btn.onclick=()=>{
        btn.parentElement.parentElement.style.display="none"
         logList.insertAdjacentHTML("beforeend",`
                    <tr class='hover:bg-gray-50 transition duration-150'>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 employeeName">${btn.parentElement.parentElement.querySelector("td.employeeName").innerText}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${btn.parentElement.parentElement.querySelector("td.lastDate").innerText}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell truncate max-w-xs">${btn.parentElement.parentElement.querySelector("td.reason").innerText}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 border border-red-300">Denied</span>
                                </td>
                            </tr>
                    `)
                    fetch("/statusController",{
                        method:"POST",
                         headers:{"Content-type":"application/json"},
                        body:JSON.stringify({companyUID:localStorage.getItem("UID"),status:false,employeeName:btn.parentElement.parentElement.querySelector("td.employeeName").innerText})
                    }).then(res=>{
                        return res.text()
                    }).then(data=>{
                        console.log(data)
                    })
        }
    }
})
})
submitBtn.onclick=(e)=>{
    e.preventDefault()
   if(resignationForm.checkValidity()){
     const form=new FormData(resignationForm)
    form.append("companyUID",localStorage.getItem("UID"))
  fetch("/resignationController",{
    method:"POST",
    body:form
  }).then(res=>{
    return res.json
  }).then(data=>{
    alert("Saved")
    resignationForm.reset()
  })
   }else{
    resignationForm.reportValidity()
   }
}

