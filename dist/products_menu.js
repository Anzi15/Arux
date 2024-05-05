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

/***/ "./src/js/admin-modules.js":
/*!*********************************!*\
  !*** ./src/js/admin-modules.js ***!
  \*********************************/
/***/ (() => {

eval("// \"use strict\";\r\n\r\n// import { initializeApp } from \"firebase/app\";\r\n// import {\r\n//   getStorage,\r\n//   ref,\r\n//   getDownloadURL,\r\n//   uploadString,\r\n// } from \"firebase/storage\";\r\n// import { v4 } from \"uuid\";\r\n// import {\r\n//   addDoc,\r\n//   collection,\r\n//   getFirestore,\r\n//   getDocs,\r\n//   getDoc,\r\n//   doc,\r\n//   deleteDoc,\r\n//   updateDoc,\r\n//   query,\r\n//   where,\r\n//   limitToLast,\r\n//   orderBy,\r\n//   startAfter,\r\n//   limit,\r\n//   initializeFirestore\r\n// } from \"firebase/firestore\";\r\n// import Swal from \"sweetalert2\";\r\n// import { getDatabase, onDisconnect } from \"firebase/database\";\r\n\r\n// //TODO: break down admin-modules into seprate files, like firebase modules, ui-modules, etc.\r\n\r\n// //firebase configuration\r\n// const firebaseConfig = {\r\n//   apiKey: \"AIzaSyDtDQsUvkfEiuD-o48LosmunhQ5YzPP94Y\",\r\n//   authDomain: [\r\n//     \"arux-24899.firebaseapp.com\",\r\n//     \"localhost\",\r\n//     \"arux.netlify.app\",\r\n//     \"arux.store\",\r\n//     \"anzi15.github.io/arux\",\r\n//     \"arux.vercel.app\",\r\n//   ],\r\n//   projectId: \"arux-24899\",\r\n//   storageBucket: \"arux-24899.appspot.com\",\r\n//   messagingSenderId: \"95411992302\",\r\n//   appId: \"1:95411992302:web:336d7a38ca931af33225ff\",\r\n//   measurementId: \"G-LXN5WG6V2S\",\r\n// };\r\n\r\n// const app = initializeApp(firebaseConfig);\r\n// const firebaseStorage = getStorage(app);\r\n// const db = initializeFirestore(app, {\r\n//   experimentalForceLongPolling: true,\r\n// });\r\n\r\n// (() => {\r\n//   if (!window.navigator.onLine) showAlert(\"error\",\"No internet\",\"You seem offline\",\"Refresh page\").then(response => {\r\n//     if(response.isConfirmed){\r\n//       window.location.reload()\r\n//     }\r\n//   })\r\n// })();\r\n\r\n// const showMsg = (\r\n//   elem,\r\n//   message = \"your message will display here\",\r\n//   color = \"black\"\r\n// ) => {\r\n//   elem.style.color = color;\r\n//   elem.innerText = message;\r\n//   return \"done\";\r\n// };\r\n\r\n// // Function to upload image to firebase and get url\r\n// const uploadImageToFirebase = async (file) => {\r\n//   const imageRef = ref(firebaseStorage, `Products/${v4()}`);\r\n//   const metadata = {\r\n//     contentType: \"image/webp\",\r\n//   };\r\n//   const base64Image = file.split(\",\")[1];\r\n\r\n//   try {\r\n//     if (navigator.onLine) {\r\n//       const uploadResponse = await uploadString(\r\n//         imageRef,\r\n//         base64Image,\r\n//         \"base64\",\r\n//         metadata\r\n//       );\r\n\r\n//       const url = await getDownloadURL(uploadResponse.ref);\r\n\r\n//       return url;\r\n//     } else {\r\n//       throw new Error(\"No internet\");\r\n//     }\r\n//   } catch (error) {\r\n//     console.log(`Error uploading image: ${error}`);\r\n//     return \"error\";\r\n//   }\r\n// };\r\n\r\n// const storeObjToDB = async (\r\n//   collectionName = \"Products\",\r\n//   dataObj = { key: \"Please provide a data-obj to continue\" }\r\n// ) => {\r\n//   console.log(\"para:\" , dataObj, collectionName)\r\n//   try {\r\n//     if (navigator.onLine) {\r\n//       const newDoc = await addDoc(collection(db, collectionName), dataObj);\r\n//       console.log(\"new doc:\" , newDoc)\r\n//       return newDoc;\r\n//     } else {\r\n//       throw new Error(\"No internet\");\r\n//     }\r\n//   } catch (error) {\r\n//     console.log(`Error storing product to database: ${error}`);\r\n//     showConfirmationDialog(\"error\",\"No internet\",\"failed to save changes to the cloud please try again latter\",\"Refresh page\", \"Go to dashboard\").then(response => {\r\n//       if(response.isConfirmed){\r\n//         window.location.reload()\r\n//       }else{\r\n//         window.location.replace(\"../products\")\r\n//       }\r\n//     })\r\n//     return \"error\";\r\n//   }\r\n// };\r\n\r\n// const getAllFirestoreDocuments = async (collectionName = \"Products\") => {\r\n//   try {\r\n//     if (window.navigator.onLine) {\r\n//       const doc_ref = collection(db, collectionName);\r\n//       const querySnapshot = await getDocs(doc_ref);\r\n//       return querySnapshot;\r\n//     } else {\r\n//       showNotification(\"error\", \"You seem having internet issues :(\", 8000);\r\n//     }\r\n//   } catch (error) {\r\n//     console.log(`Error getting documents from firestore: ${error}`);\r\n//     showNotification(\"error\", error);\r\n//     return [];\r\n//   }\r\n// };\r\n\r\n// const getFewFirestoreDocs = async (collectionName, limit) => {\r\n//   try {\r\n//     const collRef = collection(db, collectionName);\r\n//     const q = query(collRef, orderBy(\"title\"), limitToLast(limit));\r\n//     const querySnapshot = await getDocs(q);\r\n//     const documents = [];\r\n\r\n//     querySnapshot.forEach((doc) => {\r\n//         documents.push({ id: doc.id, data: doc.data() });\r\n//     });\r\n\r\n//     return documents;\r\n//   } catch (error) {\r\n//     console.error(\"Error getting documents: \", error);\r\n//     showNotification(\"error\", \"Something went wrong, please try again\", 90000);\r\n//     return [];\r\n//   }\r\n// };\r\n\r\n\r\n// const getFirestoreDocument = async (collectionName, docID) => {\r\n//   try {\r\n//     const docRef = doc(db, collectionName, docID);\r\n//     const docSnap = await getDoc(docRef);\r\n//     if (docSnap.exists()) {\r\n//       return docSnap.data();\r\n//     } else {\r\n//       console.log(\"No such document! doc_id:\", docID);\r\n//       throw new Error(\"Something went wrong :(\");\r\n//     }\r\n//   } catch (error) {\r\n//     const confirmationObj = await showAlert(\r\n//       \"error\",\r\n//       \"Something went wrong :(\",\r\n//       \"Please try again\",\r\n//       \"Try again!\"\r\n//     );\r\n//     if (confirmationObj.isConfirmed) {\r\n//       window.location.reload();\r\n//     }\r\n//     return error;\r\n//   }\r\n// };\r\n\r\n// const updateFirestoreDocument = async (\r\n//   collectionName,\r\n//   docID,\r\n//   updatedObj\r\n// ) => {\r\n//   const docRef = doc(db, collectionName, docID);\r\n\r\n//   for (const fieldName in updatedObj) {\r\n//     try {\r\n//       const data = {};\r\n//       const fieldValue = updatedObj[fieldName];\r\n//       data[fieldName] = fieldValue\r\n//       const updateTask = await updateDoc(docRef, data); \r\n//       console.log(updateTask)\r\n//     } catch (error) {\r\n//       console.log(error)\r\n//       const confirmationObj = await showConfirmationDialog(\r\n//         \"error\",\r\n//         \"Something went wrong while saving changes to the document :(\",\r\n//         \"Please try again\",\r\n//         \"Refresh\",\r\n//         \"Go to the dashboard\"\r\n//       );\r\n//       if (confirmationObj.isConfirmed) {\r\n//         window.location.reload();\r\n//       }else if(confirmationObj.isDenied){\r\n//         window.location.replace(\"/admin/products\");\r\n//       }\r\n//     }   \r\n//   }\r\n// };\r\n\r\n// const checkFieldValueExistsInDB = async(collectionName, fieldName, fieldValue)=>{\r\n//   const collRef = collection(db, collectionName);\r\n\r\n//   const q = query(collRef, where(fieldName, \"==\", fieldValue));\r\n\r\n//   const querySnapshot = await getDocs(q);\r\n//   if(querySnapshot.docs.length) return true;\r\n//   return false;\r\n// }\r\n\r\n// const deleteDocumentFromFirestore = async (collectionName, document_id) => {\r\n//   let returningObj = {};\r\n//   try {\r\n//     const deleteTask = await deleteDoc(doc(db, collectionName, document_id));\r\n//     returningObj.taskCompleted = true;\r\n//   } catch (error) {\r\n//     returningObj.taskCompleted = false;\r\n//     returningObj.errorMsg = \" Something went wrong, please try again!\";\r\n//   }\r\n//   return returningObj;\r\n// };\r\n\r\n// const removeLoader = (parentElem = document.body) => {\r\n//   const allChildElems = parentElem.querySelectorAll(\".loader-wrapper\");\r\n//   allChildElems.forEach((child) => child.remove());\r\n// };\r\n\r\n// const addLoader = (\r\n//   parentElem = document.body,\r\n//   overlayLoader = false\r\n// ) => {\r\n//   const LoaderMessageArr = [\r\n//     \"Did you know? Images speak louder than words!\",\r\n//     \"Attention to detail makes all the difference!\",\r\n//     \"Fun Fact: Every product tells a story.\",\r\n//     \"Quote of the day: 'The future belongs to those who believe in the beauty of their dreams.' - Eleanor Roosevelt\",\r\n//     \"Patience is a virtue, and great products are worth the wait!\",\r\n//     \"Did you know? Quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction, and skillful execution.\",\r\n//     \"Good things come to those who wait, but better things come to those who work for it.\",\r\n//     \"Rome wasn't built in a day, and neither is a successful e-commerce store!\",\r\n//     \"Quote of the day: 'Success is not final, failure is not fatal: It is the courage to continue that counts.' - Winston Churchill\",\r\n//     \"Did you know? Innovation distinguishes between a leader and a follower.\",\r\n//     \"Believe you can and you're halfway there!\",\r\n//     \"Every great accomplishment starts with the decision to try.\",\r\n//     \"Fun Fact: Diamonds are just chunks of coal that stuck to their goals!\",\r\n//     \"Quote of the day: 'The only way to do great work is to love what you do.' - Steve Jobs\",\r\n//     // Additional messages:\r\n//     \"Tip: If this is taking longer than usual, check your internet connection.\",\r\n//     \"Success doesn't happen overnight, but it's worth the wait!\",\r\n//     \"Fun Fact: The average person spends about 2 years of their life waiting in line - your wait is almost over!\",\r\n//     \"Tip: Take a deep breath and relax, your product is almost ready to shine!\",\r\n//     \"Dream big, work hard, and your efforts will pay off!\",\r\n//     \"Fun Fact: The world's first e-commerce transaction was in 1994 for a Sting CD - we've come a long way since then!\",\r\n//     \"Tip: While you wait, why not explore our latest collections for some inspiration?\",\r\n//     \"The journey to success is paved with patience and perseverance - you're on the right path!\",\r\n//     \"Fun Fact: The longest recorded time spent waiting on hold is 15 hours - luckily, your wait won't be that long!\",\r\n//     \"Tip: Trust the process, and soon you'll see the results you've been waiting for!\",\r\n// ];\r\n//   if (parentElem == null || parentElem == undefined) return;\r\n//   const numOfMsgs = LoaderMessageArr.length;\r\n//   let currentMsgIndex=0;\r\n\r\n//   if (overlayLoader) {\r\n//     parentElem.innerHTML += `<div class=\"loader-wrapper overlay\">\r\n//     <div class=\"loader\">\r\n//         <img id=\"loadingImg\" src=\"https://firebasestorage.googleapis.com/v0/b/arux-24899.appspot.com/o/assets%2F1490.gif?alt=media&token=39b08a65-0a7f-4c60-bff2-8635da385328\" alt=\"${LoaderMessageArr[0]}\"\r\n//         draggable=\"false\"\r\n//         oncontextmenu=\"return false\">\r\n\r\n//     </div>\r\n//     <p class=\"loader-msg\" id=\"LoadingMsg\">${LoaderMessageArr[0]}</p>\r\n//     </div>`;\r\n//   } else {\r\n//     parentElem.innerHTML += `<div class=\"loader-wrapper\">\r\n//     <div class=\"loader\">\r\n//         <img id=\"loadingImg\" src=\"https://firebasestorage.googleapis.com/v0/b/arux-24899.appspot.com/o/assets%2F1490.gif?alt=media&token=39b08a65-0a7f-4c60-bff2-8635da385328\" alt=\"${LoaderMessageArr[0]}\"\r\n//         draggable=\"false\"\r\n//         oncontextmenu=\"return false\">\r\n\r\n//     </div>\r\n//     <p class=\"loader-msg\" id=\"LoadingMsg\">${LoaderMessageArr[0]}</p>\r\n//     </div>`;\r\n//   }\r\n\r\n//   const LoadingMsgElem = document.getElementById('LoadingMsg');\r\n//   setInterval(() => {\r\n//     currentMsgIndex >= numOfMsgs ? currentMsgIndex = 0 : currentMsgIndex++\r\n//     LoadingMsgElem.innerText = LoaderMessageArr[currentMsgIndex];\r\n//     LoadingMsgElem.previousElementSibling.alt = LoaderMessageArr[currentMsgIndex];\r\n//   }, 8000);\r\n\r\n// };\r\n\r\n// const showConfirmationDialog = async (\r\n//   icon = \"success\",\r\n//   title,\r\n//   text,\r\n//   confirmationText,\r\n//   cancelButtonText\r\n// ) => {\r\n//   const showTaskCompleteAlert = await Swal.fire({\r\n//     title,\r\n//     text,\r\n//     icon,\r\n//     confirmButtonColor: \"#59748A\",\r\n//     confirmButtonText: `${confirmationText}`,\r\n//     showCancelButton: true,\r\n//     cancelButtonText,\r\n//     allowOutsideClick: false,\r\n//   });\r\n//   return showTaskCompleteAlert;\r\n// };\r\n\r\n// async function showAlert  (icon = \"success\", title, text, btnText) {\r\n//   const alert = await Swal.fire({\r\n//     icon,\r\n//     title,\r\n//     text,\r\n//     confirmButtonText: btnText,\r\n//     confirmButtonColor: \"#59748A\",\r\n//     allowOutsideClick: false\r\n//   });\r\n//   return alert\r\n// };\r\n\r\n// async function showNotification(icon, text, duration = 4000) {\r\n//   const Toast = Swal.mixin({\r\n//     toast: true,\r\n//     position: \"top\",\r\n//     customClass: {\r\n//       popup: \"colored-toast\",\r\n//     },\r\n//     showConfirmButton: false,\r\n//     timer: duration,\r\n//     timerProgressBar: true,\r\n//   });\r\n//   await Toast.fire({\r\n//     icon: icon,\r\n//     title: text,\r\n//   });\r\n// }\r\n\r\n// const preventDefaults = function (e) {\r\n//   e.preventDefault();\r\n//   e.stopPropagation();\r\n// };\r\n// const classAdder = (elem, ...classes) => {\r\n//   const classListArr = [...classes];\r\n//   classListArr.forEach((className) => {\r\n//     elem.classList.add(className);\r\n//   });\r\n// };\r\n// const classRemover = (elem, ...classes) => {\r\n//   const classListArr = [...classes];\r\n//   classListArr.forEach((className) => {\r\n//     elem.classList.remove(className);\r\n//   });\r\n// };\r\n// export {\r\n//   showMsg,\r\n//   uploadImageToFirebase,\r\n//   showConfirmationDialog,\r\n//   storeObjToDB,\r\n//   getAllFirestoreDocuments,\r\n//   getFewFirestoreDocs,\r\n//   getFirestoreDocument,\r\n//   checkFieldValueExistsInDB,\r\n//   updateFirestoreDocument,\r\n//   deleteDocumentFromFirestore,\r\n//   removeLoader,\r\n//   addLoader,\r\n//   showAlert,\r\n//   showNotification,\r\n//   preventDefaults,\r\n//   classAdder,\r\n//   classRemover,\r\n// };\r\n\n\n//# sourceURL=webpack://arux/./src/js/admin-modules.js?");

/***/ }),

/***/ "./src/js/client_side-modules.js":
/*!***************************************!*\
  !*** ./src/js/client_side-modules.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProductToDom: () => (/* binding */ addProductToDom),\n/* harmony export */   removeCertainClassedElemsFromDom: () => (/* binding */ removeCertainClassedElemsFromDom)\n/* harmony export */ });\n\r\n\r\nfunction addProductToDom(elem, product, productId=\"demo_id\"){\r\n    elem.innerHTML += \r\n    `\r\n    <a class=\"Product-card\" href=\"/Product?id=${productId}\" role=\"not-link\">\r\n                    <div class=\"discount-label\">-20%</div>\r\n                    <img loading=\"lazy\" class=\"skeleton-loading\" src=\"${product.primary_img}\" alt=\"${product.title}\">\r\n                    <h4>${product.title}</h4>\r\n                    <div class=\"prices\">\r\n                        Rs.${product.price}\r\n                        <p class=\"price-compared\">$2000</p>\r\n                    </div>\r\n    </a>`\r\n}\r\n\r\nfunction removeCertainClassedElemsFromDom(elemCon, elemClass){\r\n    const allElems = elemCon.querySelectorAll(`.${elemClass}`);\r\n\r\n    allElems.forEach((elem)=>{\r\n        elem.remove()\r\n    }) \r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://arux/./src/js/client_side-modules.js?");

/***/ }),

/***/ "./src/js/products-menu.js":
/*!*********************************!*\
  !*** ./src/js/products-menu.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _admin_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin-modules */ \"./src/js/admin-modules.js\");\n/* harmony import */ var _admin_modules__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_admin_modules__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _client_side_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client_side-modules */ \"./src/js/client_side-modules.js\");\n//essential imports\r\n\r\n\r\n\r\n//variables\r\nconst products_con = document.getElementById('products-con');\r\n\r\n(async ()=>{\r\n\r\n    if(window.navigator.onLine){\r\n        const allProducts = await (0,_admin_modules__WEBPACK_IMPORTED_MODULE_0__.getAllFirestoreDocuments)(\"Products\");\r\n        if(allProducts.docs.length){\r\n            (0,_client_side_modules__WEBPACK_IMPORTED_MODULE_1__.removeCertainClassedElemsFromDom)(products_con, \"placeolder-products\");\r\n\r\n            allProducts.forEach((product)=>{\r\n                (0,_client_side_modules__WEBPACK_IMPORTED_MODULE_1__.addProductToDom)(products_con,product.data(), product.id)\r\n            })\r\n        }else{\r\n            (0,_admin_modules__WEBPACK_IMPORTED_MODULE_0__.showNotification)(\"error\",\"You're having internet issues\",\"Check your internet connection and retry\");\r\n        }\r\n    }else{\r\n        const alerReponse = await showAlert(\"error\",\"You seem offline\",\"Check your internet connection and retry\",\"Retry\");\r\n        if(alerReponse.isConfirmed) {window.location.reload()}\r\n    }\r\n    \r\n})();\r\n\n\n//# sourceURL=webpack://arux/./src/js/products-menu.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/products-menu.js");
/******/ 	
/******/ })()
;