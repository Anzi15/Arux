// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const imgs = [
//   "https://cdn.shopify.com/s/files/1/0554/8176/1895/files/4f30bb6a33538a1164b815f9f93fa13c_720x720.jpg",
//   "https://cdn.shopify.com/s/files/1/0554/8176/1895/files/eda83abdf052a7b8f852bc060ba6dad4_720x720.jpg",
//   "https://cdn.shopify.com/s/files/1/0554/8176/1895/files/fc92d965dddc22dd30f91e19aff450f0_720x720.jpg",
// ]
// console.log(JSON.stringify(imgs))

//reading data from db
const doc_ref = collection(db, "Top-products");
const querySnapshot = await getDocs(doc_ref);
querySnapshot.forEach(doc => {
    
});
