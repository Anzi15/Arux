//essential imports
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";

//my firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtDQsUvkfEiuD-o48LosmunhQ5YzPP94Y",
  authDomain: "arux-24899.firebaseapp.com",
  projectId: "arux-24899",
  storageBucket: "arux-24899.appspot.com",
  messagingSenderId: "95411992302",
  appId: "1:95411992302:web:336d7a38ca931af33225ff",
  measurementId: "G-LXN5WG6V2S",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firebase
const db = getFirestore(app);


//functions
async function getCollection(collectionName){
  const querySnapshot = await getDocs(collection(db, collectionName));
  const returnArr = []
  querySnapshot.forEach((doc) => {
    returnArr.push(doc.data())
  });
  return returnArr
}

async function checkAccess(userEmail) {
  const collectionArr = await getCollection('Admins')
  console.log(``)
  collectionArr.forEach((col)=>{
    if(col.Email == userEmail){
      loadContent()
      console.log(col.Email == userEmail)
    }else{
      window.location.href = "/admin/unauthorized";
    }
  })

}

function loadContent(){
  
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    checkAccess(user.email);
    // ...
  } else {
    window.location.href = "/admin/login";
  }
});
