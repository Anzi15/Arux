"use strict";
//esential imports
import {preventDefaults, classAdder, classRemover} from "./utility-modules.js"


//getting elems from dom 
const primary_image_upload = document.getElementById('primary_image-upload');
const sec1_image_upload = document.getElementById('sec-1_image-upload');
const sec2_image_upload = document.getElementById('sec-2_image-upload');

// variables, arrays and objects
const imageDropAreas = [primary_image_upload, sec1_image_upload, sec2_image_upload];
// functions 

// to handle files 
function handleFiles(files, dropArea){
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

// eventlistners

//to prevent (Drag n drop) default actions
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
  