'use strict';
//*esential imports
import {getFirestoreDocument, getListOfFirestoreDocs, createDocumentInFirestore, checkFieldValueExistsInDB, searchFiretoreDocsBySpecificField, } from "./firebase-modules";
import { showAlert, getFormattedDate, getParamFromUrl, showNotification } from "./utility-modules";
import {removeCertainClassedElemsFromDom, generateUniqueCode} from "./client_side-modules";

//*varibales and elements
const srcParam = getParamFromUrl("src");
const quantityParam = getParamFromUrl("quantity") == null ? 1 : getParamFromUrl("quantity")
let checkoutProducts = [];
let cartProductIds;
let subTotal = 0;
let total = 0;
let shippingFees;
let couponDisount = 0;
const date = getFormattedDate()
//dom elements
const orderSummaryTogglerBtn = document.getElementById('small-mob-visibilty-toggler-for-order-summary');
const orderSummaryContent = document.getElementById('order-summary-content');
const productsCon = document.getElementById('products_con');
const totalPricesIndicators = {
  shippingFees: document.getElementById("product-summary-shippingFees-elem"),
  subTotal: document.getElementById("product-summary-subtotal-elem"),
  couponDisount: document.getElementById("product-coupon-discount-elem"),
  total: document.getElementById("product-summary-total-elem"),
  smallMobTotal: document.getElementById("small-mob-price-total-elem"),
};
const checkoutFormElem = document.getElementById('checkoutFormElem');
const paymentMethodsCon = document.getElementById("paymentMethodsCon");
const allPaymentInps = paymentMethodsCon.querySelectorAll(
  'input[type="radio"]'
);
const couponInpForm = document.getElementById('coupon-inp-form');


//*Functions
(()=>{
    if(srcParam == "cart") handleCartCheckout()
      else if(srcParam == "" || srcParam == null) window.location.replace("../")
        else handleSingleProductCheckout()
})();

function addProductToDisplay (product, productQuantity){
  subTotal = subTotal+product.price*productQuantity
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
    
    cartProductIds = cartItems.map((item) => item.productId);

    const fetchedCartItems = await getListOfFirestoreDocs("Products",cartProductIds);
    removeCertainClassedElemsFromDom(productsCon, "placeholder-prodcuts");
    fetchedCartItems.forEach(item =>{
        addProductToDisplay(item.data, cartItems[fetchedCartItems.indexOf(item)].quantity);

        const productObj = {};
        productObj[item.id] = cartItems[fetchedCartItems.indexOf(item)].quantity;
      
        checkoutProducts.push(productObj)
    })
};

async function calculateTotals(){
  const shippingFeesObj =  await getFirestoreDocument("storeManagement","shippingFees");

  shippingFees = shippingFeesObj.value;
  total = shippingFees + subTotal - couponDisount;

  const smallMobTotal = total
  const prices = {
    subTotal,
    shippingFees,
    total,
    smallMobTotal,
    couponDisount,
  }

  for(const field in totalPricesIndicators){
    totalPricesIndicators[field].innerHTML = `Rs. ${prices[field]}`;
    totalPricesIndicators[field].classList.remove("skeleton-loading")
  }

  if(couponDisount){
    totalPricesIndicators.couponDisount.parentElement.classList.remove("none") 
  }
}

const getSelectedPaymentMethod = () => {
  const selectedInput = Array.from(allPaymentInps).find((inp) => inp.checked);
  if (selectedInput) {
    console.log(selectedInput.dataset.paymentmethod);
    return selectedInput.dataset.paymentmethod;
  }
  return null;
};

const handleSubmission = async (e) => {
  checkoutFormElem.submit.innerHTML = `<img src="https://i.gifer.com/origin/13/138f4c87ed9b322952c3e0da2b264938_w200.webp">`;

  const allFeildElems = [
    ...checkoutFormElem.querySelectorAll("[data-fieldName]"),
  ];
  let dataValueObj = {total, date, subTotal, total, shippingFees};
  allFeildElems.forEach((field) => {
    const fieldName = field.dataset.fieldname;
    const fieldValue = field.value;
    dataValueObj[fieldName] = fieldValue;
  });
  dataValueObj.products = checkoutProducts;
  dataValueObj.itemsNumber = checkoutProducts.length;
  dataValueObj.orderCode = await generateUniqueCode("orders","orderNumber");
  dataValueObj.paymentMethod = getSelectedPaymentMethod();
  dataValueObj.status = "pending";

  console.log(dataValueObj)
  const storingTask = await createDocumentInFirestore("orders", dataValueObj);
  if (srcParam == "cart") localStorage.removeItem("cart");
  if (storingTask !== "error")
    showAlert(
      "success",
      "Order Confirmed",
      "Your order is on it's way 🚛!",
      "Continue shopping"
    ).then((alert) => {
      if (alert.isConfirmed) window.location.replace("../products");
    });
};
  
(()=>{
  calculateTotals()
})()


//*EventListners
couponInpForm.addEventListener("submit",async (e)=>{
  e.preventDefault();
  couponInpForm.submitBtn.innerHTML = `Validating..`
  const couponInp = e.target.couponCodeInp;
  const fetchedCoupon = await searchFiretoreDocsBySpecificField("coupons","code",couponInp.value.trim())
  try{
    const isCouponValid = fetchedCoupon[0].data.code == couponInp.value.trim() 
    if(!fetchedCoupon || !fetchedCoupon.length || !isCouponValid) throw new Error("Not a valid coupon");
    couponDisount = fetchedCoupon[0].data.discount;
    calculateTotals();

    showNotification("success","Coupon Applied Sucessfully")
    couponInpForm.innerHTML+=`<div class="applied-overlay"></div>`
    
  }catch(error){
    showNotification("error","Not a valid coupon")
  }
})

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

checkoutFormElem.addEventListener("submit",(e)=>{
  e.preventDefault();
  handleSubmission(e)
});