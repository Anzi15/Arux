"use strict";

// getting elements form dom 
const navToggleBtn = document.querySelectorAll('[data-nav-toggler]');
const mobNav = document.getElementById('mob-nav-links');
const dark_overlay = document.getElementById('dark-overlay');

// functions 
const classToggler = (elem, ...classlist)=>{
    const elemArr = [elem]
    elemArr.forEach((element) =>{
        classlist.forEach(Class =>{
            element.classList.toggle(Class)
        })
    })
}

// adding event listners 
navToggleBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        classToggler(mobNav,"none")
    })
})

