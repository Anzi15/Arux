"use-strict";
//getting elems from dom 
const primary_image_upload = document.getElementById('primary_image-upload');

// variables, arrays and objects
const imageDropAreas = [primary_image_upload]
// functions 

//to upload the image to the firebase storeage
const handleImageUpload = function(elem){
    
}

//to prevent (Drag n drop) default actions
const preventDefaults = function(e) {
  e.preventDefault()
  e.stopPropagation()
}
// to handle files 
const handleFiles = function(files, dropArea){
  ([...files]).forEach(file => {
    previewFile(file, dropArea)
  });
}
// once something is dropped 
const handleDrop = function(e, areaElem){
  const data = e.dataTransfer;
  const files = data.files
  handleFiles(files, areaElem)
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
   //reading the file using filereader api to display it
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function(){
      previewDisplay.src = reader.result
    }
}
// to make the drop area default once clicked cancel btn 
// to highlight the drop area 
const highlight = function(elem){
  elem.classList.add('highlight')
}
// to unhighlight the drop area 
const unhighlight = function(elem){
  elem.classList.remove('highlight')
}


// eventlistners
primary_image_upload.addEventListener("change",(e)=>{
    if (e.target.files[0]) {
        handleImageUpload(e.target)
        previewFile(e.target.files[0], primary_image_upload)
    }
})
// primary_image_upload.addEventListener("mouseover")
//to prevent (Drag n drop) default actions
imageDropAreas.forEach((areaElem)=>{
  // events 
  const preventDefaultEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];
  const highlightEvents = ['dragenter', 'dragover'];
  const unHighlightEvents = ['dragleave', 'drop'];

  //preventing defaults
  preventDefaultEvents.forEach(event => {
    areaElem.addEventListener(event, preventDefaults)
  });

  // highlighting 
  highlightEvents.forEach(event => {
    areaElem.addEventListener(event, ()=>{
      highlight(areaElem)
    })
  })
  // unhighlighting
  unHighlightEvents.forEach(event =>{
    areaElem.addEventListener(event, ()=>{
      unhighlight(areaElem)
    })
  }) 

  // once something is dropped
  areaElem.addEventListener('drop', (e)=>{
    handleDrop(e,areaElem)
  }, false)

  //removing img (cancel) btn eventlistners
  areaElem.addEventListener('click',()=>{
    areaElem.querySelector('.input_file').click()
  })
})
  
