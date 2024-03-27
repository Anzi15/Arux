"use strict";
// essential imports
import {showMsg, storeObjToDB, uploadImageToFirebase} from "./admin-modules"

//getting elems form dom
const formBasicInfo = document.querySelector("#formBasicInfo");
const formAdditionalInfo = document.querySelector("#formAdditionalInfo");
let product_data_obj = {};
let imagesObj = {};
const prev_step_btn = document.querySelector("#prev_step_btn");

//FIREBASE



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

 await storeObjToDB("Products", combinedData)
};

//event listners
formBasicInfo.addEventListener("submit", (e) => {
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
      images[`secondary_img_${i + 1}`] = secondary_imgs[i].src;
    }

    imagesObj = { ...images };

    toStoreElems.forEach((elem) => {
      const feildName = elem.dataset.identification_name;
      product_data_obj[feildName] = elem.value;
    });
    updateSteps();
  }
});

formAdditionalInfo.addEventListener("submit", (e) => {
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
  updateSteps("previous")
});
