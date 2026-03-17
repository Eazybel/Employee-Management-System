const closeModalBtn=document.getElementById("close-modal-btn")
const openModal = document.getElementById("open-modal-btn")
const taskModal = document.getElementById("task-modal")
const names = document.getElementById("employee");
const taskCardActive=document.getElementById("taskCardActive")
const taskCardOverdue=document.getElementById("taskCardOverdue")
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
if(data[i].task.length!=0&&data[i].task.some(t=>new Date(t.dueDate)>new Date())){  /*look into this line of code the "some" function*/

  data[i].task.forEach((tasks,i)=>{
  taskCardActive.insertAdjacentHTML(
       "beforeend",
           `<div id="task-card-1" class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-xl transition duration-300 flex flex-col h-full">
    <div class="flex-1">
        <div class="flex justify-between items-start mb-3">
            <span class="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">${tasks.taskID}</span>
            <span class="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">In Progress</span>
        </div>
        <h3 class="text-lg font-bold text-gray-800 mb-2">${tasks.taskName}</h3>
        <p class="text-sm text-gray-600 mb-4 line-clamp-2">${tasks.description}</p>
        <div class="flex justify-between items-center text-sm mb-4">
            <div>
                <p class="text-gray-500 text-xs">Assigned to:</p>
                <p class="font-medium text-indigo-600 employeeName">${tasks.assignedPerson}</p>
            </div>
            <div class="text-right">
                <p class="text-gray-500 text-xs">Due Date:</p>
                <p class="font-medium text-gray-700">${tasks.dueDate}</p>
            </div>
        </div>
    </div>
    <div class="flex space-x-2 pt-4 border-t border-gray-100">
        <button class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition duration-150 shadow-md">
            Log Success
        </button>
        <button class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-150 shadow-md">
            Log Fail
        </button>
        <button class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition duration-150 shadow-md">
            Edit
        </button>
    </div>
</div>`,
         );
       })
      }else if(data[i].task.length!=0&&data[i].task.some(t=>new Date(t.dueDate)<new Date())){
         data[i].task.forEach((tasks, i) => {
           taskCardOverdue.insertAdjacentHTML(
             "beforeend",
             `<div id="overdue-card-1" class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition duration-300 flex flex-col h-full">
    <div class="flex-1">
        <div class="flex justify-between items-start mb-3">
            <span class="text-[10px] font-bold tracking-widest text-red-400 uppercase">${tasks.taskID}</span>
            <span class="text-xs text-red-700 bg-red-100 px-3 py-1 rounded-full">OVERDUE</span>
        </div>
        <h3 class="text-lg font-bold text-gray-800 mb-2">${tasks.taskName}</h3>
        <p class="text-sm text-gray-600 mb-4 line-clamp-2">${tasks.description}</p>
        <div class="flex justify-between items-center text-sm mb-4">
            <div>
                <p class="text-gray-500 text-xs">Assigned to:</p>
                <p class="font-medium text-indigo-600 employeeName">${tasks.assignedPerson}</p>
            </div>
            <div class="text-right">
                <p class="text-gray-500 text-xs">Due Date:</p>
                <p class="font-bold text-red-500">${tasks.dueDate}</p>
            </div>
        </div>
    </div>
    <div class="flex space-x-2 pt-4 border-t border-gray-100">
        <button class="flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition duration-150 shadow-md">
            Log Success
        </button>
        <button class="flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-150 shadow-md">
            Log Fail
        </button>
    </div>
</div>`,
           );
         });
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
  });
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
// Task id implemented next start from confuguring the UI of the active tasks