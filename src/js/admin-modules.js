import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadString,
} from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection, getFirestore, getDocs, getDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

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

export const showMsg = (
    elem,
    message = "your message will display here",
    color = "black"
  ) => {
    elem.style.color = color;
    elem.innerText = message;
    return "done";
};

// Function to upload image to firebase and get url
export const uploadImageToFirebase = async (file) => {
    const imageRef = ref(firebaseStorage, `Products/${v4()}`);
    const metadata = {
      contentType: "image/jpeg",
    };
    const base64Image = file.split(",")[1];
  
    try {
      if(navigator.onLine){

        const uploadResponse = await uploadString(
          imageRef,
          base64Image,
          "base64",
          metadata
        );
    
        const url = await getDownloadURL(uploadResponse.ref);
    
        return url;
      }else{
        throw new Error("No internet")
      }
    } catch (error) {
        console.log(`Error uploading image: ${error}`)
        return "error";
    }
};

export const storeObjToDB = async (collectionName="Products", dataObj={key:"Please provide a data-obj to continue"})=>{
    try {
      if(navigator.onLine){
        const newDoc = await addDoc(
        collection(db, collectionName),
        dataObj);
  
        return newDoc;
      }else{
        throw new Error("No internet")
      }
        } catch (error) {
        console.log(`Error storing product to database: ${error}`)
        return "error";
    }
}

export const getAllFirestoreDocuments = async (collectionName = "Products")=>{
try {
    const doc_ref = collection(db, collectionName);
    const querySnapshot = await getDocs(doc_ref);
    return querySnapshot;
} catch (error) {
  console.log(`Error getting documents from firestore: ${error}`)
  return error
}
}

export const removeLoader = (parentElem=document.body)=>{
  const allChildElems = parentElem.querySelectorAll(".loader-wrapper");
  allChildElems.forEach(child => child.remove())
}

export const addLoader = (parentElem=document.body, LoaderMessage="", overlayLoader=false)=>{
  if (parentElem == null || parentElem==undefined) return
  
  if(overlayLoader){
    parentElem.innerHTML += 
    `<div class="loader-wrapper overlay">
    <div class="loader">
        <img src="https://firebasestorage.googleapis.com/v0/b/arux-24899.appspot.com/o/assets%2F1490.gif?alt=media&token=39b08a65-0a7f-4c60-bff2-8635da385328" alt="Loading..."
        draggable="false"
        oncontextmenu="return false">

    </div>
    <p class="loader-msg">${LoaderMessage}</p>
    </div>`;
  }else{
    parentElem.innerHTML += 
    `<div class="loader-wrapper">
    <div class="loader">
        <img src="https://firebasestorage.googleapis.com/v0/b/arux-24899.appspot.com/o/assets%2F1490.gif?alt=media&token=39b08a65-0a7f-4c60-bff2-8635da385328" alt="Loading..."
        draggable="false"
        oncontextmenu="return false">

    </div>
    <p class="loader-msg">${LoaderMessage}</p>
    </div>`;
  }


}

export const showAskingAlert = async (AlertIcon="success", title, message, confirmationText, confirmationAction, cancelBtn = false, cancelText, cancelAction, outsideClick=true)=>{
  const showTaskCompleteAlert = await Swal.fire({
  title: `${title}`,
  text: `${message}`,
  icon: AlertIcon, 
  confirmButtonColor: "#59748A",
  confirmButtonText: `${confirmationText}`,
  showCancelButton: cancelBtn,
  cancelButtonText: `${cancelText}`,
  allowOutsideClick: outsideClick,
  })
  showTaskCompleteAlert.isConfirmed ? confirmationAction() : cancelAction();
}