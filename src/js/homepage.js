'use strict';
import {getFewFirestoreDocs, showAlert} from './admin-modules';

//getting elems from dom
const topProductsCon = document.getElementById('top-products-con');


(async () => {
    if(window.navigator.onLine){

        const allProducts = await getFewFirestoreDocs("Products",4);
        
        removeCertainClassedElemsFromDom(topProductsCon,"placeolder-products")
        for (const product of allProducts) {
            addProductToDom(topProductsCon, product.data);
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
                    <img loading="lazy" class="skeleton-loading" src="${product.primary_img}" alt="${product.title}">
                    <h4>${product.title}</h4>
                    <div class="prices">
                        Rs.${product.price}
                        <p class="price-compared">$2000</p>
                    </div>
    </a>`
}

function removeCertainClassedElemsFromDom(elemCon, elemClass){
    const allElems = elemCon.querySelectorAll(`.${elemClass}`);

    allElems.forEach((elem)=>{
        elem.remove()
    }) 
}