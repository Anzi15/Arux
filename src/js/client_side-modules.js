'use strict';

function addProductToDom(elem, product, productId="demo_id"){
    elem.innerHTML += 
    `
    <a class="Product-card" href="/Product?id='${productId}'" role="not-link">
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


export {
    addProductToDom,
    removeCertainClassedElemsFromDom
}