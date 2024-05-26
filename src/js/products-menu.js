'use strict';
//*Essential imports
import {
    showNotification, getParamFromUrl
} from "./utility-modules";
import { getAllFirestoreDocumentsSorted, getFirestoreDocument} from "./firebase-modules"
import {addProductToDom, removeCertainClassedElemsFromDom} from "./client_side-modules";
import { collection } from "firebase/firestore";

//*Variables
const products_con = document.getElementById('products-con');
const sortingMenu = document.getElementById('sortingOptionsCon');
const collectionMenu = document.getElementById('collectionMenuCon');

const selectedCollection = getParamFromUrl("collection");
const collectionName = selectedCollection == null ? "Products" : selectedCollection

//*Functions

//To get the recently added products
async function sortProductsByRecentlyAdded(){
    const allProducts = await getAllFirestoreDocumentsSorted(collectionName,"title","asc");
    allProducts
    if(allProducts.length){
        removeCertainClassedElemsFromDom(products_con, "placeolder-products");

        allProducts.forEach((product)=>{
            addProductToDom(products_con,product.data(), product.id, collectionName)
        })
    }else{
        showNotification("error","You're having internet issues","Check your internet connection and retry");
    }
}
//To get products sorted according to selected order
async function sortProductsByPrice(order){
    const allProducts = await getAllFirestoreDocumentsSorted(collectionName,"price",order);
    allProducts
    if(allProducts.length){
        removeCertainClassedElemsFromDom(products_con, "placeolder-products");

        allProducts.forEach((product)=>{
            addProductToDom(products_con,product.data(), product.id)
        })
    }else{
        showNotification("error","You're having internet issues","Check your internet connection and retry");
    }
}

//To load All collections
async function loadAllCollection(){
    const allCollectionsName = await getFirestoreDocument("storeManagement","allCollectionNames");
    allCollectionsName.array.forEach(collection =>{
        collectionMenu.innerHTML += ` <option value="${collection}">${collection}</option>`
    })
}

//To add skeleon products
async function addSkeletonProducts(){
    products_con.innerHTML=""
    for (let i=0; i<12; i++){
        products_con.innerHTML += ` <div class="skeleton-loading Product-card placeolder-products">          
        </div>
        `
    }
}

//*EventListners
//to handle product sorting, changes
sortingMenu.addEventListener("change", async (e) => {
    await addSkeletonProducts()

    const selectedValue = e.target.value;
    if(selectedValue == "Recently added") sortProductsByRecentlyAdded()
        else if(selectedValue == "Price high to low") sortProductsByPrice("desc")
            else sortProductsByPrice("asc")
});
collectionMenu.addEventListener("change", async (e) => {
    await addSkeletonProducts()
    const selectedValue = e.target.value;
    window.location.replace(`../products?collection=${selectedValue}`)
});

sortProductsByRecentlyAdded()
loadAllCollection()