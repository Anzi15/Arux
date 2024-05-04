//*essential imports
import {getFewFirestoreDocs} from './admin-modules';
import {addProductToDom, removeCertainClassedElemsFromDom} from './client_side-modules'

//*dom elems and variables
const cartItems = localStorage.getItem("cartItems");
const cartIsEmpty = cartItems == null ? true : false;

const emptyCartElem = document.getElementById('empty-cart');
const nonEmptyCartElem = document.getElementById('d');

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

};

//*event listners
handleEmptyCart()