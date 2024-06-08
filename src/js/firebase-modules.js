'use strict';

//*Esential imports
import { initializeApp, } from "firebase/app";
import {showAlert, showConfirmationDialog, showNotification, } from "./utility-modules.js"

import { 
  addDoc, collection, getFirestore, getDocs, getDoc, doc, deleteDoc, updateDoc, query, where, limitToLast, orderBy, documentId, initializeFirestore,
  limit 
} from "firebase/firestore";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";

import { v4 } from "uuid";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import {getAnalytics, getInitalAppProperties} from "firebase/analytics"

//*Varibales 
const firebaseConfig =  {
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
const analytics = getAnalytics(app);

//Self invoking functions(kinda like window.onload)
(() => {
  if (!window.navigator.onLine) showAlert("error","No internet","You seem offline","Refresh page").then(response => {
    if(response.isConfirmed){
      window.location.reload()
    }
  })
})();


//* FIRESTORE FUNCTIONS

//Function to get a single document from firestore
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

//To get all docs from a collection
const getAllFirestoreDocuments = async (collectionName = "products") => {
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

//To get all documents from a collection in a organzied and sorted manner
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

//To get just a few docs form firestore
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

//To get a few specific docs from firestore (takes a list as an param)
const getListOfFirestoreDocs = async(collectionName, listOfIds)=>{
    try {
      const list = [...listOfIds]
      const querySnapshot = await getDocs(query(collection(db, collectionName), where(documentId(), 'in', list)));
      
      const products = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
      
      return products;
    } catch (error) {
      console.error("Error fetching cart products: ", error);
      // Handle the error appropriately
      return [];
    }
}

//To update a doc already existing in firstore
const updateFirestoreDocument = async (
    collectionName,
    docID,
    updatedObj) => {
    const docRef = doc(db, collectionName, docID);
  
    for (const fieldName in updatedObj) {
      try {
        const data = {};
        const fieldValue = updatedObj[fieldName];
        data[fieldName] = fieldValue
        const updateTask = await updateDoc(docRef, data); 
      } catch (error) {
        showNotification("error","Something went wrong")
        return error;
      }   
    }
};

//To PERMANANTLY delete a firestore doc
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

//To create a new doc in firestore
const createDocumentInFirestore = async (
    collectionName = "products",
    dataObj = { key: "Please provide a data-obj to continue" }
  ) => {
    console.log(dataObj)
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
      })
    }
};

//To check whether or not a field's value already exist in the firebase db 
const checkFieldValueExistsInDB = async(collectionName, fieldName, fieldValue)=>{
  const collRef = collection(db, collectionName);

  const q = query(collRef, where(fieldName, "==", fieldValue));

  const querySnapshot = await getDocs(q);
  if(querySnapshot.docs.length) return true;
  return false;
};

//To search for documents using there field's
const searchFiretoreDocsBySpecificField = async(collectionName, fieldName, searchQuery)=>{
  const collRef = collection(db, collectionName);

  const q = query(collRef, where(fieldName, "==", searchQuery));

  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
  if(querySnapshot.docs.length) return products;
  return [];
}


//* FireStorage Functions
// Function to upload image to firebase and get url
const uploadImageToFirebase = async (file) => {
  const imageRef = ref(firebaseStorage, `products/${v4()}`);
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


//* FIREAUTH FUNCTIONS

//To check if a user is authencticated or not
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

// To signout the fireAUTH
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

//* Analytics functions
const logDemographicAnalytics = ()=>{
  getInitalAppProperties
}


//*Exports
export {
    // * Firestore realted functions
    getFirestoreDocument,
    getAllFirestoreDocuments,
    getAllFirestoreDocumentsSorted,
    getFewFirestoreDocs,
    getListOfFirestoreDocs,
    updateFirestoreDocument,
    deleteDocumentFromFirestore,
    createDocumentInFirestore,
    checkFieldValueExistsInDB,
    searchFiretoreDocsBySpecificField,

    //* Firebase storage
    uploadImageToFirebase,
    
    //*Firebase Auth
    signOutFirebaseAuth,
    userExistInFireAuth,

}