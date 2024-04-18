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
  updateDoc,
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

const clientIsConnectedToDb = () => {
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
};
(() => {
  if (!clientIsConnectedToDb) showNotification("error", "You seem offline :(");
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
      console.log(``, dataObj);
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
    if (window.navigator.onLine || clientIsConnectedToDb) {
      const doc_ref = collection(db, collectionName);
      const querySnapshot = await getDocs(doc_ref);
      return querySnapshot;
    } else {
      showNotification("error", "You seem having internet issues :(", 8000);
    }
  } catch (error) {
    console.log(`Error getting documents from firestore: ${error}`);
    showNotification("error", error);
    return error;
  }
};

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
    const confirmationObj = await showConfirmationDialog(
      "error",
      "Something went wrong :(",
      "Please try again",
      "Refresh",
      "Go to dashboard"
    );
    if (confirmationObj.isConfirmed) {
      window.location.reload();
    }else{
      window.location.replace("/admin/products")
    }
    return error;
  }
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
      console.log(updateTask)
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

const deleteDocumentFromFirestore = async (collectionName, document_id) => {
  let returningObj = {};
  try {
    const deleteTask = await deleteDoc(doc(db, collectionName, document_id));
    returningObj.taskCompleted = true;
  } catch (error) {
    returningObj.taskCompleted = false;
    returningObj.errorMsg = " wSomethingent wrong, please try again!";
  }
  return returningObj;
};

const removeLoader = (parentElem = document.body) => {
  const allChildElems = parentElem.querySelectorAll(".loader-wrapper");
  allChildElems.forEach((child) => child.remove());
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
    const loadingMsg = LoaderMessageArr[Math.floor(Math.random() * numOfMsgs)];

    const LoadingMsgElem = document.getElementById("LoadingMsg");
    const loadingImgElem = document.getElementById("loadingImg");

    LoadingMsgElem.innerText = loadingMsg;
    loadingImgElem.alt = loadingMsg;
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
    confirmButtonColor: "#59748A",
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
  getFirestoreDocument,
  updateFirestoreDocument,
  deleteDocumentFromFirestore,
  removeLoader,
  addLoader,
  showAlert,
  showNotification,
  preventDefaults,
  classAdder,
  classRemover,
};
