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
  apiKey: "AIzaSyAUP7Mncn62Xe0WYGC9TgqsYGBmBD3eXQU",
  authDomain: "al-zehra.firebaseapp.com",
  projectId: "al-zehra",
  storageBucket: "al-zehra.appspot.com",
  messagingSenderId: "409292615047",
  appId: "1:409292615047:web:a1282da2b9182c2fdbb722",
  measurementId: "G-MXCEGHNV6P"
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
      window.location.href = "../";
    }
  });


//google sign up 
googleSignupBtn.addEventListener("click", async ()=>{
   const user = await signInWithRedirect(auth, googleAuthProvider);
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