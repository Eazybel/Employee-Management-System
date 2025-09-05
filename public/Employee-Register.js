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
  let cloudImage;
  let cloudRaw;
fetch("/hide")
.then(res=>{
  return res.json()
})
.then(data=>{
cloudImage=data.urlImage
cloudRaw=data.urlRaw

})
  const app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
    submitBtn.onclick=async(e)=>{
    const forms=new FormData(form)
    forms.append("UID",user.uid)
    if(!form.checkValidity()){
        form.reportValidity()
        return
    }
    e.preventDefault()
try {
    
    const cv=document.getElementById("document").files[0]
    const cloudinary1=new FormData()
        cloudinary1.append("file",cv)
        cloudinary1.append("upload_preset","employeeDocument")
        
    const cloudinary2=new FormData()
const profileImage=document.getElementById("profile-photo").files[0]
        cloudinary2.append("file",profileImage)
        cloudinary2.append("upload_preset","employeeProfile")

const [cvRes,profileRes]=await Promise.all([
     fetch(cloudRaw,{
        method:"POST",
        body:cloudinary1
    }),
    fetch(cloudImage,{
            method:"POST",
            body:cloudinary2
        })
])
const data1=await cvRes.json()
const data2=await profileRes.json()
forms.append("documentUrl",data1.url)
forms.append("profileUrl",data2.url)
const toTheBackend=fetch("/employeeRegister",{
        method:"POST",
        body:forms
    })
    const res3=await toTheBackend
    const data3=await res3.json()
    .then(()=>{
        alert("Employee Registered Sucessully You Can Add-More")
        form.reset()
    })
} catch (error) {
    console.log(error)
}
}
    } else {
       window.location="./logIn.html"
    }
  });
   