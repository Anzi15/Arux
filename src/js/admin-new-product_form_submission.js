"use strict";
// essential imports
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
//getting elems form dom
const forms_section = document.getElementById("forms_section");
const form_step_1 = document.querySelector("#form_step_1");
const form_step_2 = document.querySelector("#form_step_2");
let product_data_obj = {};
let imagesObj = {};
const prev_step_btn = document.querySelector("#prev_step_btn");

//firebase
//my firebase configuration
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
const db = getFirestore(app)

//functionsc
const showMsg = (
  elem,
  message = "your message will display here",
  color = "black"
) => {
  elem.style.color = color;
  elem.innerText = message;
  return "done";
};

const hasAnyEmptyImgs = (dropAreaArr) => {
  for (const area of dropAreaArr) {
    const img = area.querySelector(".preview-img");

    if (
      img.src.trim() === "" ||
      img.src.trim() === window.location.origin + window.location.pathname
    ) {
      const msg = area.querySelector(".image-upload-msg");

      showMsg(msg, `This can't be empty!`, "red");

      return true;
    }
  }

  return false;
};

const updateSteps = (direction = "next") => {
  const step_indicator = document.querySelector(".step-indicator");
  const currentActiveStep = step_indicator.querySelectorAll(".active");
  const currentActiveForm = document.querySelector(".currentActiveForm");

  if (direction == "next") {
    currentActiveForm.nextElementSibling.classList.add("currentActiveForm");
    currentActiveForm.nextElementSibling.classList.remove("hidden");

    currentActiveStep[0].nextElementSibling.classList.add("active");
  } else if (direction == "previous") {
    currentActiveForm.previousElementSibling.classList.add("currentActiveForm");
    currentActiveForm.previousElementSibling.classList.remove("hidden");

    currentActiveStep[currentActiveForm.length - 1].classList.remove("active");
  }

  currentActiveForm.classList.remove("currentActiveForm");
  currentActiveForm.classList.add("hidden");
};

// Function to upload image to firebase and get url
const uploadToFirebaseStorage = async (file) => {
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
    return "error";
  }
};

const storeProductToDB = async (productDataObj, productImgObj) => {
  const combinedData = {
    primary_img: await uploadToFirebaseStorage(productImgObj.primary_img),
    secondary_img_1: await uploadToFirebaseStorage(
      productImgObj.secondary_img_1
    ),
    secondary_img_2: await uploadToFirebaseStorage(
      productImgObj.secondary_img_2
    ),
    ...productDataObj,
  };

  const newDoc = await addDoc(collection(db, "Products"),combinedData)

  console.log(`Document written with id: ${newDoc.id}`)

};

//event listners
form_step_1.addEventListener("submit", (e) => {
  e.preventDefault();
  const dropAreas = [...e.target.querySelectorAll(".image-upload")];

  if (!hasAnyEmptyImgs(dropAreas)) {
    const toStoreElems = [
      ...e.target.querySelectorAll("[data-identification_name]"),
    ];
    const primary_img = e.target.querySelector("#primary_img").src;
    const secondary_imgs = [
      ...e.target.querySelectorAll(".secondary_image_preview"),
    ];

    const images = {
      primary_img,
    };

    for (let i = 0; i < secondary_imgs.length; i++) {
      images[`secondary_img_${i+1}`] = secondary_imgs[i].src;
    }

    imagesObj = { ...images };
    console.log(imagesObj);
    alert('breakpoint')

    toStoreElems.forEach((elem) => {
      const feildName = elem.dataset.identification_name;
      product_data_obj[feildName] = elem.value;
    });
    updateSteps();
  }
});

form_step_2.addEventListener("submit", (e) => {
  e.preventDefault();
  const toStoreElems = [
    ...e.target.querySelectorAll("[data-identification_name]"),
  ];

  toStoreElems.forEach((elem) => {
    const feildName = elem.dataset.identification_name;
    product_data_obj[feildName] = elem.value;
  });

  storeProductToDB(product_data_obj, imagesObj);
});

prev_step_btn.addEventListener("click", () => {
  updateSteps("previous");
});
