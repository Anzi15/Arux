//essential imports
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    doc
} from "firebase/firestore";

// getting elems from dom 
const products_con = document.getElementById('section__products__grid');

//my firebas configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtDQsUvkfEiuD-o48LosmunhQ5YzPP94Y",
    authDomain: "arux-24899.firebaseapp.com",
    projectId: "arux-24899",
    storageBucket: "arux-24899.appspot.com",
    messagingSenderId: "95411992302",
    appId: "1:95411992302:web:336d7a38ca931af33225ff",
    measurementId: "G-LXN5WG6V2S"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//reading products from db 
const doc_ref = collection(db, "Products");
const querySnapshot = await getDocs(doc_ref);
querySnapshot.forEach(doc => {
    // inserting each product into the "your product section "
    console.log(``,doc.data())
    addProductToDom(products_con, doc.id, doc.data())
});

//functions

//func to insert products into dom
function addProductToDom(elem, product_id, product_Data){
    elem.innerHTML += 
    `
    <div class="product" data-product_id="${product_id}">
    <img src="${product_Data.primary_img}" alt="" class="product__img">
    <div class="product__content-con">
        <h3 class="product__title">
            ${product_Data.title}
        </h3>
        <div class="product__detail-con">
            <p class="product__price">Rs.${product_Data.price}</p>
            <p class="product__order">Orders: ${product_Data.shipping_fees}</p>
        </div>
        <div class="product__config-con">
            <button class="product__edit-btn" id="product__delete-btn-${product_id}" data-product_id="${product_id}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </button>

            <button class="product__delete-btn-${product_id}" id="product__delete-btn" data-product_id="${product_id}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
            </button>
        </div>
    </div>
</div>
    `
}