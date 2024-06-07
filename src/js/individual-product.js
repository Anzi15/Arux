'use strict';

//*essential imports
import {showNotification, getParamFromUrl} from "./utility-modules";

import {
    getFirestoreDocument, 
    getFewFirestoreDocs} from "./firebase-modules"
import {addProductToDom, removeCertainClassedElemsFromDom} from "./client_side-modules";

//*variables and dom elements

//Elems
const quantityInpElem = document.getElementById('quantityInpElem');
const quantitySubtractBtn = document.getElementById('subtractBtn');
const quantityPlusBtn = document.getElementById('plusBtn');
const recomendedProductsCon = document.getElementById('recomended-products-con');
const productNavTreeProductName = document.getElementById('product-tree-this-product-name');
const addToCartBtn = document.getElementById('addToCartBtn');
const getNowBtn = document.getElementById('buyNowBtn');

const selectedCollection = getParamFromUrl("collection");
const collectionName = selectedCollection == null ? "Products" : selectedCollection

//varibales
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
//self invoking function to get and add the document to dom (when the page get's rendered)
(async ()=>{
    if(docID ==null || docID == undefined) return;
    productDoc = await getFirestoreDocument(collectionName,docID);

    productNavTreeProductName.innerHTML = productDoc.title;
    productNavTreeProductName.classList.remove("skeleton-loading")

    for(const elem in domDetails){
        domDetails[elem].innerHTML = productDoc[elem];
        
        if(elem == "price"){ domDetails[elem].innerHTML = `Rs. ${productDoc[elem]}`}

        domDetails[elem].classList.remove("skeleton-loading")
    }

    for(const elem in domImgs){
        domImgs[elem].src = productDoc[elem];
        domImgs[elem].alt = productDoc[elem];
    }

    const recomendedProduct = await getFewFirestoreDocs("Products",5);
    let productsAddedToDom = 0;
    recomendedProduct.forEach(product => {
        if(productsAddedToDom<4 && product.data.title !== productDoc.title){
            addProductToDom(recomendedProductsCon,product.data,product.id);
            productsAddedToDom++
        }
    });
    removeCertainClassedElemsFromDom(recomendedProductsCon, "placeolder-products")
})()

//Function to product to cart
const addProductToCart = (productId, quantity, collectionName)=>{
    let currentCart = JSON.parse(localStorage.getItem("cart"));
    if(currentCart == null){
        currentCart = []
    }
    const currentProduct = {productId, quantity, collectionName}

    let itemAlreadyInCart = false;
    let previousItem = null;
    currentCart.forEach(item =>{
        if(item.productId == productId){
            itemAlreadyInCart = true;
            previousItem = item;
        }
    })

    if(!itemAlreadyInCart){
        currentCart.push(currentProduct);

        localStorage.setItem("cart",JSON.stringify(currentCart));
    }else{
        currentCart[currentCart.indexOf(previousItem)].quantity++;

        localStorage.setItem("cart",JSON.stringify(currentCart));
    }
    console.log(localStorage.getItem("cart"))

    showNotification("success","Product added to your cart",6000)
}

//*eventlistners
//to add product quantity
quantityPlusBtn.onclick = ()=>{quantityInpElem.value++}

//to subtract product quantity
quantitySubtractBtn.onclick = ()=>{
    quantityInpElem.value < 2 ? quantityInpElem.value=1 : quantityInpElem.value--
}

//Making imgs interactive by zooming them into the overlay when clicked
for(const elem in domImgs){
    domImgs[elem].parentElement.addEventListener("click",()=>{
        domImgs[elem].parentElement.classList.toggle("overlay-img-preview")
    })
}
//Event listner to handle click on cart btn
addToCartBtn.addEventListener("click",()=>{
    addProductToCart(docID, quantityInpElem.value, collectionName)
})

//Event listner to handle get now btn
getNowBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const url = `../checkout?src=${docID}&collection=${collectionName}&quantity=${quantityInpElem.value}`;
    window.location.href = url;
})