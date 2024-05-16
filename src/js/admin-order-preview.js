'use strict';
import { config } from 'webpack';
//*Essential imports
import {searchFiretoreDocsBySpecificField} from './admin-modules.js'
import {getParamFromUrl} from './general-modules.js';

//*Variables
const orderId = getParamFromUrl("id");
const fetchedOrderDetails = await searchFiretoreDocsBySpecificField("orders","orderCode",orderId);
const orderDetails = fetchedOrderDetails[0];
const allInfoFields = document.querySelectorAll('[data-fieldName]');

(()=>{
    allInfoFields.forEach(field =>{
        const fieldName = field.dataset.fieldname;
        console.log(fieldName)
        field.innerHTML = orderDetails[fieldName]
        field.classList.remove("skeleton-loading")
        console.log(orderDetails)
    })
})()

let meow = {
    "city": "lakhi ghulam shah",
    "phoneNumber": "+923248226367",
    "itemsNumber": 1,
    "name": "Ruqsana Begum",
    "streetAdress": "district shikarapur",
    "orderCode": "A3S7Z",
    "total": 633,
    "email": "djam4343@gmail.com",
    "status": "pending",
    "subTotal": 333,
    "additonalAdress": "district shikarapur",
    "date": "16/05/2024",
    "products": [
        {
            "cTzRuGYv5hbhYyI4CXvH": "1"
        }
    ],
    "paymentMethod": "JazzCash"
}