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
    const doc_ref = collection(db, collectionName);
    const querySnapshot = await getDocs(doc_ref);
    return querySnapshot;
  } catch (error) {
    console.log(`Error getting documents from firestore: ${error}`);
    return error;
  }
};

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
  if (parentElem == null || parentElem == undefined) return;

  if (overlayLoader) {
    parentElem.innerHTML += `<div class="loader-wrapper overlay">
    <div class="loader">
        <img src="https://firebasestorage.googleapis.com/v0/b/arux-24899.appspot.com/o/assets%2F1490.gif?alt=media&token=39b08a65-0a7f-4c60-bff2-8635da385328" alt="Loading..."
        draggable="false"
        oncontextmenu="return false">

    </div>
    <p class="loader-msg">${LoaderMessage}</p>
    </div>`;
  } else {
    parentElem.innerHTML += `<div class="loader-wrapper">
    <div class="loader">
        <img src="https://firebasestorage.googleapis.com/v0/b/arux-24899.appspot.com/o/assets%2F1490.gif?alt=media&token=39b08a65-0a7f-4c60-bff2-8635da385328" alt="Loading..."
        draggable="false"
        oncontextmenu="return false">

    </div>
    <p class="loader-msg">${LoaderMessage}</p>
    </div>`;
  }
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

async function showNotification (icon, text){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 3821,
    timerProgressBar: true,
  });
  await Toast.fire({
    icon: icon,
    title: text,
  })
}

export {
  showMsg,
  uploadImageToFirebase,
  showConfirmationDialog,
  storeObjToDB,
  getAllFirestoreDocuments,
  deleteDocumentFromFirestore,
  removeLoader,
  addLoader,
  showAlert,
  showNotification
};