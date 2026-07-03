const closeModalBtn=document.getElementById("close-modal-btn")
const openModal = document.getElementById("open-modal-btn")
const taskModal = document.getElementById("task-modal")
const names = document.getElementById("employee");
const taskCardActive=document.getElementById("taskCardActive")
const taskCardOverdue=document.getElementById("taskCardOverdue")
const reportContainer=document.getElementById("report-container")
openModal.onclick=()=>{
    taskModal.classList.remove("hidden")
}
closeModalBtn.onclick = () => {
  taskModal.classList.add("hidden");
  window.location.reload()
};
// name data for all employees
fetch("/nameData", {
  method: "POST",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify({ companyUID: localStorage.getItem("UID") }),
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // updated the dropdown to show names
    data.forEach((fullNames,i) => {
      names.insertAdjacentHTML(
        "beforeend",
        `<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`,
      );

if(fullNames.task.length!=0){
fullNames.task.forEach((tasks)=>{
if(tasks.status=="active"&& new Date(tasks.dueDate)>new Date()){
 taskCardActive.insertAdjacentHTML(
    "beforeend",
    `<div id="task-card-1" class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-xl transition duration-300 flex flex-col h-full">
    <div class="flex-1">
        <div class="flex justify-between items-start mb-3">
            <span class="text-[10px] font-bold tracking-widest text-indigo-400 uppercase taskID">${tasks.taskID}</span>
            <span class="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">In Progress</span>
        </div>
        
        <h3 class="text-lg font-bold text-gray-800 mb-1 taskName">${tasks.taskName}</h3>
        
        <!-- Priority Section -->
        <div class="flex items-center gap-2 mb-3">
            <span class="text-[10px] font-semibold text-gray-400 uppercase">Priority:</span>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded border priorityLevel">
                ${tasks.priorityLevel}
            </span>
        </div>

        <p class="text-sm text-gray-600 mb-4 line-clamp-2 description">${tasks.description}</p>
        <div class="flex justify-between items-center text-sm mb-4">
            <div>
                <p class="text-gray-500 text-xs">Assigned to:</p>
                <p class="font-medium text-indigo-600 employeeName assignedPerson">${tasks.assignedPerson}</p>
            </div>
            <div class="text-right">
                <p class="text-gray-500 text-xs">Due Date:</p>
                <p class="font-medium text-gray-700 dueDate">${tasks.dueDate}</p>
            </div>
        </div>
    </div>
    <div class="flex space-x-2 pt-4 border-t border-gray-100">
        <button class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition duration-150 shadow-md activeLogSucess">Log Success</button>
        <button class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-150 shadow-md activeLogFail">Log Fail</button>
        <button class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition duration-150 shadow-md">Edit</button>
    </div>
</div>`,
  ); 
}else if(tasks.status=="active"&& new Date(tasks.dueDate)<new Date()){
taskCardOverdue.insertAdjacentHTML(
             "beforeend",
             `<div id="overdue-card-1" class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition duration-300 flex flex-col h-full">
    <div class="flex-1">
        <div class="flex justify-between items-start mb-3">
            <span class="text-[10px] font-bold tracking-widest text-red-400 uppercase taskID">${tasks.taskID}</span>
            <span class="text-xs text-red-700 bg-red-100 px-3 py-1 rounded-full">OVERDUE</span>
        </div>
        
        <h3 class="text-lg font-bold text-gray-800 mb-1 taskName">${tasks.taskName}</h3>
        
        <div class="flex items-center gap-2 mb-3">
            <span class="text-[10px] font-semibold text-gray-400 uppercase">Priority:</span>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded border priorityLevel">
                ${tasks.priorityLevel}
            </span>
        </div>

        <p class="text-sm text-gray-600 mb-4 line-clamp-2 description">${tasks.description}</p>
        <div class="flex justify-between items-center text-sm mb-4">
            <div>
                <p class="text-gray-500 text-xs ">Assigned to:</p>
                <p class="font-medium text-indigo-600 employeeName assignedPerson">${tasks.assignedPerson}</p>
            </div>
            <div class="text-right">
                <p class="text-gray-500 text-xs">Due Date:</p>
                <p class="font-bold text-red-500 dueDate">${tasks.dueDate}</p>
            </div>
        </div>
    </div>
    <div class="flex space-x-2 pt-4 border-t border-gray-100">
        <button class="flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition duration-150 shadow-md overDueLogSucess">
            Log Success
        </button>
        <button class="flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-150 shadow-md overDueLogFail">
            Log Fail
        </button>
    </div>
</div>`,
           );

}else if(tasks.status=="sucess"&& new Date(tasks.dueDate)>new Date()){


}
})
}


    });
  })
  .then(() => {
    // name filtering field
    const employeeName = document.querySelectorAll("p.employeeName");
    filterBtn.addEventListener("keyup", (e) => {
      let target = e.target.value.toLowerCase();
      employeeName.forEach((employee) => {
        let name = employee.innerText.toLowerCase();
        if (name.includes(target)) {
          employee.parentElement.parentElement.parentElement.parentElement.style.display = "";
        } else {
          employee.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
      });
    });
  const activeLogBtn=document.querySelectorAll(".activeLogSucess, .activeLogFail, .overDueLogSucess, .overDueLogFail")
  activeLogBtn.forEach(btns=>{
    btns.onclick=()=>{
     const assignedPersonText=btns.parentElement.parentElement.querySelector(".assignedPerson").innerText
    const taskIDText=btns.parentElement.parentElement.querySelector(".taskID").innerText
// activelogSucess button action code block
    if(btns.classList.contains("activeLogSucess")){
       fetch("/taskAction", {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ "status": "sucess","companyUID": localStorage.getItem("UID"),"assignedPerson": assignedPersonText,"taskID":taskIDText}),
       })
         .then((res) => {
           return res.json();
         })
         .then((data) => {
      // active log sucess section
           reportContainer.insertAdjacentHTML("beforeend",
`<div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-emerald-500 transition duration-150 hover:shadow-md">
    <div class="flex justify-between items-start mb-1">
        <div class="flex flex-col">
            <span class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">${btns.parentElement.parentElement.querySelector(".taskID").innerText}</span>
            <h4 class="text-base font-semibold text-gray-800">${btns.parentElement.parentElement.querySelector(".taskName").innerText}</h4>
        </div>
        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">SUCCESS</span>
    </div>

    <div class="flex items-center gap-2 mb-2">
        <span class="text-[10px] font-semibold text-gray-400 uppercase">Priority:</span>
        <span class="px-2 py-0.5 text-[10px] font-bold rounded border">
            ${btns.parentElement.parentElement.querySelector(".priorityLevel").innerText}
        </span>
    </div>

    <p class="text-sm text-gray-700 mb-2">${btns.parentElement.parentElement.querySelector(".description").innerText}</p>
    <div class="flex justify-between text-xs text-gray-500">
        <span>Assigned: ${btns.parentElement.parentElement.querySelector(".assignedPerson").innerText}</span>
        <span>Date: ${btns.parentElement.parentElement.querySelector(".dueDate").innerText}</span>
    </div>
</div>`
)

         });
    }else if(btns.classList.contains("activeLogFail")){
         fetch("/taskAction", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ "status": "fail", "companyUID": localStorage.getItem("UID"),"assignedPerson":assignedPersonText}),
         })
           .then((res) => {
             return res.json();
           })
           .then((data) => {
    //active log fail section
reportContainer.insertAdjacentHTML("beforeend",
`<div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-red-500 transition duration-150 hover:shadow-md">
    <div class="flex justify-between items-start mb-1">
        <div class="flex flex-col">
            <span class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">${btns.parentElement.parentElement.querySelector(".taskID").innerText}</span>
            <h4 class="text-base font-semibold text-gray-800">${btns.parentElement.parentElement.querySelector(".taskName").innerText}</h4>
        </div>
        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">FAILURE</span>
    </div>

    <div class="flex items-center gap-2 mb-2">
        <span class="text-[10px] font-semibold text-gray-400 uppercase">Priority:</span>
        <span class="px-2 py-0.5 text-[10px] font-bold rounded border">
            ${btns.parentElement.parentElement.querySelector(".priorityLevel").innerText}
        </span>
    </div>
    <p class="text-sm text-gray-700 mb-2">${btns.parentElement.parentElement.querySelector(".description").innerText}</p>
    <div class="flex justify-between text-xs text-gray-500">
        <span>Assigned: ${btns.parentElement.parentElement.querySelector(".assignedPerson").innerText}</span>
        <span>Date: ${btns.parentElement.parentElement.querySelector(".dueDate").innerText}</span>
    </div>
</div>`)

           });
    }else if(btns.classList.contains("overDueLogSucess")){
fetch("/taskAction", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ "status": "overDueSuccess", "companyUID": localStorage.getItem("UID"),"assignedPerson":assignedPersonText}),
         })
           .then((res) => {
             return res.json();
           })
           .then((data) => {


    reportContainer.insertAdjacentHTML("beforeend",
`<div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-emerald-500 transition duration-150 hover:shadow-md">
    <div class="flex justify-between items-start mb-1">
        <div class="flex flex-col">
            <span class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">${btns.parentElement.parentElement.querySelector(".taskID").innerText}</span>
            <h4 class="text-base font-semibold text-gray-800">${btns.parentElement.parentElement.querySelector(".taskName").innerText}</h4>
        </div>
        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">SUCCESS (DELAYED)</span>
    </div>

    <div class="flex items-center gap-2 mb-2">
        <span class="text-[10px] font-semibold text-gray-400 uppercase">Priority:</span>
        <span class="px-2 py-0.5 text-[10px] font-bold rounded border">
            ${btns.parentElement.parentElement.querySelector(".priorityLevel").innerText}
        </span>
    </div>

    <p class="text-sm text-gray-700 mb-2">${btns.parentElement.parentElement.querySelector(".description").innerText}</p>
    <div class="flex justify-between text-xs text-gray-500">
        <span>Assigned: ${btns.parentElement.parentElement.querySelector(".assignedPerson").innerText}</span>
        <span>Date: ${btns.parentElement.parentElement.querySelector(".dueDate").innerText} (Completed Late)</span>
    </div>
</div>`
)
            })

    }else if(btns.classList.contains("overDueLogFail")){
//overdue log fail section

fetch("/taskAction", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ "status": "OverDueFail", "companyUID": localStorage.getItem("UID"),"assignedPerson":assignedPersonText}),
         })
           .then((res) => {
             return res.json();
           })
           .then((data) => {


   reportContainer.insertAdjacentHTML("beforeend",
`<div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-red-500 transition duration-150 hover:shadow-md">
    <div class="flex justify-between items-start mb-1">
        <div class="flex flex-col">
            <span class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">${btns.parentElement.parentElement.querySelector(".taskID").innerText}</span>
            <h4 class="text-base font-semibold text-gray-800">${btns.parentElement.parentElement.querySelector(".taskName").innerText}</h4>
        </div>
        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">FAIL (DELAYED)</span>
    </div>

    <div class="flex items-center gap-2 mb-2">
        <span class="text-[10px] font-semibold text-gray-400 uppercase">Priority:</span>
        <span class="px-2 py-0.5 text-[10px] font-bold rounded border">
            ${btns.parentElement.parentElement.querySelector(".priorityLevel").innerText}
        </span>
    </div>

    <p class="text-sm text-gray-700 mb-2">${btns.parentElement.parentElement.querySelector(".description").innerText}</p>
    <div class="flex justify-between text-xs text-gray-500">
        <span>Assigned: ${btns.parentElement.parentElement.querySelector(".assignedPerson").innerText}</span>
        <span>Date: ${btns.parentElement.parentElement.querySelector(".dueDate").innerText} (Completed Late)</span>
    </div>
</div> `
)
        })
    }
    }
  })
  });
  // task assigner code block {#116,38}
  taskAssignBtn.onclick=async(e)=>{
    const formData = document.getElementById("task-form");
    const form = new FormData(formData);
    var taskIDdata = "";
 if (formData.checkValidity()){ 
   //form data collect
   e.preventDefault();
   form.append("companyUID", localStorage.getItem("UID"));

   const formObject = Object.fromEntries(form);
   await fetch("/taskLength", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ employee:formObject.employee,companyUID:localStorage.getItem("UID")}),
   })
     .then((res) => {
       return res.text();
     })
     .then((data) => {
      taskIDdata = Number(data);
     });
  // form data send to the server
   await fetch("/taskController", {
     method: "POST",
     headers:{"Content-type":"application/json"},
     body: JSON.stringify({formObject,"taskID":taskIDdata+1}),
   }).then((res)=>{
     return res.text()
   }).then(data=>{
     alert("Task Saved Sicessfully")
     
   }).catch(err=>{
     console.log(err)
   })
 }else{
  formData.reportValidity()
 }
}
