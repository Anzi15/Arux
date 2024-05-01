'use strict';

import { doc } from 'firebase/firestore';
//*essential imports
import {
    getFirestoreDocument,
} from './admin-modules';
import {getParamFromUrl} from './general-modules'

//*variables and dom elements
const quantityInpElem = document.getElementById('quantityInpElem');
const quantitySubtractBtn = document.getElementById('subtractBtn');
const quantityPlusBtn = document.getElementById('plusBtn');

let docID = getParamFromUrl("id");
let productDoc;
const domDetails = {
    title: document.getElementById('product-title-elem'),
    price: document.getElementById('product-price-elem'),
    Description: document.getElementById('product-description-elem'),
};
const domImgs = {
    primary_img: document.getElementById('product-primaryImg-elem'),
    secondary_img_1: document.getElementById('product-secImg1-elem'),
    secondary_img_2: document.getElementById('product-secImg2-elem')
};
//*functions
(async ()=>{
    if(docID ==null || docID == undefined) return;
    productDoc = await getFirestoreDocument("Products",docID);
    console.log(productDoc)

    for(const elem in domDetails){
        domDetails[elem].innerHTML = productDoc[elem];
        
        if(elem == "price"){ domDetails[elem].innerHTML = `Rs. ${productDoc[elem]}`}

        domDetails[elem].classList.remove("skeleton-loading")
    }
    for(const elem in domImgs){
        domImgs[elem].src = productDoc[elem];
        domImgs[elem].alt = productDoc[elem];
    }
})()

//*eventlistners
quantityPlusBtn.onclick = ()=>{quantityInpElem.value++}
quantitySubtractBtn.onclick = ()=>{
    quantityInpElem.value < 2 ? quantityInpElem.value=1 : quantityInpElem.value--
}