// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//my firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtDQsUvkfEiuD-o48LosmunhQ5YzPP94Y",
  authDomain: "arux-24899.firebaseapp.com",
  projectId: "arux-24899",
  storageBucket: "arux-24899.appspot.com",
  messagingSenderId: "95411992302",
  appId: "1:95411992302:web:336d7a38ca931af33225ff",
  measurementId: "G-LXN5WG6V2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//reading data from db
const doc_ref = collection(db, "Top-products");
const querySnapshot = await getDocs(doc_ref);
querySnapshot.forEach(doc => {
    
});
