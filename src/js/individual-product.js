'use strict';

//*essential imports

//*variables and dom elements
const quantityInpElem = document.getElementById('quantityInpElem');
const quantitySubtractBtn = document.getElementById('subtractBtn');
const quantityPlusBtn = document.getElementById('plusBtn');

//*functions

//*eventlistners
quantityPlusBtn.onclick = ()=>{quantityInpElem.value++}
quantitySubtractBtn.onclick = ()=>{
    quantityInpElem.value < 2 ? quantityInpElem.value=1 : quantityInpElem.value--
}