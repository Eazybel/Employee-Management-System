// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// initialisation of the tags

const btn=document.getElementById("btn")
// Company Information
let cloudImage;
fetch("/hide")
.then(res=>{
  return res.json()
})
.then(data=>{
cloudImage=data.urlImage
})


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
  btn.onclick=async(e)=>{
  const form=document.getElementById("form")
  const file = document.getElementById("logo").files[0];
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
    }
       const userAuther=await createUserWithEmailAndPassword(auth, email, password)
           .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage)
            });
        const user = userAuther.user;
        forms.append("companyUID",user.uid)
    
      try {
        const cloudinary=new FormData(form)
        cloudinary.append("file",file)
        cloudinary.append("upload_preset","companysLogo")
         
       await fetch(cloudImage,{
          method:"POST",
          body:cloudinary
        })
        .then((res)=>{
          return res.json()
        }).then(data=>{
          forms.append("imageUrl",data.url)
          alert("Company Registered Sucessfully")
        })

       await fetch("/",{
          method:"POST",
          body:forms
        }).then(()=>{
          window.location="./logIn.html"
        })
        
      } catch (error) {
        console.log(error)
      }
      
  
    }


  