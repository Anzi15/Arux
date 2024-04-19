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

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ (() => {

eval("\r\n\r\n// getting elements from dom\r\nconst slider = document.querySelector(\".carousel__slider\");\r\n\r\nconst slides = [...slider.children];\r\n\r\nconst amountToSlide = slides[0].getBoundingClientRect().width;\r\n\r\nconst sliderDotCon = document.getElementById('carousel__nav');\r\n\r\nlet navDots = [];\r\n\r\n//functions\r\n\r\n//getting slides to there position and adding that many dots to the dot con\r\n(()=>{\r\n  for (let i = 0; i < slides.length; i++) {\r\n    const slideWidth = slides[i].getBoundingClientRect().width;\r\n    slides[i].style.left = `${i * slideWidth}px`;\r\n\r\n    //populating the slider's nav dots accordingly \r\n    const newDot = document.createElement(\"div\");\r\n    newDot.classList.add(\"carousel__nav-dot\");\r\n    sliderDotCon.appendChild(newDot);\r\n  }\r\n  navDots = [...sliderDotCon.children];\r\n  navDots[0].classList.add(\"active\")\r\n})();\r\n\r\n\r\nconst resetSlider = (currentSlide)=>{\r\n  //reseting slides..\r\n  slider.style.transform = `translateX(${0})`;\r\n\r\n  currentSlide.classList.remove(\"active_slide\");\r\n  slides[0].classList.add(\"active_slide\");\r\n\r\n  //reseting navigation dots \r\n  syncDotWithSlide(0)\r\n}\r\n\r\nconst moveToNextSlide = function () {\r\n  const currentSlide = slider.querySelector(\".active_slide\");\r\n  //getting the current active slide from all the slides\r\n  const next_slide =\r\n  currentSlide == null ? slides[0] : currentSlide.nextElementSibling; //checking if we have reached to the end of slides to handle it accordingly\r\n\r\n  if (next_slide) {\r\n    slider.style.transform = `translateX(-${\r\n      amountToSlide * slides.indexOf(next_slide)\r\n    }px)`; //applying the styles to scroll accordingly\r\n\r\n    currentSlide.classList.remove(\"active_slide\");\r\n    next_slide.classList.add(\"active_slide\");\r\n\r\n    // moving the indication dots according to the slide \r\n    syncDotWithSlide(slides.indexOf(next_slide))\r\n  } else {\r\n    resetSlider(currentSlide)\r\n  }\r\n}\r\n\r\n//basically does the same thing as moveToNextSlide() function but in opposite direction\r\nconst moveToPrevSlide = function () {\r\n  const currentSlide = slider.querySelector(\".active_slide\");\r\n  const prev_slide = currentSlide.previousElementSibling;\r\n\r\n  if (prev_slide) {\r\n    slider.style.transform = `translateX(-${\r\n      amountToSlide * slides.indexOf(prev_slide)\r\n    }px)`;\r\n\r\n    currentSlide.classList.remove(\"active_slide\");\r\n    prev_slide.classList.add(\"active_slide\");\r\n\r\n    syncDotWithSlide(slides.indexOf(prev_slide))\r\n  } else {\r\n    const lastSlideIndex = slides.length - 1;\r\n    slider.style.transform = `translateX(-${amountToSlide * lastSlideIndex}px)`;\r\n\r\n    currentSlide.classList.remove(\"active_slide\");\r\n    slider.lastElementChild.classList.add(\"active_slide\");\r\n    \r\n    syncDotWithSlide(slides.length-1)\r\n\r\n  }\r\n}\r\n\r\n//moving the slides according to the dots clicked\r\nfunction dotSlide(e){\r\n  const currentSlide = slider.querySelector(\".active_slide\"); //getting the current active slide\r\n  const index = navDots.indexOf(e.target); //getting the index of the dot clicked\r\n  const amountToSlide = slides[index].getBoundingClientRect().width; //getting the width of a single slide\r\n  slider.style.transform = `translateX(-${amountToSlide * index}px)`; //slide Slide's withs multiplied by the index\r\n  \r\n  //changing the classes of slides to avoid future conflicts\r\n  currentSlide.classList.remove(\"active_slide\");\r\n  slides[index].classList.add(\"active_slide\");\r\n\r\n  //changing the classes of dots for indication\r\n  e.target.parentElement.querySelector(\".active\").classList.remove(\"active\")\r\n  navDots[index].classList.add(\"active\")\r\n}\r\n\r\nfunction syncDotWithSlide (indexOfSlide){\r\n  sliderDotCon.querySelector(\".active\").classList.remove(\"active\");\r\n  navDots[indexOfSlide].classList.add(\"active\");\r\n}\r\n\r\n\r\nconst autoCarousal = setInterval(() => {\r\n    moveToNextSlide()\r\n}, 5000);\r\n\r\n// event listner \r\nnavDots.forEach((dot)=>{\r\n  dot.addEventListener(\"click\",dotSlide)\r\n})\n\n//# sourceURL=webpack://arux/./src/js/slider.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/slider.js"]();
/******/ 	
/******/ })()
;