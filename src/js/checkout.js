'use strict';
//*esential imports
import {getFirestoreDocument, getListOfFirestoreDocs, showAlert, showNotification} from './admin-modules'
import {getParamFromUrl} from './general-modules'
import {removeCertainClassedElemsFromDom} from './client_side-modules';
import {storeObjToDB} from './admin-modules';
import { doc } from 'firebase/firestore';

//*varibales and elements
const srcParam = getParamFromUrl("src");
const quantityParam = getParamFromUrl("quantity") == null ? 0 : getParamFromUrl("quantity")
let checkoutProducts = [];
let subTotal = 0;

//dom elements
const orderSummaryTogglerBtn = document.getElementById('small-mob-visibilty-toggler-for-order-summary');
const checkoutFormElem = document.getElementById('checkoutFormElem');
const orderSummaryContent = document.getElementById('order-summary-content');
const productsCon = document.getElementById('products_con');
const totalPricesIndicators = {
  shippingFees: document.getElementById('product-summary-shippingFees-elem'),
  subTotal: document.getElementById('product-summary-subtotal-elem'),
  total: document.getElementById('product-summary-total-elem'),
  smallMobTotal: document.getElementById('small-mob-price-total-elem')
}
const productSummaryTotalElem = document.getElementById('product-summary-total-elem');
const productSummarySubtotalElem = document.getElementById('product-summary-subtotal-elem');
const productSummaryShippingFeesElem = document.getElementById('product-summary-shippingFees-elem');

//*Functions
(()=>{
    if(srcParam == "cart") handleCartCheckout()
        else handleSingleProductCheckout()
})();

function addProductToDisplay (product, productQuantity){
    productsCon.innerHTML += `<div class="product">
    <div class="product-info">
      <div class="img-con">
        <img
          src="${product.primary_img}"
          alt="${product.title}"
          class="skeleton-loading"
        />

        <span id="quantity" class="quantity-dot-indicator">${productQuantity}</span>
      </div>
      <p class="product-title">${product.title}</p>
    </div>
    <div class="product-price">
      <p class="">Rs. ${product.price}</p>
    </div>
  </div>`;
  subTotal = subTotal+product.price*productQuantity
}

async function handleSingleProductCheckout(){
  const product = await getFirestoreDocument("Products", srcParam);
  removeCertainClassedElemsFromDom(productsCon, "placeholder-prodcuts");
  addProductToDisplay(product, quantityParam);
  const productObj = {};
  productObj[srcParam] = quantityParam;
  checkoutProducts.push(productObj)
};

async function handleCartCheckout() {
    const cartItems = JSON.parse(localStorage.getItem("cart"));

    if(cartItems == null || cartItems.length==0)location.replace("../cart");
    
    const productIds = cartItems.map((item) => item.productId);

    const fetchedCartItems = await getListOfFirestoreDocs("Products",productIds);
    removeCertainClassedElemsFromDom(productsCon, "placeholder-prodcuts");
    fetchedCartItems.forEach(item =>{
        addProductToDisplay(item.data, cartItems[fetchedCartItems.indexOf(item)].quantity);

        const productObj = {};
        productObj[item.id] = cartItems[fetchedCartItems.indexOf(item)].quantity;
      
        checkoutProducts.push(productObj)
    })
};

const handleSubmission = async (e)=>{
    checkoutFormElem.submit.innerHTML = `<img src="https://i.gifer.com/ZKZg.gif">`
    const allFeildElems = [...checkoutFormElem.querySelectorAll("[data-fieldName]")];
    let dataValueObj = {};
    allFeildElems.forEach(field =>{
      const fieldName = field.dataset.fieldname;
      const fieldValue = field.value;
      dataValueObj[fieldName] = fieldValue;
    })
    dataValueObj.products = checkoutProducts;
    dataValueObj.quantity = quantityParam
    const storingTask = await storeObjToDB("orders", dataValueObj);
    if(srcParam == "cart") localStorage.removeItem("cart")
    if(storingTask !== "error") showAlert("success","Order Confirmed", "Your order is on it's way 🚛!", "Continue shopping")
      .then(alert =>{
        if(alert.isConfirmed) window.location.replace("../products")
      })
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
});

(async ()=>{
  const shippingFees =  await getFirestoreDocument("storeManagement","shippingFees")
  const prices = {
    subTotal,
    shippingFees: shippingFees.value,
    total: subTotal+shippingFees.value,
    smallMobTotal: subTotal+shippingFees.value
  }

  for(const field in totalPricesIndicators){
    totalPricesIndicators[field].innerHTML = `Rs. ${prices[field]}`;
    totalPricesIndicators[field].classList.remove("skeleton-loading")
  }
})()

//*Debugging
