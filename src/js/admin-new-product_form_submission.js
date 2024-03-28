"use strict";
// essential imports
import {
  showMsg,
  storeObjToDB,
  uploadImageToFirebase,
  addLoader,
  showAskingAlert,
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
showAskingAlert(
  "success",
  "Product added successfully",
  "Continue by going to dashboard or adding another product.",
  "Go to dashboard",
  () => {
    window.location.replace("../Products");
  },
  true,
  "Add another Product",
  ()=>{window.location.reload()},
  false
);
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
      showAskingAlert(
        "error",
        "Task failed :(",
        "Check your internet and try again..",
        "Alright!",
        () => {
          window.location.reload();
        },
        false,
        "",
        () => {
          window.location.reload();
        },
        false
      );
      throw new Error("Error creating product");
    } else {
      showAskingAlert(
        "success",
        "Product added successfully",
        "Continue by going to dashboard or adding another product.",
        "Go to dashboard",
        () => {
          window.location.replace("../");
        },
        "Add another Product",
        ()=>{window.location.reload()},
        false
      );
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
      product_data_obj[feildName] = elem.value;
    });
    updateSteps();
  }
};

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
