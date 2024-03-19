/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/admin-new-product_form_submission.js":
/*!*****************************************************!*\
  !*** ./src/js/admin-new-product_form_submission.js ***!
  \*****************************************************/
/***/ (() => {

eval("\r\n\r\n//getting elems form dom\r\nconst forms_section = document.getElementById('forms_section');\r\nconst form_step_1 = document.querySelector('#form_step_1');\r\nconst form_step_2 = document.querySelector('#form_step_2');\r\nlet currentStep = 1;\r\nlet imagesObj;\r\nconst prev_step_btn = document.querySelector('#prev_step_btn');\r\nconst form_msg_display = document.querySelector('#form__msg-display');\r\n\r\n//functions\r\nconst checkEmptySrc = (dropAreaArr)=>{\r\n    const arr = [...dropAreaArr];\r\n    let areEmpty = false;\r\n    arr.forEach((area)=>{\r\n        const img = area.querySelector('.preview-img');\r\n        \r\n        if(img.src.trim() == window.location.origin + window.location.pathname){\r\n            areEmpty = true;\r\n            const msg = area.querySelector('.image-upload-msg');\r\n            msg.innerHTML = `This can't be empty!`;\r\n            msg.classList.add('red')\r\n        }\r\n    })\r\n    return areEmpty\r\n}\r\nconst updateSteps = (direction='next')=>{\r\n    const step_indicator = document.querySelector('.step-indicator');\r\n    const currentActiveStep = step_indicator.querySelectorAll('.active');\r\n    const currentActiveForm = document.querySelector(\".currentActiveForm\");\r\n\r\n\r\n    if(direction == 'next'){\r\n        currentActiveForm.nextElementSibling.classList.add(\"currentActiveForm\");\r\n        currentActiveForm.nextElementSibling.classList.remove(\"hidden\");\r\n\r\n        currentActiveStep[0].nextElementSibling.classList.add('active');\r\n\r\n    }else if(direction == 'previous'){\r\n        currentActiveForm.previousElementSibling.classList.add(\"currentActiveForm\");\r\n        currentActiveForm.previousElementSibling.classList.remove(\"hidden\");\r\n        \r\n        currentActiveStep[currentActiveForm.length - 1].classList.remove('active');\r\n    }\r\n    \r\n    currentActiveForm.classList.remove(\"currentActiveForm\");\r\n    currentActiveForm.classList.add(\"hidden\");\r\n}\r\nconst gatherDataOnlocalStorage = (storageKey, key, value)=>{\r\n    const obj = localStorage.getItem(storageKey) == null ? {} : JSON.parse(localStorage.getItem(storageKey));\r\n\r\n    if(obj){\r\n        obj[key] = value;\r\n    }\r\n    const stringifiedObj = JSON.stringify(obj)\r\n    localStorage.setItem(storageKey, stringifiedObj)\r\n\r\n}\r\nconst prepareToUpload = (locallySavedKey)=>{\r\n    const productObj = JSON.parse(localStorage.getItem(locallySavedKey));\r\n\r\n    forms_section.innerHTML = `\r\n\r\n    <div class =\"loader-con\">\r\n        Uploading image please wait...\r\n        <div class=\"loader\"></div>\r\n    </div>\r\n    `\r\n}\r\n\r\n\r\n//event listners\r\nform_step_1.addEventListener('submit',(e)=>{\r\n    e.preventDefault();\r\n    const dropAreas = [...e.target.querySelectorAll('.image-upload')]\r\n    \r\n    if(!checkEmptySrc(dropAreas)){\r\n        const toStoreElems = [...e.target.querySelectorAll('[data-identification_name]')];\r\n\r\n        const primary_img = e.target.querySelector('#primary_img').src;\r\n\r\n        const secondary_imgs = [...e.target.querySelectorAll('.secondary_image_preview')]\r\n\r\n        for (let i = 0; i < secondary_imgs.length; i++) {\r\n            secondary_imgs[i] = secondary_imgs[i].src\r\n            \r\n        }\r\n\r\n        const images = {\r\n            primary_img,\r\n            secondary_imgs,\r\n        }\r\n        imagesObj = images\r\n        \r\n        toStoreElems.forEach((elem)=>{\r\n            const feildName = elem.dataset.identification_name\r\n            gatherDataOnlocalStorage(\"product_to_be_Added\", feildName, elem.value);\r\n        })\r\n    }\r\n\r\n    updateSteps()\r\n})\r\n\r\nform_step_2.addEventListener('submit',(e)=>{\r\n    e.preventDefault();\r\n    const toStoreElems = [...e.target.querySelectorAll('[data-identification_name]')];\r\n    toStoreElems.forEach((elem)=>{\r\n        const feildName = elem.dataset.identification_name\r\n        gatherDataOnlocalStorage(\"product_to_be_Added\", feildName, elem.value);\r\n    })\r\n\r\n    prepareToUpload(\"product_to_be_Added\")\r\n})\r\n\r\nwindow.onload = ()=>{\r\n    const urlString = window.location.search;\r\n    const urlParams = new URLSearchParams(urlString);\r\n    const stepParam = urlParams.get('step');\r\n\r\n    if(stepParam){\r\n        currentStep = stepParam;\r\n    }\r\n}\r\n\r\nprev_step_btn.addEventListener('click',()=>{\r\n    updateSteps('previous')\r\n})\r\n\n\n//# sourceURL=webpack://arux/./src/js/admin-new-product_form_submission.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/admin-new-product_form_submission.js"]();
/******/ 	
/******/ })()
;