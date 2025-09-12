const employeeName=document.querySelectorAll("p.employeeName")
const nameFinder=document.getElementById("nameFinder")
const reportLateArrivalBtn=document.getElementById("reportLateArrivalBtn")
const lateArrivalModal=document.getElementById("lateArrivalModal")
const closeBtn=document.getElementById("closeBtn")
const submitBtn=document.getElementById("submitBtn")
  const lateArrivalForm=document.getElementById("lateArrivalForm")
nameFinder.addEventListener("keyup",(e)=>{
    let target=e.target.value.toLowerCase()
    employeeName.forEach(name => {
        let text=name.innerText.toLowerCase()
        if (text.includes(target)) {
            name.parentElement.parentElement.style.display=""
        }else{
            name.parentElement.parentElement.style.display="none"
            
        }
    });
})
reportLateArrivalBtn.onclick=()=>{
lateArrivalModal.classList.remove("hidden")
}
closeBtn.onclick=()=>{
    lateArrivalModal.classList.add("hidden")

}
submitBtn.onclick=(e)=>{
    e.preventDefault()
  let form=new FormData(lateArrivalForm)
    for (const [key,value] of form) {
        console.log(`key ${key} value ${value}`)
    }
    alert("Saved")
    lateArrivalForm.reset()

}