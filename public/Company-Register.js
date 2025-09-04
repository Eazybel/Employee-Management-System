// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// initialisation of the tags

const btn=document.getElementById("btn")
// Company Information

const logo = document.getElementById("logo");

// Primary Contact

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBKSuvaWfC7v1bwH12pVJTilwyk3mamxxI",
    authDomain: "employee-managment-syste-fdd4c.firebaseapp.com",
    projectId: "employee-managment-syste-fdd4c",
    storageBucket: "employee-managment-syste-fdd4c.firebasestorage.app",
    messagingSenderId: "1016929288920",
    appId: "1:1016929288920:web:0cc4e437af745933430dad"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const form=document.getElementById("form")
btn.onclick=(e)=>{
     const forms=new FormData(form)
  e.preventDefault()
const email = document.getElementById("admin-email").value.trim();
const password = document.getElementById("admin-password").value.trim();
const passwordConfirm = document.getElementById("confirm-password").value.trim();
if(!form.checkValidity()){
  form.reportValidity()
  return
}
    if (password!==passwordConfirm) {
       return alert("Password Missmatch")
    }else if(password===passwordConfirm){
        createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        forms.append("companyUID",user.uid)
   
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
    }


  }