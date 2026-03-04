const closeModalBtn=document.getElementById("close-modal-btn")
const openModal = document.getElementById("open-modal-btn")
const taskModal = document.getElementById("task-modal")
const names = document.getElementById("employee");
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
    // updatind the dropdown to show names
    data.forEach((fullNames) => {
      names.insertAdjacentHTML(
        "beforeend",
        `<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`,
      );
    
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
  taskAssignBtn.onclick=(e)=>{
    //form data collect
    e.preventDefault()
  const formData=document.getElementById("task-form")
  const form=new FormData(formData)
  form.append("companyUID",localStorage.getItem("UID"));
  const formObject = Object.fromEntries(form);
// form data send to the server
  fetch("/taskController", {
    method: "POST",
    headers:{"Content-type":"application/json"},
    body: JSON.stringify(formObject),
  });
  }