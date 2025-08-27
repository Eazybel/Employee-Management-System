  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
const btn=document.getElementById("btn")

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
btn.onclick=(e)=>{
const email = document.getElementById("admin-email").value.trim();
const password = document.getElementById("admin-password").value.trim();
 e.preventDefault()
signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
const user = userCredential.user;
alert("logged Ined")
console.log(user.uid)
 }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
 });
        }


