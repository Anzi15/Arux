'use strict';
//*esential imports

//*varibales and elements
const checkoutFormElem = document.getElementById('checkoutFormElem');

//*Functions
const allFeildElems = checkoutFormElem.querySelectorAll("[data-feildName]")
console.log(allFeildElems)
const handleCheckout = (e)=>{
}

//*EventListners
checkoutFormElem.addEventListener("submit",(e)=>{
    e.preventDefault();
    handleCheckout(e)
})

//*Debugging