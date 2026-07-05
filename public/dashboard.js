import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBKSuvaWfC7v1bwH12pVJTilwyk3mamxxI",
    authDoheader: "employee-managment-syste-fdd4c.firebaseapp.com",
    projectId: "employee-managment-syste-fdd4c",
    storageBucket: "employee-managment-syste-fdd4c.firebasestorage.app",
    messagingSenderId: "1016929288920",
    appId: "1:1016929288920:web:0cc4e437af745933430dad"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
const employeeNumber=document.getElementById("employeeNumber")
const companyName=document.getElementById("companyName")
const companyLogo=document.getElementById("companyLogo")
const adminName=document.getElementById("adminName")
const adminInfo=document.getElementById("adminInfo")
const dataContainer=document.getElementById("dataContainer")
// ADMIN DATA FETCH CODE BLOCK
fetch("/companyFetch",{
method:"POST",
headers:{"Content-type":"application/json"},
body:JSON.stringify({"companyUID":localStorage.getItem("UID")})
})
.then((res)=>{
return res.json()
})
.then((data)=>{
companyLogo.setAttribute("src",`${data.companyLogo}`)
companyName.innerText=`${data.companyName}`
adminName.innerText=`${data.adminAccount.adminName}`

})
// USER DAATA FETCHING CODE BLOCK

fetch("/nameData",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({companyUID:localStorage.getItem("UID")})
}).then(res=>{
    return res.json()
}).then(data=>{
if(data.length==0){
dataContainer.innerHTML=`  <div class="text-center p-8 bg-white rounded-xl shadow-lg w-full col-span-full">
    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
        No employees registered
    </h1>
    <p class="text-sm text-gray-600 mb-6">
        Get started by adding your first employee to the system.
    </p>
    
    <!-- Added Button -->
    <button class="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 transition shadow-md addEmployeeBtn">
        + Add  Employee
    </button>
</div>`
employeeNumber.innerText=`${data.length} : Active-employees`
}else if(data.length!=0){
// continue from here by emplementing the header section up to now the the text fields are fixed except the payroll date display {#b6a,1}
employeeNumber.innerText=`${data.length} : Active-employees`
}

})
// sign out section
 const logoutBtn=document.getElementById("logoutBtn")
logoutBtn.onclick=()=>{
  signOut(auth)
      .then(()=>{
        window.location="./logIn.html"
      })
}   
    const uid = user.uid;
    // ...
  } else {
    window.location.href="./logIn.html"
  }
});
