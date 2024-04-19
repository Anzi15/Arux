"use strict";

//importing essentials
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, createUserWithEmailAndPassword } from "firebase/auth";

//getting elements from dom
const signup_form = document.getElementById('signup_form');
const msg = signup_form.querySelector('.message');
const googleSignupBtn = document.getElementById("google_signup_btn");

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

//Initialize googleAuthProvider
const googleAuthProvider = new GoogleAuthProvider()


//eventlistners
//email and pass form submission
signup_form.addEventListener("submit",(e)=>{
  //preventing default form actions
    e.preventDefault();
    //indicating messages
    msg.classList.toggle("none");
    msg.innerHTML=`Please wait...`
    //creating users with email and pass
    createUserWithEmailAndPassword(auth, signup_form.email.value, signup_form.password.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        //indicating messages
        msg.classList.toggle("success")
        msg.innerHTML=`Signined successfully`
        //saving the credential for future use cases
        localStorage.setItem("userCredential",user);
        //reseting form
        signup_form.reset()

        //clearing messages and redirecting the users to admin page
        setTimeout(() => {
          msg.classList.toggle("success");
          msg.classList.toggle("none");
        }, 500);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        //displaying error
        msg.classList.toggle("failure")
        msg.innerHTML=errorMessage;

        //after 6.5 seconds hiding the inidacation msg
        setTimeout(() => {
          msg.classList.toggle("failure");
          msg.classList.toggle("none");
        }, 6500);
        // ..
      });
})

//if signed in redirect =>
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    window.location.href = "../";
    // ...
  } else {
    // User is signed out
    // ...
  }
});

//google sign up 
googleSignupBtn.addEventListener("click", async ()=>{
  await signInWithRedirect(auth, googleAuthProvider);
  
})



  