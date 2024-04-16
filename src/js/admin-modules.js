import { initializeApp } from "firebase/app";
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
} from "firebase/firestore";
import Swal from "sweetalert2";
import { getDatabase, onDisconnect } from "firebase/database";

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
const db = getFirestore(app);

const clientIsConnectedToDb = ()=>{
  const dataBase = getDatabase();
  const connectedRef = ref(dataBase, ".info/connected");
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      return true;
    } else {
      return false;
      // const offlineInterval = setInterval(() => {
      //   showNotification
      // }, 3821);
    }
  });
}
(()=>{
 if(!clientIsConnectedToDb) showNotification("error", "You seem offline :(")
})()

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
    contentType: "image/jpeg",
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
      console.log(``,dataObj)
      const newDoc = await addDoc(collection(db, collectionName), dataObj);

      return newDoc;
    } else {
      throw new Error("No internet");
    }
  } catch (error) {
    console.log(`Error storing product to database: ${error}`);
    return "error";
  }
};



const getAllFirestoreDocuments = async (collectionName = "Products") => {
  try {
    if(window.navigator.onLine || clientIsConnectedToDb){
      const doc_ref = collection(db, collectionName);
      const querySnapshot = await getDocs(doc_ref);
      return querySnapshot;
    }else{
      showNotification("error","You seem having internet issues :(", 8000)
    } 
      
  } catch (error) {
    console.log(`Error getting documents from firestore: ${error}`);
    showNotification("error",error)
    return error;
  }
};

const getFirestoreDocument = async (collectionName, docID)=>{
try {
    const docRef = doc(db, collectionName, docID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log("No such document! doc_id:",docID);
      throw new Error("Something went wrong :(")
    }
} catch (error) {
  showNotification("error","Something went wrong :(", 8000)
  return error
}
}

const deleteDocumentFromFirestore = async (collectionName, document_id) => {
  let returningObj={}
  try {
    const deleteTask = await deleteDoc(doc(db, collectionName, document_id));
    returningObj.taskCompleted = true;
  } catch (error) {
    returningObj.taskCompleted = false;
    returningObj.errorMsg = " wSomethingent wrong, please try again!"
  }
  return returningObj
};

const removeLoader = (parentElem = document.body) => {
  const allChildElems = parentElem.querySelectorAll(".loader-wrapper");
  allChildElems.forEach((child) => child.remove());
};

const addLoader = (
  parentElem = document.body,
  LoaderMessage = "",
  overlayLoader = false
) => {
  const LoaderMessageArr = [...LoaderMessage];
  if (parentElem == null || parentElem == undefined) return;
  const numOfMsgs = LoaderMessage.length

  if (overlayLoader) {
    parentElem.innerHTML += `<div class="loader-wrapper overlay">
    <div class="loader">
        <img id="loadingImg" src="https://firebasestorage.googleapis.com/v0/b/arux-24899.appspot.com/o/assets%2F1490.gif?alt=media&token=39b08a65-0a7f-4c60-bff2-8635da385328" alt="${LoaderMessageArr[0]}"
        draggable="false"
        oncontextmenu="return false">

    </div>
    <p class="loader-msg" id="LoadingMsg">${LoaderMessageArr[0]}</p>
    </div>`;
  } else {
    parentElem.innerHTML += `<div class="loader-wrapper">
    <div class="loader">
        <img id="loadingImg" src="https://firebasestorage.googleapis.com/v0/b/arux-24899.appspot.com/o/assets%2F1490.gif?alt=media&token=39b08a65-0a7f-4c60-bff2-8635da385328" alt="${LoaderMessageArr[0]}"
        draggable="false"
        oncontextmenu="return false">

    </div>
    <p class="loader-msg" id="LoadingMsg">${LoaderMessageArr[0]}</p>
    </div>`;
  }

  const autoLoadingMessageUpdater = setInterval(() => {
    const loadingMsg = LoaderMessageArr[Math.floor(Math.random() * numOfMsgs)]

    const LoadingMsgElem = document.getElementById('LoadingMsg');
    const loadingImgElem = document.getElementById('loadingImg');

    LoadingMsgElem.innerText= loadingMsg;
    loadingImgElem.alt = loadingMsg
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

const showAlert = async (icon = "success", title, text, btnText) => {
  const alert = await Swal.fire({
    icon,
    title,
    text,
    confirmButtonText: btnText,
  });
  if (alert.isConfirmed) return true;
  return false;
};

async function showNotification (icon, text, duration = 4000){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });
  await Toast.fire({
    icon: icon,
    title: text,
  })
}

const preventDefaults = function(e) {
  e.preventDefault()
  e.stopPropagation()
}
const classAdder = (elem, ...classes)=>{
  const classListArr = [...classes]
  classListArr.forEach((className)=>{
    elem.classList.add(className)
  })
}
const classRemover = (elem, ...classes)=>{
  const classListArr = [...classes]
  classListArr.forEach((className)=>{
    elem.classList.remove(className)
  })
}
export {
  showMsg,
  uploadImageToFirebase,
  showConfirmationDialog,
  storeObjToDB,
  getAllFirestoreDocuments,
  getFirestoreDocument,
  deleteDocumentFromFirestore,
  removeLoader,
  addLoader,
  showAlert,
  showNotification,
  preventDefaults,
  classAdder,
  classRemover
};