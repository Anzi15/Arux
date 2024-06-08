"use strict";

import {
  createDocumentInFirestore,
  checkFieldValueExistsInDB,
  getFirestoreDocument,
} from "./firebase-modules";

// getting elements form dom
const navToggleBtn = document.querySelectorAll("[data-nav-toggler]");
const mobNav = document.getElementById("mob-only-nav");
const emailNewsletterForm = document.getElementById(
  "email-newsletter-form-submission-form"
);
const notificationArea = document.getElementById("notificationAreaElem");

// *functions
(() => {
    loadNotificationMsg();
    addChatWidgetToScreen();
})();

async function loadNotificationMsg(){
    const cachedCurrentNotification = JSON.parse(sessionStorage.getItem("currentNotification"));
    console.log(cachedCurrentNotification)
    let currentNotification;
    console.log(cachedCurrentNotification == null)
  if (cachedCurrentNotification == null) {
    currentNotification = await getFirestoreDocument(
      "storeManagement",
      "headerNotificationMsg"
    );
    sessionStorage.setItem("currentNotification",JSON.stringify(currentNotification))
    console.log(currentNotification)
  }
  notificationArea.innerText = currentNotification.value;
  notificationArea.classList.remove("skeleton-loading");
}

function addChatWidgetToScreen(){
    const scriptTag = document.createElement("script");
    scriptTag.src = `//code.tidio.co/p3qqxdbdzoabeqjypszdubgqfmkljtb8.js`
    scriptTag.async = true
    document.body.appendChild(scriptTag)
}


const classToggler = (elem, ...classlist) => {
  const elemArr = [elem];
  elemArr.forEach((element) => {
    classlist.forEach((Class) => {
      element.classList.toggle(Class);
    });
  });
};

emailNewsletterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const emailFeildValue = e.target.email.value;
  e.target.email.value = "Thanks for submitting!";
  setTimeout(() => {
    e.target.email.value = "";
  }, 8000);
  const emailExist = await checkFieldValueExistsInDB(
    "newsletter-subscribers",
    "email",
    emailFeildValue
  );

  if (!emailExist) {
    createDocumentInFirestore("newsletter-subscribers", {
      email: emailFeildValue,
    });
  }

  return false;
});
//*event listners
(() => {
  navToggleBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      classToggler(mobNav, "closed");
    });
  });
})();
