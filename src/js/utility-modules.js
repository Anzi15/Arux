"use strict";

import Swal from "sweetalert2";

//* UI FUNCTIONS

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

//To show a styled alert 
async function showAlert(icon = "success", title, text, btnText) {
  const alert = await Swal.fire({
    icon,
    title,
    text,
    confirmButtonText: btnText,
    confirmButtonColor: "#59748A",
    allowOutsideClick: false,
  });
  return alert;
}

//To show a notification
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
//*Utility FUNCTIONS

//Function to add Loader to an element
const addLoader = (
  parentElem = document.body,
  overlayLoader = false,
  msg = true
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

  parentElem.innerHTML += `<div class="loader-wrapper ${
    overlayLoader ? "overlay" : "meow"
  }">
      <div class="loader">

      </div>
      <p class="loader-msg  ${msg ? "meow" : "none"}" id="LoadingMsg">${
    LoaderMessageArr[0]
  }</p>
      </div>`;

  if (msg) {
    const LoadingMsgElem = document.getElementById("LoadingMsg");
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * LoaderMessageArr.length);
      LoadingMsgElem.innerText = LoaderMessageArr[randomIndex];
    }, 8000);
  }
};

//Function to remove Loader from an element
const removeLoader = (parentElem = document.body) => {
  const allChildElems = parentElem.querySelectorAll(".loader-wrapper");
  allChildElems.forEach((child) => child.remove());
};

//Function that return today's date in dd/mm/yyyy format
function getFormattedDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return day + "/" + month + "/" + year;
}

//to render a formated cotnent (for indication)
const renderMessage = (
  elem,
  message = "your message will display here",
  color = "black"
) => {
  elem.style.color = color;
  elem.innerText = message;
  return "done";
};

//Function that prevent default (it's a utlity to avoid code repeatation)
const preventDefaults = function (e) {
  e.preventDefault();
  e.stopPropagation();
};

//To add multiple classes to an elem
const classAdder = (elem, ...classes) => {
  const classListArr = [...classes];
  classListArr.forEach((className) => {
    elem.classList.add(className);
  });
};

//To remove multiple classes to an elem
const classRemover = (elem, ...classes) => {
  const classListArr = [...classes];
  classListArr.forEach((className) => {
    elem.classList.remove(className);
  });
};

//To get current page's url's sepcefic parameter 
function getParamFromUrl(paramName) {
  const searchParams = new URLSearchParams(window.location.search);
  const paramValue = searchParams.get(paramName);
  return paramValue;
}

//To set current page's url's sepcefic parameter
function setParamInUrl(paramName, paramValue) {
  const url = new URL(window.location.href);
  url.searchParams.set(paramName, paramValue);
  window.history.replaceState(null, null, url);
}


export {
  renderMessage,
  getParamFromUrl,
  setParamInUrl,
  getFormattedDate,
  removeLoader,
  addLoader,
  showAlert,
  showNotification,
  preventDefaults,
  classAdder,
  classRemover,
  showConfirmationDialog,
};