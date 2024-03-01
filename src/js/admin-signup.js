"use-strict";

//importing essentials
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//getting elements from dom
const signup_form = document.getElementById('signup_form');
const msg = document.querySelector('.message');

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
    console.log(signup_form.name.value)
    createUserWithEmailAndPassword(auth, signup_form.email.value, signup_form.password.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)

        localStorage.setItem("userCredential",user);
        signup_form.reset()
        alert('success')
        // ...
      })
      .catch((error) => {
        alert('failed')
        signup_form.reset()
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
})
  