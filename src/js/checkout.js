'use strict';
//*esential imports
import {getListOfFirestoreDocs} from './admin-modules'
import {getParamFromUrl} from './general-modules'
import {removeCertainClassedElemsFromDom} from './client_side-modules'

//*varibales and elements
const checkoutFormElem = document.getElementById('checkoutFormElem');
const srcParam = getParamFromUrl("src");
const orderSummaryTogglerBtn = document.getElementById('small-mob-visibilty-toggler-for-order-summary');
const orderSummaryContent = document.getElementById('order-summary-content');
const productsCon = document.getElementById('products_con');

//*Functions
(()=>{
    if(srcParam == "cart") handleCartCheckout()
        else handleSingleProductCheckout()
})();

const addProductToDisplay = (product, productQuantity)=>{
    const p = product.data;
    productsCon.innerHTML += `<div class="product">
    <div class="product-info">
      <div class="img-con">
        <img
          src="${p.primary_img}"
          alt="${p.title}"
          class="skeleton-loading"
        />

        <span id="quantity" class="quantity-dot-indicator">${productQuantity}</span>
      </div>
      <p class="product-title">${p.title}</p>
    </div>
    <div class="product-price">
      <p class="">${p.price}</p>
    </div>
  </div>`
}

function handleSingleProductCheckout(){

}
async function handleCartCheckout() {
    const cartItems = JSON.parse(localStorage.getItem("cart"));

    if(cartItems == null || cartItems.length==0)location.replace("../cart");
    
    const productIds = cartItems.map((item) => item.productId);

    const fetchedCartItems = await getListOfFirestoreDocs("Products",productIds);
    removeCertainClassedElemsFromDom(productsCon, "placeholder-prodcuts");
    fetchedCartItems.forEach(item =>{
        addProductToDisplay(item, cartItems[fetchedCartItems.indexOf(item)].quantity)
        
    })
};

const handleSubmission = (e)=>{
    const allFeildElems = [...checkoutFormElem.querySelectorAll("[data-fieldName]")];
    let dataValueObj = {};
    allFeildElems.forEach(field =>{
        const fieldName = field.dataset.fieldname;
        const fieldValue = field.value;
        dataValueObj[fieldName] = fieldValue;
    })
    console.log(dataValueObj)
};


//*EventListners
checkoutFormElem.addEventListener("submit",(e)=>{
    e.preventDefault();
    handleSubmission(e)
});

orderSummaryTogglerBtn.addEventListener("click",(e)=>{
    if(orderSummaryContent.classList.contains("folded")){
        //* Showing content
        orderSummaryContent.style.display="block";
        orderSummaryContent.classList.remove("folded");

        //* Changing the button content for indication
        orderSummaryTogglerBtn.innerHTML = `Hide order summary
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
</svg>`
    }else{
        orderSummaryContent.style.display="none";
        orderSummaryContent.classList.add("folded")
        orderSummaryTogglerBtn.innerHTML = `Show order summary
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
        }else{
        /></svg>`

    }
})

//*Debugging
