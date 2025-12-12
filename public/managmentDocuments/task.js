const taskModal=document.getElementById("task-modal")
const taskModalBtn=document.getElementById("open-modal-btn")
const cancelBtn=document.getElementById("cancel-btn")
const names=document.getElementById("employee")
const assign=document.getElementById("submit-btn")
const taskForm=document.getElementById("task-form")
const activeTasks=document.getElementById("activeTasks")

taskModalBtn.onclick=()=>{
    taskModal.classList.remove("hidden")
}
cancelBtn.onclick=()=>{
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
console.log(data[i])
          for (let j = 0; j < data[i].task.length; j++) {
            activeTasks.insertAdjacentHTML("beforeend",` <div id="task-card-4" class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-xl transition duration-300 flex flex-col h-full">
                    <div class="flex-1">
                        <div class="flex justify-between items-start mb-3">
                            <!-- Priority Tag UNIFIED to Indigo -->
                            <span class="text-sm font-medium text-white bg-indigo-500 px-3 py-1 rounded-full">${data[i].task[j].priorityLevel} Priority</span>
                            <span class="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">In Progress</span>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800 mb-2">${data[i].task[j].taskName}</h3>
                        <p class="text-sm text-gray-600 mb-4 line-clamp-2">${data[i].task[j].description}</p>
                        <div class="flex justify-between items-center text-sm mb-4">
                            <div>
                                <p class="text-gray-500">Assigned to:</p>
                                <p class="font-medium text-indigo-600">${data[i].task[j].assignedPerson}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-gray-500">Due Date:</p>
                                <p class="font-medium text-gray-700">${data[i].task[j].dueDate}</p>
                            </div>
                        </div>
                    </div>
                    <!-- Action Buttons: Added Edit Button -->
                    <div class="flex space-x-2 pt-4 border-t border-gray-100" id="task-actions-4">
                        <button id="complete-task-4"
                            class="flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition duration-150 shadow-md">
                            Complete
                        </button>
                        <button id="edit-task-4"
                            class="flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition duration-150 shadow-md">
                            Edit
                        </button>
                        <button id="flag-review-4"
                            class="flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-red-200 text-red-800 hover:bg-red-300 transition duration-150 shadow-md">
                            Failed
                        </button>
                    </div>
                </div>`)
            
          }
        }
        names.insertAdjacentHTML("beforeend",`<option value="${data[i].personalInfo.fullName}">${data[i].personalInfo.fullName}</option>`)
   
    
   } })
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
})

}