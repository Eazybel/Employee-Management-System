import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
const submitBtn = document.getElementById('btn');
const form = document.getElementById('form');
 const firebaseConfig = {
    apiKey: "AIzaSyBKSuvaWfC7v1bwH12pVJTilwyk3mamxxI",
    authDomain: "employee-managment-syste-fdd4c.firebaseapp.com",
    projectId: "employee-managment-syste-fdd4c",
    storageBucket: "employee-managment-syste-fdd4c.firebasestorage.app",
    messagingSenderId: "1016929288920",
    appId: "1:1016929288920:web:0cc4e437af745933430dad"
  };
  const app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
    submitBtn.onclick=(e)=>{
    const forms=new FormData(form)
    forms.append("UID",user.uid)
    if(!form.checkValidity()){
        form.reportValidity()
        return
    }
    e.preventDefault()
    fetch("/employeeRegister",{
        method:"POST",
        body:forms
    }).then((res)=>{
        return res.text()
    }).then((data)=>{
        console.log(data)
        alert("Employee Registered Sucessully You Can Add-More")
        form.reset()
    }).catch(err=>{
        console.log(err)
    })
}
    } else {
       window.location="./logIn.html"
    }
  });
   