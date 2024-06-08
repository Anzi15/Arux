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

/***/ "./src/js/admin-edit-product_form_submission.js":
/*!******************************************************!*\
  !*** ./src/js/admin-edit-product_form_submission.js ***!
  \******************************************************/
/***/ (() => {

eval("\r\n\r\n\r\n//getting elems form dom\r\nconst formBasicInfo = document.querySelector(\"#formBasicInfo\");\r\nlet product_data_obj = {};\r\nlet imagesObj = {};\r\nconst prev_step_btn = document.querySelector(\"#prev_step_btn\");\r\n\r\n//FUNCTIONS\r\n\r\nconst updateSteps = (direction = \"next\") => {\r\n  const step_indicator = document.querySelector(\".step-indicator\");\r\n  const currentActiveStep = step_indicator.querySelectorAll(\".active\");\r\n  const currentActiveForm = document.querySelector(\".currentActiveForm\");\r\n\r\n  if (direction == \"next\") {\r\n    currentActiveForm.nextElementSibling.classList.add(\"currentActiveForm\");\r\n    currentActiveForm.nextElementSibling.classList.remove(\"hidden\");\r\n\r\n    currentActiveStep[0].nextElementSibling.classList.add(\"active\");\r\n  } else if (direction == \"previous\") {\r\n    currentActiveForm.previousElementSibling.classList.add(\"currentActiveForm\");\r\n    currentActiveForm.previousElementSibling.classList.remove(\"hidden\");\r\n\r\n    currentActiveStep[currentActiveForm.length - 1].classList.remove(\"active\");\r\n  }\r\n\r\n  currentActiveForm.classList.remove(\"currentActiveForm\");\r\n  currentActiveForm.classList.add(\"hidden\");\r\n};\r\n\r\n//event listners\r\nformBasicInfo.addEventListener(\"submit\", (e) => {\r\n  e.preventDefault();\r\n  updateSteps()\r\n});\r\n\r\n//for handling the additional form go to admin-product-edit.js\r\n\r\nprev_step_btn.addEventListener(\"click\", () => {\r\n  updateSteps(\"previous\");\r\n});\r\n\n\n//# sourceURL=webpack://Arux/./src/js/admin-edit-product_form_submission.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/admin-edit-product_form_submission.js"]();
/******/ 	
/******/ })()
;