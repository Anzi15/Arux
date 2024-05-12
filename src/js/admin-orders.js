"use strict";
//*Essential Imports
import {getAllFirestoreDocuments} from './admin-modules.js';

//*Variables and Dom elems
const orderCon = document.getElementById('orders-wrapper');

//*Functions
(async ()=>{
    const allProducts = await getAllFirestoreDocuments("orders");
    console.log("mew")
    console.log(allProducts)
    allProducts.forEach(product =>{
        console.log(product.data())
    })
})();

function addOrderToDom(orderData, orderId){
    orderCon.innerHTML += `<a href="/preview?id=${orderId}" class="order">
    <p class="order-number order-column">${orderData.orderNumber}</p>
    <p class="order-date order-column">${orderData.date}</p>
    <p class="order-customer order-column">${orderData.name}</p>
    <p class="order-total order-column">Rs. ${orderCon.total}</p>
    <div class="order-status order-column">
      <p class="${orderStatus} orderIndicator">${orderStatus}</p>
    </div>
    <p class="order-items order-column">${orderData.products.length}</p>
  </a>`
}