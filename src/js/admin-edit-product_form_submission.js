"use strict";
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
      product_data_obj[feildName] = elem.value;
    });
    updateSteps();
  }

const handleAdditionalFormSubmission = (e) => {
  const toStoreElems = [
    ...e.target.querySelectorAll("[data-identification_name]"),
  ];



  toStoreElems.forEach((elem) => {
    const feildName = elem.dataset.identification_name;
    product_data_obj[feildName] = elem.value;
  });

  storeProductToDB(product_data_obj, imagesObj);
};

//event listners
formBasicInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  handleBasicFormSubmission(e);
});

formAdditionalInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  addLoader(e.target, "Uploading images, please wait!", true);
  handleAdditionalFormSubmission(e);
});

prev_step_btn.addEventListener("click", () => {
  updateSteps("previous");
});
