"use-strict";

//importing essentials
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//getting elements from dom
const signup_form = document.getElementById('signup_form');
const msg = signup_form.querySelector('.message');

//my firebas configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtDQsUvkfEiuD-o48LosmunhQ5YzPP94Y",
    authDomain: "arux-24899.firebaseapp.com",
    projectId: "arux-24899",
    storageBucket: "arux-24899.appspot.com",
    messagingSenderId: "95411992302",
    appId: "1:95411992302:web:336d7a38ca931af33225ff",
    measurementId: "G-LXN5WG6V2S"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//eventlistners
signup_form.addEventListener("submit",(e)=>{
    e.preventDefault();
    msg.classList.toggle("none");
    msg.innerHTML=`Please wait...`
    createUserWithEmailAndPassword(auth, signup_form.email.value, signup_form.password.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        msg.classList.toggle("success")
        msg.innerHTML=`Signined successfully`
        localStorage.setItem("userCredential",user);
        signup_form.reset()
        setTimeout(() => {
          msg.classList.toggle("success");
          msg.classList.toggle("none");
          window.location.href = "../";
        }, 500);
        // ...
      })
      .catch((error) => {
        signup_form.reset()
        const errorMessage = error.message;
        msg.classList.toggle("failure")
        msg.innerHTML=errorMessage;
        setTimeout(() => {
          signup_form.reset()
          msg.classList.toggle("failure");
          msg.classList.toggle("none");
        }, 6500);
        // ..
      });
})
  