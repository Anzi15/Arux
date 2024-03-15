/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/admin-new-product.js":
/*!*************************************!*\
  !*** ./src/js/admin-new-product.js ***!
  \*************************************/
/***/ (() => {

eval("\"use-strict\";\r\n//getting elems from dom \r\nconst primary_image_upload = document.getElementById('primary_image-upload');\r\n\r\n// variables, arrays and objects\r\nconst imageDropAreas = [primary_image_upload]\r\n// functions \r\n\r\n//to upload the image to the firebase storeage\r\nconst handleImageUpload = function(elem){\r\n    \r\n}\r\n\r\n//to prevent (Drag n drop) default actions\r\nconst preventDefaults = function(e) {\r\n  e.preventDefault()\r\n  e.stopPropagation()\r\n}\r\nconst handleFiles = function(files, dropArea){\r\n  ([...files]).forEach(file => {\r\n    previewFile(file, dropArea)\r\n  });\r\n}\r\n// once something is dropped \r\nconst handleDrop = function(e, areaElem){\r\n  const data = e.dataTransfer;\r\n  const files = data.files\r\n  handleFiles(files, areaElem)\r\n}\r\nconst previewFile = function(file, dropArea){\r\n  console.log(``,dropArea)\r\n   const hidePreviewElem = dropArea.querySelectorAll('[data-hideOnImagePreview]');\r\n   hidePreviewElem.forEach((elem)=>{\r\n    elem.classList.add('hidden')\r\n   })\r\n   const previewDisplay = dropArea.querySelector('.preview-img')\r\n    let reader = new FileReader();\r\n    reader.readAsDataURL(file);\r\n    reader.onloadend = function(){\r\n      previewDisplay.classList.remove('hidden')\r\n      previewDisplay.src = reader.result\r\n    }\r\n}\r\n// to highlight the drop area \r\nconst highlight = function(elem){\r\n  elem.classList.add('highlight')\r\n}\r\n// to unhighlight the drop area \r\nconst unhighlight = function(elem){\r\n  elem.classList.remove('highlight')\r\n}\r\n\r\n// eventlistners\r\nprimary_image_upload.addEventListener(\"change\",(e)=>{\r\n    if (e.target.files[0]) {\r\n        handleImageUpload(e.target)\r\n        previewFile(e.target.files[0], primary_image_upload)\r\n    }\r\n})\r\n// primary_image_upload.addEventListener(\"mouseover\")\r\n//to prevent (Drag n drop) default actions\r\nimageDropAreas.forEach((areaElem)=>{\r\n  const preventDefaultEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];\r\n  const highlightEvents = ['dragenter', 'dragover'];\r\n  const unHighlightEvents = ['dragleave', 'drop'];\r\n\r\n  //preventing defaults\r\n  for(let i=0; i<preventDefaultEvents.length; i++){\r\n    areaElem.addEventListener(preventDefaultEvents[i],preventDefaults)\r\n  }\r\n\r\n  // highlighting \r\n  for (let i = 0; i < highlightEvents.length; i++) {\r\n    areaElem.addEventListener(highlightEvents[i],()=>{\r\n      highlight(areaElem)\r\n    })\r\n  }\r\n  // unhighlighting \r\n  for (let i = 0; i < unHighlightEvents.length; i++) {\r\n    areaElem.addEventListener(unHighlightEvents[i],()=>{\r\n      unhighlight(areaElem)\r\n    })\r\n  }\r\n\r\n  // once something is dropped\r\n  areaElem.addEventListener('drop', (e)=>{\r\n    handleDrop(e,areaElem)\r\n  }, false)\r\n\r\n})\r\n  \r\n\n\n//# sourceURL=webpack://arux/./src/js/admin-new-product.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/admin-new-product.js"]();
/******/ 	
/******/ })()
;