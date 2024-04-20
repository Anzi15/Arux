'use strict';
import { prodErrorMap } from 'firebase/auth';
import {getAllFirestoreDocuments, showAlert} from './admin-modules'
import { all } from 'axios';

//getting elems from dom
const topProductsCon = document.getElementById('top-products-con');


(async () => {
    if(window.navigator.onLine){

        const allProducts = await getAllFirestoreDocuments("Products");

        let productAddedToDom = 0;
        
        removeCertainClassedElemsFromCom(topProductsCon,"skeleton-loading")
        for (const product of allProducts.docs) {
            addProductToDom(topProductsCon, product.data());
            productAddedToDom++;
            if (productAddedToDom >= 4) break;
        }
    }else{
        const alerReponse = await showAlert("error","You seem offline","Check your internet connection and retry","Retry");
        if(alerReponse.isConfirmed) {window.location.reload()}
    }

})();

function addProductToDom(elem, product){
    elem.innerHTML += 
    `
    <a class="Product-card" href="#" role="not-link">
                    <div class="discount-label">-20%</div>
                    <img src="${product.primary_img}" alt="${product.title}">
                    <h4>${product.title}</h4>
                    <div class="prices">
                        Rs.${product.price}
                        <p class="price-compared">$2000</p>
                    </div>
    </a>`
}

function removeCertainClassedElemsFromCom(elemCon, elemClass){
    const allElems = elemCon.querySelectorAll(`.${elemClass}`);

    allElems.forEach((elem)=>{
        elem.remove()
    }) 
}