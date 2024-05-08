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

/***/ "./src/js/checkout.js":
/*!****************************!*\
  !*** ./src/js/checkout.js ***!
  \****************************/
/***/ (() => {

eval("\r\n//*esential imports\r\n\r\n//*varibales and elements\r\nconst checkoutFormElem = document.getElementById('checkoutFormElem');\r\n\r\n//*Functions\r\nconst allFeildElems = checkoutFormElem.querySelectorAll(\"[data-feildName]\")\r\nconsole.log(allFeildElems)\r\nconst handleCheckout = (e)=>{\r\n}\r\n\r\n//*EventListners\r\ncheckoutFormElem.addEventListener(\"submit\",(e)=>{\r\n    e.preventDefault();\r\n    handleCheckout(e)\r\n})\r\n\r\n//*Debugging\n\n//# sourceURL=webpack://arux/./src/js/checkout.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/checkout.js"]();
/******/ 	
/******/ })()
;