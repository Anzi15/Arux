"use strict";

import {createDocumentInFirestore, checkFieldValueExistsInDB, getFirestoreDocument} from "./firebase-modules";

// getting elements form dom 
const navToggleBtn = document.querySelectorAll('[data-nav-toggler]');
const mobNav = document.getElementById('mob-only-nav');
const emailNewsletterForm = document.getElementById('email-newsletter-form-submission-form');
const notificationArea = document.getElementById('notificationAreaElem');

// *functions 
(async ()=>{
    const currentNotification = await getFirestoreDocument("storeManagement","headerNotificationMsg");
    notificationArea.innerText = currentNotification.value;
    notificationArea.classList.remove("skeleton-loading")
})()
const classToggler = (elem, ...classlist)=>{
    const elemArr = [elem]
    elemArr.forEach((element) =>{
        classlist.forEach(Class =>{
            element.classList.toggle(Class)
        })
    })
};

emailNewsletterForm.addEventListener("submit", async (e)=>{
    e.preventDefault(); 
    e.stopImmediatePropagation();
    const emailFeildValue = e.target.email.value;
    e.target.email.value = "Thanks for submitting!";
    setTimeout(() => {
        e.target.email.value = ""
    }, 8000);
    const emailExist = await checkFieldValueExistsInDB("newsletter-subscribers","email",emailFeildValue)

    if(!emailExist){
        createDocumentInFirestore("newsletter-subscribers",{email: emailFeildValue});
    }

    return false;
});
//*event listners 
(()=>{
    navToggleBtn.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            classToggler(mobNav,"closed")
        })
    });
})();
