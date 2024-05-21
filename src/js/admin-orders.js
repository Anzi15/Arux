"use strict";
//*Essential Imports
import {getAllFirestoreDocuments, searchFiretoreDocsBySpecificField} from "./firebase-modules.js";
import {removeCertainClassedElemsFromDom} from "./client_side-modules.js"

//*Variables and Dom elems
const orderCon = document.getElementById('orders-wrapper');
const orderSearchBox = document.getElementById('orderSearchBox');
let tempString = '';

//*Functions
async function loadAllOrders (){
  const allProducts = await getAllFirestoreDocuments("orders");
    
  removeCertainClassedElemsFromDom(orderCon, "placeholder-orders")
  allProducts.forEach(product =>{
    addOrderToDom(product.data(), product.id)
  })
}

function addOrderToDom(orderData, orderId){
    orderCon.innerHTML += `<a href="/admin/orders/preview?id=${orderData.orderCode}" class="order">
    <p class="order-number order-column">#${orderData.orderCode}</p>
    <p class="order-date order-column">${orderData.date}</p>
    <p class="order-customer order-column">${orderData.name}</p>
    <p class="order-total order-column">Rs. ${orderData.total}</p>
    <div class="order-${orderData.status} order-column">
      <p class="${orderData.status} orderIndicator">${orderData.status}</p>
    </div>
    <p class="order-items order-column">${orderData.itemsNumber}</p>
  </a>`
}
const searchProducts = async (searchQuery)=>{
  orderCon.innerHTML=""
  let query = "";
  searchQuery.includes("#") ? query = searchQuery.split("#")[1] : query = searchQuery;
  orderCon.innerHTML=""
  if(query.trim()!=='') {
    const fetchQuery = await searchFiretoreDocsBySpecificField("orders","orderCode",query)
    console.log(fetchQuery)

    if(fetchQuery.length){
      orderCon.innerHTML=''
      fetchQuery.forEach(item =>{
        addOrderToDom(item.data, item.id)
      })
      
    }
    else if(!fetchQuery.length){
      orderCon.innerHTML=""
      orderCon.innerHTML = `<div class="order-wrapper ">
            <div class="order noOrdersFound">
              <h3>No Products found</h3>
            </div>
          </div>`
    }
  }else{
    orderCon.innerHTML=''
    loadAllOrders()
  }
}

//*EventListners
orderSearchBox.addEventListener("input",(e)=>{
  searchProducts(e.target.value)
})

//*other
loadAllOrders()