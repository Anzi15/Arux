"use strict";
import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import Swal from 'sweetalert2'

// getting elemes from dom 
const login_form = document.getElementById('login_form');
const msg = login_form.querySelector('.message');
const googleSignupBtn = document.getElementById("google_signup_btn");
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');

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

//Initialize googleAuthProvider
const googleAuthProvider = new GoogleAuthProvider()

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//event listners
login_form.addEventListener("submit",(e)=>{
    e.preventDefault();
    msg.classList.toggle("none");
    msg.innerHTML=`Please wait...`
    const email = login_form.email.value;
    const password = login_form.password.value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        msg.classList.toggle("success");
        msg.innerHTML=`Loged in!`;
        window.location.href = "../";
        localStorage.setItem("userCredential",user);
        login_form.reset()
        // ...
    })
    .catch((error) => {
        const errorMessage = error.message;
        msg.classList.toggle("failure");
        msg.innerHTML=errorMessage;
        setTimeout(() => {
          msg.classList.toggle("failure");
          msg.classList.toggle("none");
        }, 6500);
    });
})
  
//if signed in redirect =>
  onAuthStateChanged(auth, (user) => {
    if (user && !user.isAnonymous) {
      console.log(user)
      alert("pause")
      window.location.href = "../";
    }
  });


//google sign up 
googleSignupBtn.addEventListener("click", async ()=>{
   const user = await signInWithRedirect(auth, googleAuthProvider);
   console.log(user)
})

forgotPasswordBtn.addEventListener("click",async (e)=>{
  e.preventDefault()
  const { value: email } = await Swal.fire({
    title: "Input email address",
    input: "email",
    inputLabel: "Your email address",
    inputPlaceholder: "Enter your email address"
  });
  if (email) {
    sendPasswordResetEmail(auth, email)
  .then(() => {
    Swal.fire("Email sent to your inbox!")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }
})