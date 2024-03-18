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

eval("\r\n\r\n//getting elems form dom\r\nconst form_step_1 = document.getElementById('form_step_1');\r\n\r\n//functions\r\nconst checkEmptySrc = (dropAreaArr)=>{\r\n    const arr = [...dropAreaArr];\r\n    let areEmpty = false;\r\n    arr.forEach((area)=>{\r\n        const img = area.querySelector('.preview-img');\r\n        \r\n        if(img.src.trim() == window.location.origin + window.location.pathname){\r\n            areEmpty = true;\r\n            const msg = area.querySelector('.image-upload-msg');\r\n            msg.innerHTML = `This can't be empty!`;\r\n            msg.classList.add('red')\r\n        }\r\n    })\r\n    return areEmpty\r\n}\r\n\r\n//event listners\r\nform_step_1.addEventListener('submit',(e)=>{\r\n    e.preventDefault();\r\n    const dropAreas = [...e.target.querySelectorAll('.image-upload')]\r\n    \r\n    if(!checkEmptySrc(dropAreas)){\r\n        const toStoreElems = [...e.target.querySelectorAll('[data-identification_name]')];\r\n        const primary_img = e.target.querySelector('#primary_img').src;\r\n        const secondary_imgs = [...e.target.querySelectorAll('.secondary_image_preview')]\r\n        for (let i = 0; i < secondary_imgs.length; i++) {\r\n            secondary_imgs[i] = secondary_imgs[i].src\r\n            \r\n        }\r\n\r\n        let form_1_content = {\r\n            image:{\r\n                primary_img,\r\n                secondary_imgs,\r\n            }\r\n        };\r\n        toStoreElems.forEach((elem)=>{\r\n            const feildName = elem.dataset.identification_name\r\n            form_1_content[feildName] = elem.value\r\n        })\r\n        console.log(``,JSON.stringify(form_1_content))\r\n        // localStorage.setItem('form_1_content')\r\n    }\r\n})\n\n//# sourceURL=webpack://arux/./src/js/admin-new-product_form_submission.js?");

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