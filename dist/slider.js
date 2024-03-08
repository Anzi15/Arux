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

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ (() => {

eval("// getting elements from dom\r\nconst slider = document.querySelector(\".carousel__slider\");\r\nconst slides = [...slider.children];\r\nconst nav_dot_con = document.getElementById('carousel__nav');\r\n\r\nconst nav_dots = [...nav_dot_con.children]\r\n//functions\r\nfunction moveLeft() {\r\n  const current_slide = slider.querySelector(\".ative_slide\"); //getting the current active slide from all the slides\r\n  const next_slide =\r\n    current_slide == null ? slides[0] : current_slide.nextSibling; //checking if we have reached to the end of slides to handle it accordingly\r\n  if (!next_slide) {\r\n    //if we have reached the end\r\n    slider.style.transform = `translateX(${0})`;\r\n    current_slide.classList.remove(\"ative_slide\");\r\n    slides[0].classList.add(\"ative_slide\");\r\n\r\n\r\n    // moving the indication dot to the first dot after there's dot ahead\r\n    nav_dot_con.querySelector(\".active\").classList.remove(\"active\");\r\n    nav_dot_con.children[0].classList.add(\"active\")\r\n  } else {\r\n    //if we haven't slide as much as the width of a slide\r\n    const amountToSlide = next_slide.getBoundingClientRect().width; //getting the width of a slide\r\n\r\n    slider.style.transform = `translateX(-${\r\n      amountToSlide * slides.indexOf(next_slide)\r\n    }px)`; //applying the styles to scroll accordingly\r\n\r\n    current_slide.classList.remove(\"ative_slide\");\r\n    next_slide.classList.add(\"ative_slide\");\r\n    //removing the active slide class to resolve future conflicts\r\n\r\n    // moving the indication dots according to the slide \r\n    nav_dot_con.querySelector(\".active\").nextSibling.classList.add(\"active\");\r\n    nav_dot_con.querySelector(\".active\").classList.remove(\"active\")\r\n  }\r\n}\r\n\r\n//basically does the same thing as moveLeft() function but in opposite direction\r\nfunction moveRight() {\r\n  const current_slide = slider.querySelector(\".ative_slide\");\r\n  const prev_slide = current_slide.previousSibling;\r\n  const amountToSlide = current_slide.getBoundingClientRect().width;\r\n\r\n  if (prev_slide) {\r\n    slider.style.transform = `translateX(-${\r\n      amountToSlide * slides.indexOf(prev_slide)\r\n    }px)`;\r\n\r\n    current_slide.classList.remove(\"ative_slide\");\r\n    prev_slide.classList.add(\"ative_slide\");\r\n    \r\n    const dot =   nav_dot_con.querySelector(\".active\")\r\n    const prev_dot_index = nav_dots.indexOf(dot) -1;\r\n    nav_dots[prev_dot_index].classList.add(\"active\");\r\n    dot.classList.remove(\"active\")\r\n  } else {\r\n    const lastSlideIndex = slides.length - 1;\r\n    slider.style.transform = `translateX(-${amountToSlide * lastSlideIndex}px)`;\r\n\r\n    current_slide.classList.remove(\"ative_slide\");\r\n    slides[lastSlideIndex].classList.add(\"ative_slide\");\r\n    \r\n    const lastDotIndex = nav_dots.length - 1;\r\n    nav_dots[lastDotIndex].classList.add(\"active\")\r\n    nav_dot_con.querySelector(\".active\").classList.remove(\"active\")\r\n  }\r\n}\r\n\r\n//syncing the slides according to the dots clicked\r\nfunction syncSlide(e){\r\n  const current_slide = slider.querySelector(\".ative_slide\"); //getting the current active slide\r\n  const index = nav_dots.indexOf(e.target); //getting the index of the dot clicked\r\n  const amountToSlide = slides[index].getBoundingClientRect().width; //getting the width of a single slide\r\n  slider.style.transform = `translateX(-${amountToSlide * index}px)`; //slide Slide's withs multiplied by the index\r\n  \r\n  //changing the classes of slides to avoid future conflicts\r\n  current_slide.classList.remove(\"ative_slide\");\r\n  slides[index].classList.add(\"ative_slide\");\r\n\r\n  //changing the classes of dots for indication\r\n  e.target.parentElement.querySelector(\".active\").classList.remove(\"active\")\r\n  nav_dots[index].classList.add(\"active\")\r\n}\r\n\r\n//getting slides to there position and adding that many dots to the dot con\r\nfor (let i = 0; i < slides.length; i++) {\r\n  const slideWidth = slides[i].getBoundingClientRect().width;\r\n  slides[i].style.left = `${i * slideWidth}px`;\r\n}\r\n\r\n\r\nconst autoCarousal = setInterval(() => {\r\n    moveLeft()\r\n}, 5000);\r\n\r\n// event listner \r\nnav_dots.forEach((dot)=>{\r\n  dot.addEventListener(\"click\",syncSlide)\r\n})\r\n\r\n//event listner for slide (on touch screens)\r\nlet touchstartX = 0;\r\nlet touchendX = 0;\r\n    \r\nfunction checkDirection() {\r\n  if (touchendX < touchstartX) moveLeft()\r\n  if (touchendX > touchstartX) moveRight()\r\n}\r\n\r\nslider.addEventListener('touchstart', e => {\r\n  touchstartX = e.changedTouches[0].screenX\r\n})\r\n\r\nslider.addEventListener('touchend', e => {\r\n  touchendX = e.changedTouches[0].screenX\r\n  checkDirection()\r\n})\n\n//# sourceURL=webpack://arux/./src/js/slider.js?");

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