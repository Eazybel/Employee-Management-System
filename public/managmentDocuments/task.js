const taskModal=document.getElementById("task-modal")
const taskModalBtn=document.getElementById("open-modal-btn")
const cancelBtn=document.getElementById("cancel-btn")
const names=document.getElementById("employee")

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
    data.forEach(fullNames=>{
        names.insertAdjacentHTML("beforeend",`<option value="${fullNames.personalInfo.fullName}">${fullNames.personalInfo.fullName}</option>`)
    })})