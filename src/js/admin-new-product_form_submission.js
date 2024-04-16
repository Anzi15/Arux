"use strict";
import { confirmPasswordReset } from "firebase/auth";
// essential imports
import {
  showMsg,
  storeObjToDB,
  uploadImageToFirebase,
  addLoader,
  showConfirmationDialog,
  showAlert
} from "./admin-modules";

//getting elems form dom
const formBasicInfo = document.querySelector("#formBasicInfo");
const formAdditionalInfo = document.querySelector("#formAdditionalInfo");
let product_data_obj = {};
let imagesObj = {};
const prev_step_btn = document.querySelector("#prev_step_btn");

//FUNCTIONS
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

const storeProductToDB = async (productDataObj, productImgObj) => {
  try {
    const combinedData = {
      primary_img: await uploadImageToFirebase(productImgObj.primary_img),
      secondary_img_1: await uploadImageToFirebase(
        productImgObj.secondary_img_1
      ),
      secondary_img_2: await uploadImageToFirebase(
        productImgObj.secondary_img_2
      ),
      ...productDataObj,
    };

    console.log(``,combinedData)

    const storingProduct = await storeObjToDB("Products", combinedData);
    
    if (storingProduct == "error") {
      showAlert(
        "error",
        "Task failed :(",
        "Check your internet and try again..",
        "Alright!",
      );
      throw new Error("Error creating product");
    } else {
      const confirmAlert = await showConfirmationDialog(
        "success",
        "Product added successfully",
        "Continue by going to dashboard or adding another product.",
        "Go to dashboard",
        "Add another Product",
      );
      confirmAlert.isConfirmed ? window.location.replace("../products") : window.location.reload()
    }
  } catch (error) {
    console.log(error);
  }
};

const handleBasicFormSubmission = (e) => {
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
      images[`secondary_img_${i + 1}`] = secondary_imgs[i].src;
    }

    imagesObj = { ...images };

    toStoreElems.forEach((elem) => {
      const feildName = elem.dataset.identification_name;
      if(elem.type == "number"){
        product_data_obj[feildName] = parseInt(elem.value);
      }else{
        product_data_obj[feildName] = (elem.value);
      }
    });
    updateSteps();
  }
};

const handleAdditionalFormSubmission = async (e) => {


  const toStoreElems = e.target.querySelectorAll("[data-identification_name]");

  for (let i = 0; i < toStoreElems.length; i++) {
    const elem = toStoreElems[i];
    const feildName =  elem.dataset.identification_name;
    const elemValue = await elem.value
    console.log(elemValue)
    alert(elem.value)
    if(elem.type == "number"){
      product_data_obj[feildName] = parseInt(elem.value);
    }else{
      product_data_obj[feildName] = (elem.value);
    }
  }
  const loadingMsgs = [
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
  addLoader(e.target, loadingMsgs, true);
  // Continue with the rest of your code...
  storeProductToDB(product_data_obj, imagesObj);
};

//event listners
formBasicInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  handleBasicFormSubmission(e);
});

formAdditionalInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  handleAdditionalFormSubmission(e);
});

prev_step_btn.addEventListener("click", () => {
  updateSteps("previous");
});