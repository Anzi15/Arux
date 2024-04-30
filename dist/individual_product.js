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

/***/ "./src/js/individual-product.js":
/*!**************************************!*\
  !*** ./src/js/individual-product.js ***!
  \**************************************/
/***/ (() => {

eval("\r\n\r\n//*essential imports\r\n\r\n//*variables and dom elements\r\nconst quantityInpElem = document.getElementById('quantityInpElem');\r\nconst quantitySubtractBtn = document.getElementById('subtractBtn');\r\nconst quantityPlusBtn = document.getElementById('plusBtn');\r\n\r\n//*functions\r\n\r\n//*eventlistners\r\nquantityPlusBtn.onclick = ()=>{quantityInpElem.value++}\r\nquantitySubtractBtn.onclick = ()=>{\r\n    quantityInpElem.value < 2 ? quantityInpElem.value=1 : quantityInpElem.value--\r\n}\n\n//# sourceURL=webpack://arux/./src/js/individual-product.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/individual-product.js"]();
/******/ 	
/******/ })()
;