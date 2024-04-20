"use strict";

import {storeObjToDB, checkFieldValueExistsInDB} from "./admin-modules";

// getting elements form dom 
const navToggleBtn = document.querySelectorAll('[data-nav-toggler]');
const mobNav = document.getElementById('mob-nav-links');
const dark_overlay = document.getElementById('dark-overlay');
const emailNewsletterForm = document.getElementById('email-newsletter-form-submission-form');

// functions 
const classToggler = (elem, ...classlist)=>{
    const elemArr = [elem]
    elemArr.forEach((element) =>{
        classlist.forEach(Class =>{
            element.classList.toggle(Class)
        })
    })
};

// adding event listners 
(()=>{
    navToggleBtn.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            classToggler(mobNav,"none")
        })
    })
})();
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
        const storeTask = await storeObjToDB("newsletter-subscribers",{email: emailFeildValue});
    }

    return false;
})