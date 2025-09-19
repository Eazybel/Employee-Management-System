    const leaveRequestModal=document.getElementById("leaveRequestModal")
    const submitBtn=document.getElementById("submitBtn")
    const cancelBtn=document.getElementById("cancelBtn")
    const GrantleaveRequest=document.getElementById("GrantleaveRequest")
    const names=document.getElementById("employeeName")
    const ongoing=document.getElementById("ongoing")
    const lateArrivalForm=document.getElementById("lateArrivalForm")
    const expiryReports=document.getElementById("expiryReports")
    GrantleaveRequest.onclick=()=>{
    leaveRequestModal.classList.remove("hidden")
    }
    cancelBtn.onclick=()=>{
    leaveRequestModal.classList.add("hidden")
    }
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
        //    let expiry=fullNames.expiry
        //   if(expiry.length!==0){
        //    for (let i = 0; i < expiry.length; i++) {
        //     if (expiry[i].expiry===false) {
        //      ongoing.insertAdjacentHTML("beforeend",`<div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        //             <div class="flex-grow">
        //                 <p class="text-lg font-medium text-gray-800 employeeName">${fullNames.personalInfo.fullName} - <span class="font-normal text-sm text-gray-500">${expiry[i].reason}</span></p>
        //                 <p class="text-sm text-gray-600 ">Date: ${expiry[i].date}, Duration: <span class="duration">${expiry[i].duration} </span>days</p>
        //             </div>
        //             <div class="flex gap-2 mt-4 sm:mt-0">
        //                 <button id="continuer" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
        //                     Continue
        //                 </button>
        //                 <button id="logger" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
        //                     Add Log
        //                 </button>
        //             </div>
        //         </div>`)
        //     }else if (expiry[i].ongoingStatus===false){
                
        //         expiryReports.insertAdjacentHTML("beforeend",`
        //            <div class="bg-gray-100 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        //             <div class="flex-grow">
        //                 <p class="text-lg font-medium text-gray-800 employeeName">${fullNames.personalInfo.fullName} - <span class="font-normal text-sm text-gray-500">${expiry[i].reason}</span></p>
        //                 <p class="text-sm text-gray-600 ">Date: ${expiry[i].date}, Duration: <span class="duration">${expiry[i].duration} </span>days</p>
        //             </div>
        //             <div class="flex gap-2 mt-4 sm:mt-0">
        //                    <button id="fullProfile" class="bg-purple-800 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
        //                        Full Profile
        //                    </button>
        //                </div>
        //         </div>
        //             `)
        //     }
        //    }
        //   }
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
