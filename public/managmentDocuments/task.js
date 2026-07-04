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
// status= active duedate=underDue green checked passed
if(tasks.status=="active"&& new Date(tasks.dueDate)>new Date()&&tasks.editStatus=="edited"){
 taskCardActive.insertAdjacentHTML(
    "beforeend",
    `<div id="task-card-1" class="relative bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-xl transition duration-300 flex flex-col h-full">
    
    <!-- Edited Label -->
    <span class="absolute top-2 right-2 text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wider">
        Edited
    </span>

    <div class="flex-1">
        <div class="flex justify-between items-start mb-3">
            <span class="text-[10px] font-bold tracking-widest text-indigo-400 uppercase taskID">${tasks.taskID}</span>
            <span class="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">In Progress</span>
        </div>
        
        <h3 class="text-lg font-bold text-gray-800 mb-1 taskName editable">${tasks.taskName}</h3>
        
        <!-- Priority Section -->
        <div class="flex items-center gap-2 mb-3">
            <span class="text-[10px] font-semibold text-gray-400 uppercase">Priority:</span>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded border editable priorityLevel">
                ${tasks.priorityLevel}
            </span>
        </div>

        <p class="text-sm text-gray-600 mb-4 line-clamp-2 description editable">${tasks.description}</p>
        <div class="flex justify-between items-center text-sm mb-4">
            <div>
                <p class="text-gray-500 text-xs">Assigned to:</p>
                <p class="font-medium text-indigo-600 employeeName assignedPerson ">${tasks.assignedPerson}</p>
            </div>
            <div class="text-right">
                <p class="text-gray-500 text-xs">Due Date:</p>
                <p class="font-medium text-gray-700 editable dueDate">${tasks.dueDate}</p>
            </div>
        </div>
    </div>
    <div class="flex space-x-2 pt-4 border-t border-gray-100 btnWrap">
        <button class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition duration-150 shadow-md activeLogSucess">Log Success</button>
        <button class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-150 shadow-md activeLogFail">Log Fail</button>
    </div>
</div>`,
  ); 
//status=active dueDate=overdue red checked passed
}else if(tasks.status=="active"&& new Date(tasks.dueDate)>new Date()){
 taskCardActive.insertAdjacentHTML(
    "beforeend",
    `<div id="task-card-1" class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-xl transition duration-300 flex flex-col h-full">
    <div class="flex-1">
        <div class="flex justify-between items-start mb-3">
            <span class="text-[10px] font-bold tracking-widest text-indigo-400 uppercase taskID">${tasks.taskID}</span>
            <span class="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">In Progress</span>
        </div>
        
        <h3 class="text-lg font-bold text-gray-800 mb-1 taskName editable">${tasks.taskName}</h3>
        
        <!-- Priority Section -->
        <div class="flex items-center gap-2 mb-3">
            <span class="text-[10px] font-semibold text-gray-400 uppercase">Priority:</span>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded border editable priorityLevel">
                ${tasks.priorityLevel}
            </span>
        </div>

        <p class="text-sm text-gray-600 mb-4 line-clamp-2 description editable">${tasks.description}</p>
        <div class="flex justify-between items-center text-sm mb-4">
            <div>
                <p class="text-gray-500 text-xs">Assigned to:</p>
                <p class="font-medium text-indigo-600 employeeName assignedPerson ">${tasks.assignedPerson}</p>
            </div>
            <div class="text-right">
                <p class="text-gray-500 text-xs">Due Date:</p>
                <p class="font-medium text-gray-700 editable dueDate">${tasks.dueDate}</p>
            </div>
        </div>
    </div>
    <div class="flex space-x-2 pt-4 border-t border-gray-100 btnWrap">
        <button class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition duration-150 shadow-md activeLogSucess">Log Success</button>
        <button class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-150 shadow-md activeLogFail">Log Fail</button>
        <button class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition duration-150 shadow-md edit">Edit</button>
    </div>
</div>`,
  ); 
//status=active dueDate=overdue red checked passed
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
// stutus=sucess duedate=underdue green passed
}else if(tasks.status=="sucess"&& new Date(tasks.dueDate)>new Date(tasks.logDate)){

reportContainer.insertAdjacentHTML("beforeend",
`<div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-emerald-500 transition duration-150 hover:shadow-md">
    <div class="flex justify-between items-start mb-1">
        <div class="flex flex-col">
            <span class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">${tasks.taskID}</span>
            <h4 class="text-base font-semibold text-gray-800">${tasks.taskName}</h4>
        </div>
        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">SUCCESS</span>
    </div>

    <div class="flex items-center gap-2 mb-2">
        <span class="text-[10px] font-semibold text-gray-400 uppercase">Priority:</span>
        <span class="px-2 py-0.5 text-[10px] font-bold rounded border">
            ${tasks.priorityLevel}
        </span>
    </div>

    <p class="text-sm text-gray-700 mb-2">${tasks.description}</p>
    <div class="flex justify-between text-xs text-gray-500">
        <span>Assigned: ${tasks.assignedPerson}</span>
        <span>Date: ${tasks.dueDate}</span>
    </div>
</div>`
)
//status=sucess dueDate= Over due green passed
}else if(tasks.status=="overDueSuccess"&& new Date(tasks.dueDate)<new Date(tasks.logDate)){
reportContainer.insertAdjacentHTML("beforeend",
`<div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-emerald-500 transition duration-150 hover:shadow-md">
    <div class="flex justify-between items-start mb-1">
        <div class="flex flex-col">
            <span class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">${tasks.taskID}</span>
            <h4 class="text-base font-semibold text-gray-800">${tasks.taskName}</h4>
        </div>
        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">SUCCESS (DELAYED)</span>
    </div>

    <div class="flex items-center gap-2 mb-2">
        <span class="text-[10px] font-semibold text-gray-400 uppercase">Priority:</span>
        <span class="px-2 py-0.5 text-[10px] font-bold rounded border">
            ${tasks.priorityLevel}
        </span>
    </div>

    <p class="text-sm text-gray-700 mb-2">${tasks.description}</p>
    <div class="flex justify-between text-xs text-gray-500">
        <span>Assigned: ${tasks.assignedPerson}</span>
        <span>Date: ${tasks.dueDate} (Completed Late)</span>
    </div>
</div>`
)
// status=fail duedate= underdue red

}else if(tasks.status=="fail"&& new Date(tasks.dueDate)>new Date(tasks.logDate)){
reportContainer.insertAdjacentHTML("beforeend",
`<div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-red-500 transition duration-150 hover:shadow-md">
    <div class="flex justify-between items-start mb-1">
        <div class="flex flex-col">
            <span class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">${tasks.taskID}</span>
            <h4 class="text-base font-semibold text-gray-800">${tasks.taskName}</h4>
        </div>
        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">FAILURE</span>
    </div>

    <div class="flex items-center gap-2 mb-2">
        <span class="text-[10px] font-semibold text-gray-400 uppercase">Priority:</span>
        <span class="px-2 py-0.5 text-[10px] font-bold rounded border">
            ${tasks.priorityLevel}
        </span>
    </div>
    <p class="text-sm text-gray-700 mb-2">${tasks.description}</p>
    <div class="flex justify-between text-xs text-gray-500">
        <span>Assigned: ${tasks.assignedPerson}</span>
        <span>Date: ${tasks.dueDate}</span>
    </div>
</div>`
)
// status=fail due date=overdue
}else if(tasks.status=="OverDueFail"&& new Date(tasks.dueDate)<new Date(tasks.logDate)){
reportContainer.insertAdjacentHTML("beforeend",
`<div class="p-4 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 border-red-500 transition duration-150 hover:shadow-md">
    <div class="flex justify-between items-start mb-1">
        <div class="flex flex-col">
            <span class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">${tasks.taskID}</span>
            <h4 class="text-base font-semibold text-gray-800">${tasks.taskName}</h4>
        </div>
        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">FAIL (DELAYED)</span>
    </div>

    <div class="flex items-center gap-2 mb-2">
        <span class="text-[10px] font-semibold text-gray-400 uppercase">Priority:</span>
        <span class="px-2 py-0.5 text-[10px] font-bold rounded border">
            ${tasks.priorityLevel}
        </span>
    </div>

    <p class="text-sm text-gray-700 mb-2">${tasks.description}</p>
    <div class="flex justify-between text-xs text-gray-500">
        <span>Assigned: ${tasks.assignedPerson}</span>
        <span>Date: ${tasks.dueDate} (Completed Late)</span>
    </div>
</div>`
)

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
  const activeLogBtn=document.querySelectorAll(".activeLogSucess, .activeLogFail, .overDueLogSucess, .overDueLogFail, .edit")
  activeLogBtn.forEach(btns=>{
    btns.onclick=()=>{
     const assignedPersonText=btns.parentElement.parentElement.querySelector(".assignedPerson").innerText
    const taskIDText=btns.parentElement.parentElement.querySelector(".taskID").innerText
// activelogSucess button action code block pass
    if(btns.classList.contains("activeLogSucess")){
       fetch("/taskAction", {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ "status": "sucess","logDate": `${new Date()}`,"companyUID": localStorage.getItem("UID"),"assignedPerson": assignedPersonText,"taskID":taskIDText,"action":"log"}),
       })
         .then((res) => {
           return res.json();
         })
         .then((data) => {
btns.parentElement.parentElement.style.display="none"
      // active log sucess section pass
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
// issue fixed making the container disaper and duedate fixed pass
         });
    }else if(btns.classList.contains("activeLogFail")){
         fetch("/taskAction", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ "status": "fail","logDate": `${new Date()}`,"taskID":`${btns.parentElement.parentElement.querySelector(".taskID").innerText}`, "companyUID": localStorage.getItem("UID"),"assignedPerson":assignedPersonText,"action":"log"}),
         })
           .then((res) => {
             return res.text();
           })
           .then((data) => {
    //active log fail section pass
btns.parentElement.parentElement.style.display="none"
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

//issue fixed bu solving spelling issue passed
    }else if(btns.classList.contains("overDueLogSucess")){
btns.parentElement.parentElement.style.display="none"
fetch("/taskAction", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ "status": "overDueSuccess","logDate": `${new Date()}`, "taskID":`${btns.parentElement.parentElement.querySelector(".taskID").innerText}`,"companyUID": localStorage.getItem("UID"),"assignedPerson":assignedPersonText,"action":"log"}),
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
btns.parentElement.parentElement.style.display="none"
fetch("/taskAction", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ "status": "OverDueFail","logDate": `${new Date()}`, "taskID":`${btns.parentElement.parentElement.querySelector(".taskID").innerText}`, "companyUID": localStorage.getItem("UID"),"assignedPerson":assignedPersonText,"action":"log"}),
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
}else if(btns.classList.contains("edit")){
const editableTexts=btns.parentElement.parentElement.querySelectorAll(".editable")
if(!document.querySelector(".saveEdit")){
const btnWrap=btns.parentElement.parentElement.querySelector(".btnWrap")
btnWrap.innerHTML=`<button class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-indigo-700 text-white hover:bg-indigo-800 transition duration-150 shadow-md saveEdit">Save</button>`
const saveBtn=document.querySelector(".saveEdit")
saveBtn.onclick=()=>{
const actionBody=JSON.stringify({
"taskID":`${saveBtn.parentElement.parentElement.querySelector(".taskID").innerText}`,"companyUID": localStorage.getItem("UID"),
"assignedPerson":`${saveBtn.parentElement.parentElement.querySelector(".assignedPerson").innerText}`,
"action":"edit",
"taskName":`${saveBtn.parentElement.parentElement.querySelector(".taskName").innerText}`,
"priority":`${saveBtn.parentElement.parentElement.querySelector(".priorityLevel").innerText}`,
"description":`${saveBtn.parentElement.parentElement.querySelector(".description").innerText}`,
"dueDate":`${saveBtn.parentElement.parentElement.querySelector(".dueDate").innerText}`,
})

fetch("/taskAction",
{
method:"POST",
headers:{"Content-type":"application/json"},
 body: actionBody,
// continue from here by emplementing the edit labeles send the full json with them value on it
})
.then(res=>{
return res.text()
})
.then(data=>{
alert("Task Edited")
window.location.reload()
})
}
}else if(document.querySelector(".saveEdit")){
window.alert("Please Save The Previous Task")
}
for (const key in editableTexts) {
    if(editableTexts[key].innerText){
        editableTexts[key].setAttribute("contentEditable","true")
}
}
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

// almost everything is over check it out tomorrow