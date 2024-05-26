"use-strict";

//*esential imports
import {  getFirestoreDocument, updateFirestoreDocument, uploadImageToFirebase, } from "./firebase-modules.js"
import {getParamFromUrl, preventDefaults, classAdder, classRemover, showConfirmationDialog, addLoader, showNotification, showAlert, removeLoader} from "./utility-modules.js"

//*getting elems from dom 
const primary_image_upload = document.getElementById('primary_image-upload');
const sec1_image_upload = document.getElementById('sec-1_image-upload');
const sec2_image_upload = document.getElementById('sec-2_image-upload');
const formAdditionalInfo = document.querySelector('#formAdditionalInfo');


// * variables, arrays and objects
const imageDropAreas = [primary_image_upload, sec1_image_upload, sec2_image_upload];
let productID = getParamFromUrl("product-ID");
const allFeildElems = {};
const changedElems = {}; 
const changedImgs = {};
const selectedCollection = getParamFromUrl("collection");

const collection = selectedCollection == null ? "Products" : selectedCollection

const toStoreElems = document.querySelectorAll("[data-identification_name]");

// *FUNCTIONS

//to load the product data into it's right fields
(async () => {
  // Loop through the elements to store them in an object
  toStoreElems.forEach((elem) => {
    const feildName = elem.dataset.identification_name;
    allFeildElems[feildName] = elem;
    watchForChanges(elem); //watching elems for changes
  });

  //image elems
  const allImgElems = {
    primary_img : document.getElementById('primary_img'),
    secondary_img_1 : document.getElementById('secondary_img_1'),
    secondary_img_2 : document.getElementById('secondary_img_2'),
  }

  // Retrieve tproductIDhe Firestore document for the specified  in the url parameter
  const productDoc = await getFirestoreDocument(collection, productID);

  removeLoader(document.body)

  // Populate input fields with values from the Firestore document
  //populating img feilda
  for (const fieldName in allImgElems) {
    const imageURL = productDoc[fieldName];
    if (imageURL) {
      allImgElems[fieldName].src = imageURL;
    }
  }
  for (const fieldName in allFeildElems) {
    const fieldValue = productDoc[fieldName];

    if (fieldValue) {
      allFeildElems[fieldName].value = fieldValue;
    }
  }
})();

//set of functions to manage image drap and drop functionality
(()=>{
  // to handle files 
  const handleFiles = function(files, dropArea){
    ([...files]).forEach(file => {
      previewFile(file, dropArea)
    });
  }

  // once something is dropped 
  const handleDrop = function(e, area){
    const data = e.dataTransfer;
    const files = data.files
    handleFiles(files, area)
  }

  //previwing file before uploading them
  const previewFile = function(file, dropArea){
    // elems the need to be hiden when preview img is displayed
    const hidePreviewElem = dropArea.querySelectorAll('[data-hideOnImagePreview]');
    // elems the need to be visible when preview img is displayed
    const showPreviewElem = dropArea.querySelectorAll('[data-showOnImagePreview]');
    //hiding those elems
    hidePreviewElem.forEach((elem)=>{
      elem.classList.add('hidden')
    })
    //make visible those elems
    showPreviewElem.forEach((elem)=>{
      elem.classList.remove('hidden')
    })
    //  elem where img will be displayed 
    const previewDisplay = dropArea.querySelector('.preview-img')
    const inpt_elem = dropArea.querySelector('.input_file');
    //reading the file using filereader api to display it
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function(){
        previewDisplay.src = reader.result;
        // to check latter whether the elem is empty or not
        changedImgs[previewDisplay.id] = previewDisplay.src  
        console.log(changedImgs)

        inpt_elem.setAttribute("data-role_fullfilled","true")
        inpt_elem.dataset.role_fullfilled = 'true';
      }
  }

  //image dropArea to upload images
  imageDropAreas.forEach((area)=>{
    // events 
    const preventDefaultEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];
    const highlightEvents = ['dragenter', 'dragover'];
    const unHighlightEvents = ['dragleave', 'drop'];

    //preventing defaults
    preventDefaultEvents.forEach(event => {
      area.addEventListener(event, preventDefaults)
    });

    // highlighting 
    highlightEvents.forEach(event => {
      area.addEventListener(event, ()=>{
        classAdder(area, "highlight")
      })
    })
    // unhighlighting
    unHighlightEvents.forEach(event =>{
      area.addEventListener(event, ()=>{
        classRemover(area, "highlight")
      })
    }) 

    // once something is dropped
    area.addEventListener('drop', (e)=>{
      handleDrop(e,area)
    }, false)

    //removing img (cancel) btn eventlistners
    area.addEventListener('click',()=>{
      area.querySelector('.input_file').click()
    })

    //on any chnage (inp upload mainly)
    area.addEventListener("change",(e)=>{
      if (e.target.files[0]) {
          previewFile(e.target.files[0], area)
      }
  })
  })
})();
"use strict";

const saveChanges = async ()=>{
  addLoader(document.body, true)
  const allUpdatedFeilds = {
    ...changedElems
  };
  if(Object.keys(changedImgs).length){
    for(const img in changedImgs){
      try {
        const uploadTask = await uploadImageToFirebase(changedImgs[img]);
        if(uploadTask == "error"){
          throw new Error("Upload task failed");
        }else{
          allUpdatedFeilds[img] = uploadTask
        }
      } catch (error) {
        showConfirmationDialog("error","Error uploading imgaes", "Check your internet and try again","Refresh page","Keep waiting (not recomended)").then(dialog=>{
          if(dialog.isConfirmed){
            window.location.reload();
          }
        })
        
      }
      
      console.log()
    }
  }
  const updateTask = await updateFirestoreDocument(collection, productID, allUpdatedFeilds);
}
showAlert("success","Changes saved","The product has been updated successfully","Go to product dashboard")
.then(response => {
  if(response.isConfirmed){
    window.location.replace(`/admin/products?collection=${collection}`)
  }
})

//*Event listners
//watching elem for changes
function watchForChanges(elem){
  elem.addEventListener("change",(e)=>{
    const feildName = elem.dataset.identification_name;
    e.preventDefaultEvents;
    if(elem.value.trim() !== ""){
      changedElems[feildName] = elem.value;
    }
  })
}

formAdditionalInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  saveChanges();
});