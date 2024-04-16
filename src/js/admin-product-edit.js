"use-strict";

import { doc } from "firebase/firestore";
//esential imports
import {preventDefaults, classAdder, classRemover, getFirestoreDocument} from "./admin-modules.js"
import {getParamFromUrl} from "./general-modules.js"

//getting elems from dom 
const primary_image_upload = document.getElementById('primary_image-upload');
const sec1_image_upload = document.getElementById('sec-1_image-upload');
const sec2_image_upload = document.getElementById('sec-2_image-upload');

const meow = {
  "secondary_img_1": "https://firebasestorage.googleapis.com/v0/b/arux-24899.appspot.com/o/Products%2F68246759-9d74-416f-b3fe-3d7177594e8f?alt=media&token=7587d378-4fab-4fdf-b7b6-8a48e16913ac",
  "primary_img": "https://firebasestorage.googleapis.com/v0/b/arux-24899.appspot.com/o/Products%2F9ceacc79-d283-4f2b-83d2-4bbb4e45a18e?alt=media&token=99510dca-c6bc-4d68-8a64-1560fce2cb90",
  "Description": "Best for your bf",
  "Additional_product_details": "",
  "secondary_img_2": "https://firebasestorage.googleapis.com/v0/b/arux-24899.appspot.com/o/Products%2F4ddaef46-43b2-46c0-b8b5-5581ead70c80?alt=media&token=69d68768-b634-464b-809e-67114f56c99e",
  "shipping_fees": "",
  "price": "299",
  "title": "Body posture corrector"
}

// variables, arrays and objects
const imageDropAreas = [primary_image_upload, sec1_image_upload, sec2_image_upload];
let productID = getParamFromUrl("product-ID");
const allFeildElems = {
  // primary_img: document.getElementById("primary_img"),
  // secondary_img_1: document.getElementById("sec-1-img"),
  // secondary_img_2: document.getElementById("sec-2-img"),
  // title: document.getElementById("title_inp"),
  // description: document.getElementById("product_description"),
  // price: document.getElementById(""),
  // shipping_fees: document.getElementById(""),
  // additional_details: document.getElementById(""),
};

const toStoreElems = document.querySelectorAll("[data-identification_name]");

//functions
// This function asynchronously populates input fields with values from a Firestore document
(async () => {
  // Loop through the elements to store them in an object
  toStoreElems.forEach((elem) => {
    const feildName = elem.dataset.identification_name;
    allFeildElems[feildName] = elem;
  });
  console.log(``,)

  const allImgElems = {
    primary_img : document.getElementById('primary_img'),
    secondary_img_1 : document.getElementById('secondary_img_1'),
    secondary_img_2 : document.getElementById('secondary_img_2'),
  }

  // Retrieve the Firestore document for the specified productID
  const productDoc = await getFirestoreDocument("Products", productID);

  // Populate input fields with values from the Firestore document
  for (const fieldName in allFeildElems) {
    const fieldValue = productDoc[fieldName];
    console.log(``,fieldName,fieldValue)
    if (fieldValue) {
      allFeildElems[fieldName].value = fieldValue;
      console.log(allFeildElems[fieldName].value)
    }
  }
  for (const fieldName in allImgElems) {
    const imageURL = productDoc[fieldName];
    if (imageURL) {
      allImgElems[fieldName].src = imageURL;
    }
  }
})();


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
        handleImageUpload(e.target)
        previewFile(e.target.files[0], area)
    }
})
})

