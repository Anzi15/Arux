// getting elements form dom 
const navToggleBtn = document.querySelectorAll('[data-nav-toggler]');
const mobNav = document.getElementById('mob-nav-links');

// functions 
const classToggler = (elem, ...classlist)=>{
    classlist.forEach(Class =>{
        elem.classList.toggle(Class)
    })
}

// adding event listners 
navToggleBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        classToggler(mobNav,"none")
    })
})