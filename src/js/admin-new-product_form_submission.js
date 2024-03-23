"use strict";
// essential imports 
import {initializeApp} from "firebase/app"
// import { 
//     getStorage, 
//     ref, 
//     uploadBytes,
//     uploadBytesResumable, 
//     getDownloadURL 
// } from "firebase/storage";
import {v4}  from "uuid";
import { getFirestore } from "firebase/firestore";

//getting elems form dom
const forms_section = document.getElementById('forms_section');
const form_step_1 = document.querySelector('#form_step_1');
const form_step_2 = document.querySelector('#form_step_2');
let product_data_obj = {};
let imagesObj = {};
const prev_step_btn = document.querySelector('#prev_step_btn');
const form_msg_display = document.querySelector('#form__msg-display');

//firebase
//my firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtDQsUvkfEiuD-o48LosmunhQ5YzPP94Y",
    authDomain: "arux-24899.firebaseapp.com",
    projectId: "arux-24899",
    storageBucket: "arux-24899.appspot.com",
    messagingSenderId: "95411992302",
    appId: "1:95411992302:web:336d7a38ca931af33225ff",
    measurementId: "G-LXN5WG6V2S",
    storageBucket: "https://arux-24899.appspot.com/"
};

const app = initializeApp(firebaseConfig)
  

//functions
const hasEmptySrc = (dropAreaArr) => {
    for (const area of dropAreaArr) {
        const img = area.querySelector('.preview-img');

        if (img.src.trim() === "" || img.src.trim() === window.location.origin + window.location.pathname) {
            const msg = area.querySelector('.image-upload-msg');
            msg.classList.add('red');
            msg.innerHTML = `This can't be empty!`;
            return true; 
        }
    }

    return false; 
};

const updateSteps = (direction='next')=>{
    const step_indicator = document.querySelector('.step-indicator');
    const currentActiveStep = step_indicator.querySelectorAll('.active');
    const currentActiveForm = document.querySelector(".currentActiveForm");


    if(direction == 'next'){
        currentActiveForm.nextElementSibling.classList.add("currentActiveForm");
        currentActiveForm.nextElementSibling.classList.remove("hidden");

        currentActiveStep[0].nextElementSibling.classList.add('active');

    }else if(direction == 'previous'){
        currentActiveForm.previousElementSibling.classList.add("currentActiveForm");
        currentActiveForm.previousElementSibling.classList.remove("hidden");
        
        currentActiveStep[currentActiveForm.length - 1].classList.remove('active');
    }
    
    currentActiveForm.classList.remove("currentActiveForm");
    currentActiveForm.classList.add("hidden");
}

// Function to upload image and get url
const uploadImgToImgBB = async function (file) {
    const apiKey = '5d7edd7bd9bc6cbfa53d30c3e83e3970';
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', apiKey);

    try {
        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        } else {
            const data = await response.json();
            return data.data.url; // URL of the uploaded image
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};

const storeProductToDB = (productDataObj, productImgObj)=>{
    const combinedData = {...productDataObj};

    combinedData.primary_img = uploadImgToImgBB(productImgObj[primary_img]);

    combinedData.secondary_1 = uploadImgToImgBB(productImgObj.secondary_img_0);

    combinedData.secondary_2 = uploadImgToImgBB(productImgObj.secondary_img_1);

    console.log(combinedData);

}


//event listners
form_step_1.addEventListener('submit',(e)=>{
    e.preventDefault();
    const dropAreas = [...e.target.querySelectorAll('.image-upload')];
    
    if(!hasEmptySrc(dropAreas)){
        
        const toStoreElems = [...e.target.querySelectorAll('[data-identification_name]')];
        const primary_img = e.target.querySelector('#primary_img').src;
        const secondary_imgs = [...e.target.querySelectorAll('.secondary_image_preview')]

        const images = {
            primary_img
        }

        for (let i = 0; i < secondary_imgs.length; i++) {
            images[`secondary_img_${i}`] = secondary_imgs[i].src       
        }


        imagesObj = {...images}
        
        toStoreElems.forEach((elem)=>{
            const feildName = elem.dataset.identification_name
            product_data_obj[feildName] = elem.value;
        })
        console.log(``,toStoreElems, images, imagesObj)
        updateSteps()
    }
})

form_step_2.addEventListener('submit',(e)=>{
    e.preventDefault();
    const toStoreElems = [...e.target.querySelectorAll('[data-identification_name]')];

    toStoreElems.forEach((elem)=>{
        const feildName = elem.dataset.identification_name
        product_data_obj[feildName] = elem.value;
    })

    storeProductToDB(product_data_obj,imagesObj)
})

window.onload = ()=>{
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    const stepParam = urlParams.get('step');

    if(stepParam){
        currentStep = stepParam;
    }
}

prev_step_btn.addEventListener('click',()=>{
    updateSteps('previous')
})
