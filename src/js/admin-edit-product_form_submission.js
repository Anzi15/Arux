"use strict";

import { update } from "firebase/database";


//getting elems form dom
const formBasicInfo = document.querySelector("#formBasicInfo");
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

//event listners
formBasicInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  updateSteps()
});

//for handling the additional form go to admin-product-edit.js

prev_step_btn.addEventListener("click", () => {
  updateSteps("previous");
});
