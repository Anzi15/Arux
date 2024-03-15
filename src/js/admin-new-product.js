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
const handleFiles = function(files, dropArea){
  ([...files]).forEach(file => {
    previewFile(file, dropArea)
  });
}
// once something is dropped 
const handleDrop = function(e){
  const data = e.dataTransfer;
  const files = data.files
  handleFiles(files, e.target)
}
const previewFile = function(file, dropArea){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(){
      dropArea.innerHTML = `<img class="preview-img" src="${reader.result}" />`
    }
}
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
  const preventDefaultEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];
  const highlightEvents = ['dragenter', 'dragover'];
  const unHighlightEvents = ['dragleave', 'drop'];

  //preventing defaults
  for(let i=0; i<preventDefaultEvents.length; i++){
    areaElem.addEventListener(preventDefaultEvents[i],preventDefaults)
  }

  // highlighting 
  for (let i = 0; i < highlightEvents.length; i++) {
    areaElem.addEventListener(highlightEvents[i],()=>{
      highlight(areaElem)
    })
  }
  // unhighlighting 
  for (let i = 0; i < unHighlightEvents.length; i++) {
    areaElem.addEventListener(unHighlightEvents[i],()=>{
      unhighlight(areaElem)
    })
  }

  // once something is dropped
  areaElem.addEventListener('drop', handleDrop, false)

})
  
