//essential imports
import {initializeApp} from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    alert("user exist")
    console.log(user)
    // ...
  } else {
    console.log(`user is not sign in`)
  }
});