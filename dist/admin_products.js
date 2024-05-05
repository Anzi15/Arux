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

/***/ "./src/js/admin-products.js":
/*!**********************************!*\
  !*** ./src/js/admin-products.js ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _admin_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin-modules */ \"./src/js/admin-modules.js\");\n/* harmony import */ var _admin_modules__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_admin_modules__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n\r\n// import {route} from \"./url-routing\";\r\n\r\n// getting elems from dom \r\nconst productsContainer = document.getElementById('section__products__grid');\r\n\r\nconst allProducts = await (0,_admin_modules__WEBPACK_IMPORTED_MODULE_0__.getAllFirestoreDocuments)(\"Products\");\r\n\r\n(()=>{\r\n    allProducts.forEach(product => {\r\n        addProductToDom(productsContainer, product.id, product.data())\r\n    });\r\n\r\n    (0,_admin_modules__WEBPACK_IMPORTED_MODULE_0__.removeLoader)(productsContainer);\r\n\r\n    const productDeleteBtns = productsContainer.querySelectorAll(\".product__delete-btn\");\r\n\r\n    productDeleteBtns.forEach((btn) =>{\r\n        btn.addEventListener(\"click\",(e)=>{\r\n            deleteProduct(btn.dataset.product_id)\r\n        })\r\n    })\r\n\r\n})()\r\n//functions\r\n\r\n\r\nasync function deleteProduct(product_id){\r\n    const confirmAlert = await (0,_admin_modules__WEBPACK_IMPORTED_MODULE_0__.showConfirmationDialog)(\"warning\", \"Are you sure to delete this product?\", \"This can't be un-done, so choose wisely!\", \"Delete\", \"Cancel\");\r\n\r\n    if(confirmAlert.isConfirmed){ \r\n        const productElemInDom = productsContainer.querySelector(`[product_id=\"${product_id}\"]`);\r\n\r\n        if(productElemInDom){\r\n            const deleteTask = await (0,_admin_modules__WEBPACK_IMPORTED_MODULE_0__.deleteDocumentFromFirestore)(\"Products\", product_id);\r\n            if(deleteTask.taskCompleted){\r\n                (0,_admin_modules__WEBPACK_IMPORTED_MODULE_0__.showNotification)(\"success\",\"Product deleted successfully\");\r\n                productElemInDom.remove();\r\n            }else{\r\n                (0,_admin_modules__WEBPACK_IMPORTED_MODULE_0__.showNotification)(\"error\", deleteTask.errorMsg) \r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n//func to insert products into dom\r\nfunction addProductToDom(elem, product_id, product_Data){\r\n    elem.innerHTML += \r\n    `\r\n    <div product_id=\"${product_id}\"  class=\"product\" data-product_id=\"${product_id}\">\r\n    <img src=\"${product_Data.primary_img}\" alt=\"\" class=\"product__img\">\r\n    <div class=\"product__content-con\">\r\n        <h3 class=\"product__title\">\r\n            ${product_Data.title}\r\n        </h3>\r\n        <div class=\"product__detail-con\">\r\n            <p class=\"product__price\">Rs.${product_Data.price}</p>\r\n            <p class=\"product__order\">shipping fees: ${product_Data.Shipping_fees}</p>\r\n        </div>\r\n        <div class=\"product__config-con\">\r\n            <a href=\"/admin/Products/edit?product-ID=${product_id}\" \r\n            class=\"product__edit-btn\" id=\"product__edit-btn-${product_id}\" data-product_id=\"${product_id}\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" class=\"bi bi-pencil-square\" viewBox=\"0 0 16 16\">\r\n                    <path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"/>\r\n                    <path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z\"/>\r\n                </svg>\r\n            </a>\r\n\r\n            <button class=\"product__delete-btn\" id=\"product__delete-btn-${product_id}\" data-product_id=\"${product_id}\">\r\n                <svg data-product_id=\"${product_id}\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\">\r\n                    <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z\"/>\r\n                    <path d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z\"/>\r\n                  </svg>\r\n            </button>\r\n        </div>\r\n    </div>\r\n</div>\r\n    `\r\n}\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://arux/./src/js/admin-products.js?");

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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/admin-products.js");
/******/ 	
/******/ })()
;