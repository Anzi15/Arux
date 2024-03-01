"use-strict";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

  