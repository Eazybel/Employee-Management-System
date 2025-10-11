const resigModalOpener=document.getElementById("resigModalOpener")
const resigModal=document.getElementById("resignation-modal")
const closeModal=document.getElementById("close-modal-x")
const closeModalBtn=document.getElementById("close-modal-btn")
const ongoingList=document.getElementById("resignation-list")
const deniedList=document.getElementById("deniedList")
resigModalOpener.onclick=()=>{
    resigModal.classList.remove("hidden")
}
closeModal.onclick=()=>{
    resigModal.classList.add("hidden")
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
    data.forEach(fullNames=>{
        names.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
        if (fullNames.resignation.length!==0&&fullNames.resignation.ongoingStatus===true) {
          ongoingList.insertAdjacentElement("beforeend",`
             <tr class=' transition duration-150'>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 employeeName">Alice Johnson</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-10-01</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">2024-11-01</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell truncate max-w-xs">Career Change</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">Pending Review</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                <button class="bg-green-600 text-white hover:bg-green-700 py-2 px-4 rounded-xl text-sm font-semibold transition duration-150 ease-in-out shadow-md hover:shadow-lg">
                                    <i class="fas fa-check mr-1"></i> Accept
                                </button>
                                <button class="bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-xl text-sm font-semibold transition duration-150 ease-in-out shadow-md hover:shadow-lg">
                                    <i class="fas fa-times mr-1"></i> Deny
                                </button>
                            </td>
                        </tr>
            `)
       }else if(fullNames.resignation.ongoingStatus===false){
            deniedList.insertAdjacentElement("beforeend",`
                <tr class='hover:bg-gray-50 transition duration-150'>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 employeeName">Dana Scully</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">N/A</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell truncate max-w-xs">Attempted same-day resignation (Policy Violation)</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 border border-red-300"><i class="fas fa-times-circle mr-1"></i> Denied</span>
                            </td>
                        </tr>
                `)
       }
    })
}).then(()=>{
//  const employeeName=document.querySelectorAll("td.employeeName")
// filterBtn.addEventListener("keyup",(e)=>{
//     let target=e.target.value.toLowerCase()
//     employeeName.forEach(employee=>{
//         let name=employee.innerText.toLowerCase()
//         if (name.includes(target)) {
//             employee.parentElement.style.display=""
//         }else{
//             employee.parentElement.style.display="none"
//         }
//     })
// }  
// )
})