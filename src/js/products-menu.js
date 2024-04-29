//essential imports
import {
    getAllFirestoreDocuments,
    showNotification
} from './admin-modules';
import {addProductToDom, removeCertainClassedElemsFromDom} from './client_side-modules';

//variables
const products_con = document.getElementById('products-con');
let lastDocID;

(async ()=>{

    if(window.navigator.onLine){
        const allProducts = await getAllFirestoreDocuments("Products");
        if(allProducts.length){
            removeCertainClassedElemsFromDom(products_con, "placeolder-products");

            allProducts.forEach((product)=>{
                addProductToDom(products_con,product.data(), product.id)
            })
        }else{
            showNotification("error","You're having internet issues","Check your internet connection and retry");
        }
    }else{
        const alerReponse = await showAlert("error","You seem offline","Check your internet connection and retry","Retry");
        if(alerReponse.isConfirmed) {window.location.reload()}
    }
    
})()