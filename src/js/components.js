// getting elements form dom 
const navToggleBtn = document.querySelectorAll('[data-nav-toggler]');

const meow= document.getElementById('nav');

console.log(``,navToggleBtn)

// functions 
const classToggler = (elemArr, ...classlist)=>{
    elemArr.forEach(element => {
        classlist.forEach(Class =>{
            element.classList.toggle(Class)
        })
    });
}

classToggler([...navToggleBtn],"meow")