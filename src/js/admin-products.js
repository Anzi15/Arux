"use strict";

//* Esential Imports
import { getAllFirestoreDocuments, deleteDocumentFromFirestore, getFirestoreDocument} from "./firebase-modules"
import { showConfirmationDialog, showNotification, removeLoader, getParamFromUrl} from "./utility-modules";
import Swal from "sweetalert2"

//* Varibles
const productsContainer = document.getElementById('section__products__grid');
const newProductBtn = document.getElementById('newProductBtn');
const addNewCollectionBtn = document.getElementById('addNewCollectionBtn');
const collectionOptionsCon = document.getElementById('collection-options-con');

const selectedCollection = getParamFromUrl("collection");

const collection = selectedCollection == null ? "Products" : selectedCollection
const allProducts = await getAllFirestoreDocuments(collection);

(()=>{
    removeLoader(productsContainer)
    if(allProducts.docs.length){
        allProducts.forEach(product => {
            addProductToDom(productsContainer, product.id, product.data())
        });
    }else{
        productsContainer.innerHTML = `<h3 class"thin-heading empty-collection-msg">Add some products</h3>`
    }

    const productDeleteBtns = productsContainer.querySelectorAll(".product__delete-btn");

    productDeleteBtns.forEach((btn) =>{
        btn.addEventListener("click",(e)=>{
            deleteProduct(btn.dataset.product_id)
        })
    })
    loadAllCollectionNames()
})()

//functions
async function loadAllCollectionNames (){
    const productCollectionDoc = await getFirestoreDocument("storeManagement","allCollectionNames");
    productCollectionDoc.array.forEach(collection=>{
        collectionOptionsCon.innerHTML += `<a href="/admin/products?collection=${collection}" class="option" data-collectionName="${collection}">
        <li>${collection}</li>
      </a>`
    })
}
async function createNewCollection(collectionName){
    Swal.fire({
        title: "Add a document to the collection",
        text: "You must add atLeast a document to create a collection.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancel collection",
        cancelButtonColor: "#d33",
        confirmButtonText: "Add a product"
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "",
                text: "Just a second...",
                buttons: false,
                closeOnClickOutside: false,
                icon: "info",
                showConfirmButton: false,
              });
            window.location.replace(`/admin/products/new?collection=${collectionName}&CollectionType=new`)
        }
      });
}

async function deleteProduct(product_id){
    const confirmAlert = await showConfirmationDialog("warning", "Are you sure to delete this product?", "This can't be un-done, so choose wisely!", "Delete", "Cancel");

    if(confirmAlert.isConfirmed){ 
        const productElemInDom = productsContainer.querySelector(`[product_id="${product_id}"]`);

        if(productElemInDom){
            const deleteTask = await deleteDocumentFromFirestore(collection, product_id);
            if(deleteTask.taskCompleted){
                showNotification("success","Product deleted successfully");
                productElemInDom.remove();
            }else{
                showNotification("error", deleteTask.errorMsg) 
            }
        }
    }
}

//func to insert products into dom
function addProductToDom(elem, product_id, product_Data){
    elem.innerHTML += 
    `
    <div product_id="${product_id}"  class="product" data-product_id="${product_id}">
    <img src="${product_Data.primary_img}" alt="" class="product__img skeleton-loading" loading="lazy">
    <div class="product__content-con">
        <h3 class="product__title">
            ${product_Data.title}
        </h3>
        <div class="product__detail-con">
            <p class="product__price">Rs.${product_Data.price}</p>
            <p class="product__order ${product_Data.comparedPrice == undefined || isNaN(product_Data.comparedPrice) ? "none" : "meow"}">comapred  price: ${product_Data.comparedPrice}</p>
        </div>
        <div class="product__config-con">
            <a href="/admin/Products/edit?product-ID=${product_id}&collection=${collection}" 
            class="product__edit-btn" id="product__edit-btn-${product_id}" data-product_id="${product_id}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </a>

            <button class="product__delete-btn" id="product__delete-btn-${product_id}" data-product_id="${product_id}">
                <svg data-product_id="${product_id}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
            </button>
        </div>
    </div>
</div>
    `
}

//* EventListners
newProductBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.replace(`/admin/products/new?collection=${collection}`)
});

addNewCollectionBtn.addEventListener("click",async (e)=>{
    const collectionName = await Swal.fire({
        title: "Enter a name for new collection",
        input: "text",
        inputLabel: "Collection xyz",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }else{
            createNewCollection(value)
          }
        }
      });
})
