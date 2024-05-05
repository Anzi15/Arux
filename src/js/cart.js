//*essential imports
import {getFewFirestoreDocs} from './admin-modules';
import {addProductToDom, removeCertainClassedElemsFromDom} from './client_side-modules'

//*dom elems and variables
const cartItems = localStorage.getItem("cart");
const cartIsEmpty = cartItems == null ? true : false;

const emptyCartElem = document.getElementById('empty-cart');
const nonEmptyCartElem = document.getElementById('non-empty-cart');

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
    nonEmptyCartElem.classList.remove("none")
};

//*event listners
cartIsEmpty ? handleEmptyCart() : handleNonEmptyCart()
// handleEmptyCart()