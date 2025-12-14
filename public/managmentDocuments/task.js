const taskModal=document.getElementById("task-modal")
const taskModalBtn=document.getElementById("open-modal-btn")
const cancelBtn=document.getElementById("cancel-btn")
const names=document.getElementById("employee")
const assign=document.getElementById("submit-btn")
const taskForm=document.getElementById("task-form")
const activeTasks=document.getElementById("activeTasks")
const reportContainer=document.getElementById("report-container")
const overDues=document.getElementById("overDues")

taskModalBtn.onclick=()=>{
    taskModal.classList.remove("hidden")
}
cancelBtn.onclick=()=>{
    window.location.reload()
    taskModal.classList.add("hidden")
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
                    overDues.insertAdjacentHTML("beforeend",` <!-- Overdue Task Card 1 (Red style) -->
                <div id="overdue-card-1" class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition duration-300 flex flex-col h-full">
                    <div class="flex-1">
                        <div class="flex justify-between items-start mb-3">
                            <span class="text-sm font-medium text-white bg-red-500 px-3 py-1 rounded-full">${data[i].task[j].priorityLevel} Priority</span>
                            <!-- Distinct OVERDUE tag in red -->
                            <span class="text-xs text-red-700 bg-red-100 px-3 py-1 rounded-full">OVERDUE</span>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800 mb-2">${data[i].task[j].taskName}</h3>
                        <p class="text-sm text-gray-600 mb-4 line-clamp-2">${data[i].task[j].description}</p>
                        <div class="flex justify-between items-center text-sm mb-4">
                            <div>
                                <p class="text-gray-500">Assigned to:</p>
                                <p class="font-medium text-indigo-600">${data[i].task[j].assignedPerson}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-gray-500">Original Due Date:</p>
                                <p class="font-bold text-red-500">${data[i].task[j].dueDate}</p>
                            </div>
                        </div>
                    </div>
                    <!-- Action Buttons: Standard set -->
                    <div class=" flex space-x-2 pt-4 border-t border-gray-100" id="overdue-actions-1">
                        <button class="overdue complete flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition duration-150 shadow-md">
                            Complete
                        </button>
                        <button class="overdue edit flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition duration-150 shadow-md">
                            Edit
                        </button>
                        <button class="overdue fail flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-red-200 text-red-800 hover:bg-red-300 transition duration-150 shadow-md">
                            Failed
                        </button>
                    </div>
                </div>`)
                }else {
                     activeTasks.insertAdjacentHTML("beforeend",` <div id="task-card-4" class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-xl transition duration-300 flex flex-col h-full">
                    <div class="flex-1">
                        <div class="flex justify-between items-start mb-3">
                            <!-- Priority Tag UNIFIED to Indigo -->
                            <span class="text-sm font-medium text-white bg-indigo-500 px-3 py-1 rounded-full priority">${data[i].task[j].priorityLevel} Priority</span>
                            <span class="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">In Progress</span>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800 mb-2 taskName">${data[i].task[j].taskName}</h3>
                        <p class="text-sm text-gray-600 mb-4 line-clamp-2 description">${data[i].task[j].description}</p>
                        <div class="flex justify-between items-center text-sm mb-4">
                            <div>
                                <p class="text-gray-500">Assigned to:</p>
                                <p class="font-medium text-indigo-600 assignedPerson">${data[i].task[j].assignedPerson}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-gray-500">Due Date:</p>
                                <p class="font-medium text-gray-700 dueDate">${data[i].task[j].dueDate}</p>
                            </div>
                        </div>
                    </div>
                    <!-- Action Buttons: Added Edit Button -->
                    <div class="flex space-x-2 pt-4 border-t border-gray-100" id="task-actions-4">
                        <button
                            class=" active complete flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition duration-150 shadow-md">
                            Complete
                        </button>
                        <button
                            class=" active edit flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition duration-150 shadow-md">
                            Edit
                        </button>
                        <button 
                            class=" active fail flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-red-200 text-red-800 hover:bg-red-300 transition duration-150 shadow-md">
                            Failed
                        </button>
                    </div>
                </div>`)
                }
          }
        }
        names.insertAdjacentHTML("beforeend",`<option value="${data[i].personalInfo.fullName}">${data[i].personalInfo.fullName}</option>`)
   } 
const actionBtn=document.querySelectorAll("button")
actionBtn.forEach(btns => {
   btns.onclick=()=>{
   if(btns.classList.contains("active")&&btns.classList.contains("complete")){
    reportContainer.insertAdjacentHTML("beforeend",` <div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-emerald-500 transition duration-150 hover:shadow-md">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="text-base font-semibold text-gray-800">Server Migration Phase 1 Completion</h4>
                        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">SUCCESS</span>
                    </div>
                    <p class="text-sm text-gray-700 mb-2">All services successfully migrated to the new cluster without downtime.</p>
                    <div class="flex justify-between text-xs text-gray-500">
                        <span>Assigned: Jordan Smith</span>
                        <span>Date: 2025-09-15</span>
                    </div>
                </div>`)
                console.log(btns.parentElement.parentElement.querySelector("taskName").innerText)
   }
   if(btns.classList.contains("active")&&btns.classList.contains("edit")){
    console.log("edit active")
   }
   if(btns.classList.contains("active")&&btns.classList.contains("fail")){
    console.log("fail active")
   }
   if(btns.classList.contains("overdue")&&btns.classList.contains("complete")){
    console.log("complete overdue")
   }
   if(btns.classList.contains("overdue")&&btns.classList.contains("edit")){
    console.log("edit overdue")
   }
   if(btns.classList.contains("overdue")&&btns.classList.contains("fail")){
    console.log("fail overdue")
   }
   }
});
})
assign.onclick=(e)=>{
e.preventDefault()
const form=new FormData(taskForm)
form.append("companyUID",localStorage.getItem("UID"))
fetch("/taskController",
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
