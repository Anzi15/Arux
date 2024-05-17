//essential imports
import {
    getAllFirestoreDocuments,
    getAllFirestoreDocumentsSorted,
    getListOfFirestoreDocs,
    showNotification
} from './admin-modules';
import {addProductToDom, removeCertainClassedElemsFromDom} from './client_side-modules';

//variables
const products_con = document.getElementById('products-con');
const sortingMenu = document.getElementById('sortingOptionsCon');
const sortingOptions = sortingMenu.querySelectorAll("option");

//*Functions
async function sortProductsByRecentlyAdded(){
    const allProducts = await getAllFirestoreDocumentsSorted("Products","title","asc");
    allProducts
    if(allProducts.length){
        removeCertainClassedElemsFromDom(products_con, "placeolder-products");

        allProducts.forEach((product)=>{
            addProductToDom(products_con,product.data(), product.id)
        })
    }else{
        showNotification("error","You're having internet issues","Check your internet connection and retry");
    }
}

async function sortProductsByPrice(order){

    const allProducts = await getAllFirestoreDocumentsSorted("Products","price",order);
    allProducts
    if(allProducts.length){
        removeCertainClassedElemsFromDom(products_con, "placeolder-products");

        allProducts.forEach((product)=>{
            addProductToDom(products_con,product.data(), product.id)
        })
    }else{
        showNotification("error","You're having internet issues","Check your internet connection and retry");
    }
}

async function addSkeletonProducts(){
    products_con.innerHTML=""
    for (let i=0; i<12; i++){
        products_con.innerHTML += ` <div class="skeleton-loading Product-card placeolder-products">          
        </div>
        `
    }
}

//*EventListners
sortingMenu.addEventListener("change", async (e) => {
    await addSkeletonProducts()

    const selectedValue = e.target.value;
    if(selectedValue == "Recently added") sortProductsByRecentlyAdded()
        else if(selectedValue == "Price high to low") sortProductsByPrice("desc")
            else sortProductsByPrice("asc")
});

sortProductsByRecentlyAdded()