import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadString,
} from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection, getFirestore } from "firebase/firestore";

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
      const uploadResponse = await uploadString(
        imageRef,
        base64Image,
        "base64",
        metadata
      );
  
      const url = await getDownloadURL(uploadResponse.ref);
  
      return url;
    } catch (error) {
        alert(error)
        console.log(`Error uploading image: ${error}`)
        return "error";
    }
};

export const storeObjToDB = async (collectionName="Products", dataObj={key:"Please provide a data-obj to continue"})=>{
    try {
        const newDoc = await addDoc(
            collection(db, collectionName),
            dataObj);

        return newDoc;
    } catch (error) {
        alert(error)
        console.log(`Error storing product to database: ${error}`)
        return error;
    }
}
