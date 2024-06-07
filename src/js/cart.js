//*essential imports
import {getListOfFirestoreDocs, getFewFirestoreDocs, getFirestoreDocument} from "./firebase-modules";
import {addProductToDom, removeCertainClassedElemsFromDom} from "./client_side-modules";

//*dom elems and variables
let cartItems = JSON.parse(localStorage.getItem("cart"));

const cartIsEmpty = cartItems == null || cartItems.length == 0 ? true : false;

const emptyCartElem = document.getElementById('empty-cart');
const nonEmptyCartElem = document.getElementById('non-empty-cart');
const cartItemsCon = document.getElementById('cart-items-con');
const cartTotalElem = document.getElementById('cart-total-items-value-display-elem');
let deleteProductBtn = [];
let quantityElems = [];

//*functions
const handleEmptyCart = async ()=>{
    emptyCartElem.classList.remove("none");
    const recomendedProductCon = document.getElementById('recomended-products-con');
    const recomendedProduct = await getFewFirestoreDocs("Products",4);
    removeCertainClassedElemsFromDom(recomendedProductCon, "placeolder-products");
    recomendedProduct.forEach(product => {
        addProductToDom(recomendedProductCon,product.data, product.id);
    })
};

const handleNonEmptyCart = ()=>{
    nonEmptyCartElem.classList.remove("none");
    loadCartItems()
};

async function loadCartItems() {
    // Fetch all items concurrently
    const fetchPromises = cartItems.map(async item => {
        const fetchedItem = await getFirestoreDocument(item.collectionName, item.productId);
        return { id: item.productId, fetchedItem, quantity: item.quantity };
    });

    // Wait for all fetches to complete
    const fetchedItems = await Promise.all(fetchPromises);

    // Load items into the DOM
    fetchedItems.forEach(item => {
        loadItemInDom(item.id, item.fetchedItem, item.quantity);
    });

    // Remove placeholder items and setup event listeners
    removeCertainClassedElemsFromDom(cartItemsCon, "placeholder-items");

    deleteProductBtn = [...cartItemsCon.querySelectorAll(".remove-product-btn")];
    quantityElems = [...cartItemsCon.querySelectorAll(".item-quantity-elem")];

    deleteProductBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            removeCartItem(btn.getAttribute("data-itemID"));
        });
    });

    
    // Calculate total cart value
    totalCartValueCounter();
    quantityElems.forEach(elem => {
        elem.addEventListener("input",(e)=>{
            totalCartValueCounter();
            const productId = e.target.dataset.productid;
            const newQuantity = e.target.value;
            for (let item of cartItems) {
                if (item.productId === productId) {
                    item.quantity = newQuantity;
                    break;
                }
            }
            localStorage.setItem("cart",JSON.stringify(cartItems))
        });
    });
}


function loadItemInDom(itemId,itemData, itemQuantity){
    cartItemsCon.innerHTML += `<div class="cart-item" id="item-id-${itemId}">
    
    <div class="cart-item-section product-details-section">
        <div class="product-img-con">
            <button class="remove-product-btn" data-itemID="${itemId}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
            </button>
            <img src="${itemData.primary_img}" alt="${itemData.title}" class="product-img skeleton-loading">
        </div>
            <div class="product-context">
            ${itemData.title}
                <p class="product-price small-screen-cart-item"> Rs.
                ${itemData.price}
                </p>
            </div>

    </div>

    <div class="cart-item-section price-section large-screen-cart-item-section">
        <p class="cart-item-price">Rs.${itemData.price}</p>
    </div>

    <div class="cart-item-section quantity-section">
        <input type="number" class="item-quantity-elem" value="${itemQuantity}" data-productid="${itemId}" onchange="this.value <= 0 ? this.value = 1 : 'meow'; ">
    </div>

    <div class="cart-item-section subtotal-section large-screen-cart-item-section" >${itemData.price}</div>
    </div>`
};

const removeCartItem = (itemId)=>{
    const cartItemElem = document.getElementById(`item-id-${itemId}`);
    cartItemElem.remove();
    let allCartItems = JSON.parse(localStorage.getItem("cart"));

    allCartItems = allCartItems.filter(item => item.productId
        !== itemId)

    localStorage.setItem("cart",JSON.stringify(allCartItems));
    totalCartValueCounter()
    if(allCartItems.length==0) window.location.reload()
};

const totalCartValueCounter = ()=>{
    const allPriceElems = [...cartItemsCon.querySelectorAll(".cart-item-price")];
    const allQuantityElems = [...cartItemsCon.querySelectorAll(".item-quantity-elem")];
    
    let totalPrice = 0;
    let i=0;

    allPriceElems.forEach(elem =>{
        const elemValue = parseInt(elem.innerHTML.split(".")[1]);
        const elemQuantity = parseInt(allQuantityElems[i].value);
        
        totalPrice = totalPrice + elemValue*elemQuantity;
        i++
    });

    cartTotalElem.innerHTML = `Rs. ${totalPrice}`;
    cartTotalElem.classList.remove("skeleton-loading")
};


cartIsEmpty ? handleEmptyCart() : handleNonEmptyCart();