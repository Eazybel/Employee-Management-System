const taskModal=document.getElementById("task-modal")
const taskModalBtn=document.getElementById("open-modal-btn")
const cancelBtn=document.getElementById("cancel-btn")
const names=document.getElementById("employee")
const assign=document.getElementById("submit-btn")
const taskForm=document.getElementById("task-form")
const activeTasks=document.getElementById("activeTasks")
const reportContainer=document.getElementById("report-container")
const overDues=document.getElementById("overDues")
const editorFun=(btns)=>{
 const iconBtns=btns.parentElement.parentElement.querySelectorAll("button:has(i)")
    btns.innerText="Save"
    btns.previousElementSibling.classList.add("hidden")
    btns.nextElementSibling.classList.add("hidden")
    btns.style.backgroundColor="green"
    iconBtns.forEach(iconBtns=>{
        iconBtns.classList.remove("hidden")
        iconBtns.onclick=()=>{
            iconBtns.parentElement.contentEditable="true"
            iconBtns.parentElement.focus()
            iconBtns.classList.add("hidden")
        }

    })
}
const editorFunRecover=(btns)=>{
 const iconBtns=btns.parentElement.parentElement.querySelectorAll("button:has(i)")
    btns.innerText="Edit"
    btns.previousElementSibling.classList.remove("hidden")
    btns.nextElementSibling.classList.remove("hidden")
    btns.style.backgroundColor="blue"
    iconBtns.forEach(btns=>{
        btns.classList.add("hidden")

    })
}
taskModalBtn.onclick=()=>{
    taskModal.classList.remove("hidden")
}
cancelBtn.onclick=()=>{
    window.location.reload()
}
fetch("/nameData",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({companyUID:localStorage.getItem("UID")})
}).then(res=>{
    return res.json()
}).then(data=>{
   for (let i = 0; i < data.length; i++) {
     if(data[i].task.length!=0&&data[i].task.some(t=>t.active)){
          for (let j = 0; j < data[i].task.length; j++) {
               const dueDated=new Date(`${data[i].task[j].dueDate}`)
                const today=new Date()
                if(dueDated<today){ 
                    overDues.insertAdjacentHTML("beforeend",`<div id="overdue-card-red" class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition duration-300 flex flex-col h-full">
                    <div class="flex-1">
                        <div class="flex justify-between items-start mb-3">
                            <div class="flex items-center group">
                                <span class="text-sm font-medium text-white bg-red-500 px-3 py-1 rounded-full priority">${data[i].task[j].priorityLevel} Priority</span>
                               
                            </div>
                            <span class="text-xs text-red-700 bg-red-100 px-3 py-1 rounded-full font-bold">OVERDUE</span>
                        </div>

                        <div class="flex items-center group mb-2">
                            <h3 class="text-lg font-bold text-gray-800 taskName">${data[i].task[j].taskName}</h3>
                        </div>

                        <div class="flex items-start group mb-4">
                            <p class="text-sm text-gray-600 line-clamp-2 description">${data[i].task[j].description}</p>
                        </div>

                        <div class="flex justify-between items-center text-sm mb-4">
                            <div class="group">
                                <p class="text-gray-500">Assigned to:</p>
                                <div class="flex items-center">
                                    <p class="font-medium text-indigo-600 assignedPerson">${data[i].task[j].assignedPerson}</p>
                                </div>
                            </div>

                            <div class="text-right group">
                                <p class="text-gray-500">Original Due Date:</p>
                                <div class="flex items-center justify-end">
                                    <p class="font-bold text-red-500 dueDate">${data[i].task[j].dueDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex space-x-2 pt-4 border-t border-gray-100">
                        <button class="overdue complete flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition shadow-md">
                            Complete
                        </button>
                        <button class="overdue fail flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-red-200 text-red-800 hover:bg-red-300 transition shadow-md">
                            Failed
                        </button>
                    </div>
                </div>`)
                }else if(dueDated>today){
                     activeTasks.insertAdjacentHTML("beforeend",`<div id="task-card-active" class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-xl transition duration-300 flex flex-col h-full">
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex items-center group">
                            <span class="text-sm font-medium text-white bg-indigo-500 px-3 py-1 rounded-full priority">${data[i].task[j].priorityLevel} Priority</span>
                            <button class=" hidden ml-2 text-gray-300 hover:text-indigo-500 transition-colors cursor-pointer" title="Edit Priority">
                                <i class="fa-solid fa-pen-to-square text-xs"></i>
                            </button>
                        </div>
                        <span class="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-bold">In Progress</span>
                    </div>

                    <div class="flex items-center group mb-2">
                        <h3 class="text-lg font-bold text-gray-800 taskName">${data[i].task[j].taskName}</h3>
                        <button class=" hidden ml-2 text-gray-300 hover:text-indigo-500 transition-colors cursor-pointer">
                            <i class="fa-solid fa-pen-to-square text-sm"></i>
                        </button>
                    </div>

                    <div class="flex items-start group mb-4">
                        <p class="text-sm text-gray-600 line-clamp-2 description">${data[i].task[j].description}</p>
                        <button class=" hidden ml-2 text-gray-300 hover:text-indigo-500 transition-colors cursor-pointer">
                            <i class="fa-solid fa-pen-to-square text-xs"></i>
                        </button>
                    </div>

                    <div class="flex justify-between items-center text-sm mb-4">
                        <div class="group">
                            <p class="text-gray-500">Assigned to:</p>
                            <div class="flex items-center">
                                <p class="font-medium text-indigo-600 assignedPerson">${data[i].task[j].assignedPerson}</p>
                                <button class=" hidden ml-1.5 text-gray-300 hover:text-indigo-500 transition-colors cursor-pointer">
                                    <i class="fa-solid fa-pen-to-square text-[10px]"></i>
                                </button>
                            </div>
                        </div>

                        <div class="text-right group">
                            <p class="text-gray-500">Due Date:</p>
                            <div class="flex items-center justify-end">
                                <p class="font-medium text-gray-700 dueDate">${data[i].task[j].dueDate}</p>
                                <button class=" hidden ml-1.5 text-gray-300 hover:text-indigo-500 transition-colors cursor-pointer">
                                    <i class="fa-solid fa-pen-to-square text-[10px]"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex space-x-2 pt-4 border-t border-gray-100">
                    <button class="active complete flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition shadow-md">
                        Complete
                    </button>
                    <button class="active edit flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition shadow-md">
                        Edit
                    </button>
                    <button class="active fail flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-red-200 text-red-800 hover:bg-red-300 transition shadow-md">
                        Failed
                    </button>
                </div>
            </div>`)
           
                }
          }
        }
        names.insertAdjacentHTML("beforeend",`<option value="${data[i].personalInfo.fullName}">${data[i].personalInfo.fullName}</option>`)
   } 
const actionBtn=document.querySelector("main").querySelectorAll("button")
actionBtn.forEach(btns => {
   btns.onclick=async()=>{
     if(btns.innerText==="Save"&&btns.classList.contains("active")&&btns.classList.contains("edit")){
        const spanElement=btns.parentElement.parentElement.querySelectorAll("span,p,h3")
        const nodeChange=[...spanElement]
       const editedContent={span:nodeChange[0].innerText,h3:nodeChange[2].innerText,p1:nodeChange[3].innerText,p2:nodeChange[5].innerText,p3:nodeChange[7].innerText,companyUID:localStorage.getItem("UID")}
       const taskLengthObj={"companyUID":localStorage.getItem("UID"),"employee":nodeChange[5].innerText}
       await fetch("/taskLength",
        {
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(taskLengthObj)
        }
       ).then(res=>{
        return res.text()
       }).then(data=>{
        console.log(data)
       })
   await fetch("/taskAction",
        {method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(editedContent)
        }
    ).then(res=>{
        return res.json()
    }).then(data=>{
        editorFunRecover(btns)
    })
       
   }
   if(btns.classList.contains("active")&&btns.classList.contains("complete")){
    reportContainer.insertAdjacentHTML("beforeend",` <div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-emerald-500 transition duration-150 hover:shadow-md">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="text-base font-semibold text-gray-800">${btns.parentElement.parentElement.querySelector("h3").innerText}</h4>
                        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">SUCCESS</span>
                    </div>
                    <p class="text-sm text-gray-700 mb-2">${btns.parentElement.parentElement.querySelectorAll("p")[0].innerText}</p>
                    <div class="flex justify-between text-xs text-gray-500">
                        <span>Assigned: ${btns.parentElement.parentElement.querySelectorAll("p")[2].innerText}</span>
                        <span>Date: ${btns.parentElement.parentElement.querySelectorAll("p")[4].innerText}</span>
                    </div>
                </div>`)
                btns.parentElement.parentElement.style.display="none"
   }
   if(btns.classList.contains("active")&&btns.classList.contains("edit")){
    editorFun(btns)
   }
   if(btns.classList.contains("active")&&btns.classList.contains("fail")){
     reportContainer.insertAdjacentHTML("beforeend",`<div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-red-500 transition duration-150 hover:shadow-md">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="text-base font-semibold text-gray-800">${btns.parentElement.parentElement.querySelector("h3").innerText}</h4>
                        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">FAILURE</span>
                    </div>
                    <p class="text-sm text-gray-700 mb-2">${btns.parentElement.parentElement.querySelectorAll("p")[0].innerText}</p>
                    <div class="flex justify-between text-xs text-gray-500">
                        <span>Assigned: ${btns.parentElement.parentElement.querySelectorAll("p")[2].innerText}</span>
                        <span>Date: ${btns.parentElement.parentElement.querySelectorAll("p")[4].innerText}</span>
                    </div>
                </div>`)
                btns.parentElement.parentElement.style.display="none"
   }
   if(btns.classList.contains("overdue")&&btns.classList.contains("complete")){
    reportContainer.insertAdjacentHTML("beforeend",`  <div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-emerald-500 transition duration-150 hover:shadow-md">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="text-base font-semibold text-gray-800">${btns.parentElement.parentElement.querySelector("h3").innerText}</h4>
                        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">SUCCESS (DELAYED)</span>
                    </div>
                    <p class="text-sm text-gray-700 mb-2">${btns.parentElement.parentElement.querySelectorAll("p")[0].innerText}</p>
                    <div class="flex justify-between text-xs text-gray-500">
                        <span>Assigned: ${btns.parentElement.parentElement.querySelectorAll("p")[2].innerText}</span>
                        <span>Date: ${btns.parentElement.parentElement.querySelectorAll("p")[4].innerText}(Completed Late)</span>
                    </div>
                </div>`)
                btns.parentElement.parentElement.style.display="none"
   }
   if(btns.classList.contains("overdue")&&btns.classList.contains("edit")){
    editorFun(btns)
   }
   if(btns.classList.contains("overdue")&&btns.classList.contains("fail")){
      reportContainer.insertAdjacentHTML("beforeend",`<div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-red-500 transition duration-150 hover:shadow-md">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="text-base font-semibold text-gray-800">${btns.parentElement.parentElement.querySelector("h3").innerText}</h4>
                        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">FAILURE</span>
                    </div>
                    <p class="text-sm text-gray-700 mb-2">${btns.parentElement.parentElement.querySelectorAll("p")[0].innerText}</p>
                    <div class="flex justify-between text-xs text-gray-500">
                        <span>Assigned: ${btns.parentElement.parentElement.querySelectorAll("p")[2].innerText}</span>
                        <span>Date: ${btns.parentElement.parentElement.querySelectorAll("p")[4].innerText} (Overdue)</span>
                    </div>
                </div>`)
                btns.parentElement.parentElement.style.display="none"
   }
   }
});

}
)
assign.onclick=async(e)=>{
e.preventDefault()
const form=new FormData(taskForm)
form.append("companyUID",localStorage.getItem("UID"))
let taskID="123"
await fetch("/taskLength",
    {
        method:"POST",
        body:form
    }
).then(res=>{
    return res.text()
}).then(data=>{
    taskID=data
})
form.append("taskID",Number(taskID)+1)
await fetch("/taskController",
   { method:"POST",
    body:form
   }
).then(res=>{
    return res.json()
}).then(data=>{
    console.log(data) 
    window.alert("Saved")
})
}
