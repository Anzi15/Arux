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

/***/ "./src/js/components.js":
/*!******************************!*\
  !*** ./src/js/components.js ***!
  \******************************/
/***/ (() => {

eval("\r\n\r\n// getting elements form dom \r\nconst navToggleBtn = document.querySelectorAll('[data-nav-toggler]');\r\nconst mobNav = document.getElementById('mob-nav-links');\r\nconst dark_overlay = document.getElementById('dark-overlay');\r\n\r\n// functions \r\nconst classToggler = (elem, ...classlist)=>{\r\n    const elemArr = [elem]\r\n    elemArr.forEach((element) =>{\r\n        classlist.forEach(Class =>{\r\n            element.classList.toggle(Class)\r\n        })\r\n    })\r\n}\r\n\r\n// adding event listners \r\nnavToggleBtn.forEach((btn)=>{\r\n    btn.addEventListener(\"click\",()=>{\r\n        classToggler(mobNav,\"none\")\r\n    })\r\n})\r\n\r\n\n\n//# sourceURL=webpack://arux/./src/js/components.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/components.js"]();
/******/ 	
/******/ })()
;