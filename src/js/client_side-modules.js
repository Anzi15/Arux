'use strict';
//*Esesential imports
import { checkFieldValueExistsInDB } from "./firebase-modules";

function addProductToDom(elem, product, productId="demo_id"){
    elem.innerHTML += 
    `
    <a class="Product-card" href="/Product?id=${productId}" role="not-link">
                    <div class="discount-label ${product.comparedPrice == undefined || isNaN(product.comparedPrice) ? "none" : "meow"}">
                    ${Math.round((product.comparedPrice - product.price) / product.comparedPrice * 100)}%</div>
                    <img loading="lazy" class="skeleton-loading" src="${product.primary_img}" alt="${product.title}">
                    <h4>${product.title}</h4>
                    <div class="prices">
                        Rs.${product.price}
                        <p class="price-compared ${product.comparedPrice == undefined || isNaN(product.comparedPrice) ? "none" : "meow"}">Rs.${product.comparedPrice}</p>
                    </div>
    </a>`
    

}

function removeCertainClassedElemsFromDom(elemCon, elemClass){
    const allElems = elemCon.querySelectorAll(`.${elemClass}`);

    allElems.forEach((elem)=>{
        elem.remove()
    }) 
}
function generateOrderNum() {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
async function generateUniqueCode(collectionName, codeFieldName) {
let uniqueOrderNumber;
do {
    uniqueOrderNumber = generateOrderNum();
} while (
    await checkFieldValueExistsInDB(collectionName, codeFieldName, uniqueOrderNumber)
);
return uniqueOrderNumber;
}

export {
    addProductToDom,
    removeCertainClassedElemsFromDom,
    generateUniqueCode
}