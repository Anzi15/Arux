"use strict";

import { initializeApp, } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { v4 } from "uuid";

import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  limitToLast,
  orderBy,
  documentId,
  initializeFirestore,
  limit
} from "firebase/firestore";
import Swal from "sweetalert2";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { reduceEachLeadingCommentRange } from "typescript";


//TODO: break down admin-modules into seprate files, like firebase modules, ui-modules, etc.

//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtDQsUvkfEiuD-o48LosmunhQ5YzPP94Y",
  authDomain: [
    "arux-24899.firebaseapp.com",
    "localhost",
    "arux.netlify.app",
    "arux.store",
    "anzi15.github.io/arux",
    "arux.vercel.app",
  ],
  projectId: "arux-24899",
  storageBucket: "arux-24899.appspot.com",
  messagingSenderId: "95411992302",
  appId: "1:95411992302:web:336d7a38ca931af33225ff",
  measurementId: "G-LXN5WG6V2S",
};

const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const auth = getAuth(app);

(() => {
  if (!window.navigator.onLine) showAlert("error","No internet","You seem offline","Refresh page").then(response => {
    if(response.isConfirmed){
      window.location.reload()
    }
  })
})();

const showMsg = (
  elem,
  message = "your message will display here",
  color = "black"
) => {
  elem.style.color = color;
  elem.innerText = message;
  return "done";
};

// Function to upload image to firebase and get url
const uploadImageToFirebase = async (file) => {
  const imageRef = ref(firebaseStorage, `Products/${v4()}`);
  const metadata = {
    contentType: "image/webp",
  };
  const base64Image = file.split(",")[1];

  try {
    if (navigator.onLine) {
      const uploadResponse = await uploadString(
        imageRef,
        base64Image,
        "base64",
        metadata
      );

      const url = await getDownloadURL(uploadResponse.ref);

      return url;
    } else {
      throw new Error("No internet");
    }
  } catch (error) {
    console.log(`Error uploading image: ${error}`);
    return "error";
  }
};

const storeObjToDB = async (
  collectionName = "Products",
  dataObj = { key: "Please provide a data-obj to continue" }
) => {
  try {
    if (navigator.onLine) {
      const newDoc = await addDoc(collection(db, collectionName), dataObj);
      return newDoc;
    } else {
      throw new Error("No internet");
    }
  } catch (error) {
    console.log(`Error storing product to database: ${error}`);
    showAlert("error","No internet","failed to save changes to the cloud please try again latter","Refresh page").then(response => {
    return "error";
      if(response.isConfirmed){
        window.location.reload()
      }
    })
  }
};

const getAllFirestoreDocuments = async (collectionName = "Products") => {
  try {
    if (window.navigator.onLine) {
      const doc_ref = collection(db, collectionName);
      const querySnapshot = await getDocs(doc_ref);
      return querySnapshot;
    } else {
      showNotification("error", "You seem having internet issues :(", 8000);
    }
  } catch (error) {
    console.log(`Error getting documents from firestore: ${error}`);
    showNotification("error", error);
    return [];
  }
};

const getAllFirestoreDocumentsSorted = async(collectionName, fieldName, orderDirection)=>{
  try {
    if (window.navigator.onLine) {
      const collRef = collection(db, collectionName)
      const q = query(collRef, orderBy(fieldName, orderDirection), limit(1000));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs;
    } else {
      showNotification("error", "You seem having internet issues :(", 8000);
    }
  } catch (error) {
    console.log(`Error getting documents from firestore: ${error}`);
    showNotification("error", error);
    return [];
  }
}

const getFewFirestoreDocs = async (collectionName, limit) => {
  try {
    const collRef = collection(db, collectionName);
    const q = query(collRef, orderBy("title"), limitToLast(limit));
    const querySnapshot = await getDocs(q);
    const documents = [];

    querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, data: doc.data() });
    });

    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    showNotification("error", "Something went wrong, please try again", 90000);
    return [];
  }
};

const getListOfFirestoreDocs = async(collectionName, listOfIds)=>{
  try {
    const list = [...listOfIds]
    console.log(list)
    const querySnapshot = await getDocs(query(collection(db, collectionName), where(documentId(), 'in', list)));
    
    const products = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
    
    return products;
  } catch (error) {
    console.error("Error fetching cart products: ", error);
    // Handle the error appropriately
    return [];
  }
}

const getFirestoreDocument = async (collectionName, docID) => {
  try {
    const docRef = doc(db, collectionName, docID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document! doc_id:", docID);
      throw new Error("Something went wrong :(");
    }
  } catch (error) {
    const confirmationObj = await showAlert(
      "error",
      "Something went wrong :(",
      "Please try again",
      "Try again!"
    );
    if (confirmationObj.isConfirmed) {
      window.location.reload();
    }
    return error;
  }
};

const userExistInFireAuth = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user); // Resolve with user object if user is authenticated
      } else {
        console.log("User not authenticated");
        resolve(false); // Resolve with false if user is not authenticated
      }
    });
  });
};


const updateFirestoreDocument = async (
  collectionName,
  docID,
  updatedObj
) => {
  const docRef = doc(db, collectionName, docID);

  for (const fieldName in updatedObj) {
    try {
      const data = {};
      const fieldValue = updatedObj[fieldName];
      data[fieldName] = fieldValue
      const updateTask = await updateDoc(docRef, data); 
    } catch (error) {
      console.log(error)
      const confirmationObj = await showConfirmationDialog(
        "error",
        "Something went wrong while saving changes to the document :(",
        "Please try again",
        "Refresh",
        "Go to the dashboard"
      );
      if (confirmationObj.isConfirmed) {
        window.location.reload();
      }else if(confirmationObj.isDenied){
        window.location.replace("/admin/products");
      }
    }   
  }
};

const checkFieldValueExistsInDB = async(collectionName, fieldName, fieldValue)=>{
  const collRef = collection(db, collectionName);

  const q = query(collRef, where(fieldName, "==", fieldValue));

  const querySnapshot = await getDocs(q);
  if(querySnapshot.docs.length) return true;
  return false;
}
const searchFiretoreDocsBySpecificField = async(collectionName, fieldName, searchQuery)=>{
  const collRef = collection(db, collectionName);

  const q = query(collRef, where(fieldName, "==", searchQuery));

  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
  if(querySnapshot.docs.length) return products;
  return [];
}

const deleteDocumentFromFirestore = async (collectionName, document_id) => {
  let returningObj = {};
  try {
    const deleteTask = await deleteDoc(doc(db, collectionName, document_id));
    returningObj.taskCompleted = true;
  } catch (error) {
    returningObj.taskCompleted = false;
    returningObj.errorMsg = " Something went wrong, please try again!";
  }
  return returningObj;
};

const removeLoader = (parentElem = document.body) => {
  const allChildElems = parentElem.querySelectorAll(".loader-wrapper");
  allChildElems.forEach((child) => child.remove());
};

const signOutFirebaseAuth = () => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
          resolve(true);
      })
      .catch((error) => {
        reject(error); 
      });
  });
};



const addLoader = (
  parentElem = document.body,
  overlayLoader = false
) => {
  const LoaderMessageArr = [
    "Did you know? Images speak louder than words!",
    "Attention to detail makes all the difference!",
    "Fun Fact: Every product tells a story.",
    "Quote of the day: 'The future belongs to those who believe in the beauty of their dreams.' - Eleanor Roosevelt",
    "Patience is a virtue, and great products are worth the wait!",
    "Did you know? Quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction, and skillful execution.",
    "Good things come to those who wait, but better things come to those who work for it.",
    "Rome wasn't built in a day, and neither is a successful e-commerce store!",
    "Quote of the day: 'Success is not final, failure is not fatal: It is the courage to continue that counts.' - Winston Churchill",
    "Did you know? Innovation distinguishes between a leader and a follower.",
    "Believe you can and you're halfway there!",
    "Every great accomplishment starts with the decision to try.",
    "Fun Fact: Diamonds are just chunks of coal that stuck to their goals!",
    "Quote of the day: 'The only way to do great work is to love what you do.' - Steve Jobs",
    // Additional messages:
    "Tip: If this is taking longer than usual, check your internet connection.",
    "Success doesn't happen overnight, but it's worth the wait!",
    "Fun Fact: The average person spends about 2 years of their life waiting in line - your wait is almost over!",
    "Tip: Take a deep breath and relax, your product is almost ready to shine!",
    "Dream big, work hard, and your efforts will pay off!",
    "Fun Fact: The world's first e-commerce transaction was in 1994 for a Sting CD - we've come a long way since then!",
    "Tip: While you wait, why not explore our latest collections for some inspiration?",
    "The journey to success is paved with patience and perseverance - you're on the right path!",
    "Fun Fact: The longest recorded time spent waiting on hold is 15 hours - luckily, your wait won't be that long!",
    "Tip: Trust the process, and soon you'll see the results you've been waiting for!",
];
  if (parentElem == null || parentElem == undefined) return;
  const numOfMsgs = LoaderMessageArr.length;
  let currentMsgIndex=0;

  parentElem.innerHTML += `<div class="loader-wrapper ${overlayLoader ? 'overlay' : 'meow'}">
  <div class="loader">

  </div>
  <p class="loader-msg" id="LoadingMsg">${LoaderMessageArr[0]}</p>
  </div>`;

  const LoadingMsgElem = document.getElementById('LoadingMsg');
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * LoaderMessageArr.length);
    LoadingMsgElem.innerText = LoaderMessageArr[randomIndex];
  }, 8000);

};

const showConfirmationDialog = async (
  icon = "success",
  title,
  text,
  confirmationText,
  cancelButtonText
) => {
  const showTaskCompleteAlert = await Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#59748A",
    confirmButtonText: `${confirmationText}`,
    showCancelButton: true,
    cancelButtonText,
    allowOutsideClick: false,
  });
  return showTaskCompleteAlert;
};

async function showAlert  (icon = "success", title, text, btnText) {
  const alert = await Swal.fire({
    icon,
    title,
    text,
    confirmButtonText: btnText,
    confirmButtonColor: "#59748A",
    allowOutsideClick: false
  });
  return alert
};

async function showNotification(icon, text, duration = 4000) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });
  await Toast.fire({
    icon: icon,
    title: text,
  });
}

const preventDefaults = function (e) {
  e.preventDefault();
  e.stopPropagation();
};
const classAdder = (elem, ...classes) => {
  const classListArr = [...classes];
  classListArr.forEach((className) => {
    elem.classList.add(className);
  });
};
const classRemover = (elem, ...classes) => {
  const classListArr = [...classes];
  classListArr.forEach((className) => {
    elem.classList.remove(className);
  });
};
export {
  showMsg,
  uploadImageToFirebase,
  showConfirmationDialog,
  storeObjToDB,
  getAllFirestoreDocuments,
  getAllFirestoreDocumentsSorted,
  getFewFirestoreDocs,
  getListOfFirestoreDocs,
  userExistInFireAuth,
  getFirestoreDocument,
  checkFieldValueExistsInDB,
  searchFiretoreDocsBySpecificField,
  updateFirestoreDocument,
  deleteDocumentFromFirestore,
  signOutFirebaseAuth,
  removeLoader,
  addLoader,
  showAlert,
  showNotification,
  preventDefaults,
  classAdder,
  classRemover,
};
