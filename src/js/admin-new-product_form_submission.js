"use strict";
// essential imports 
import {initializeApp} from "firebase/app"
import { getStorage, ref, uploadBytes,uploadBytesResumable, getDownloadURL } from "firebase/storage";

//getting elems form dom
const forms_section = document.getElementById('forms_section');
const form_step_1 = document.querySelector('#form_step_1');
const form_step_2 = document.querySelector('#form_step_2');
let currentStep = 1;
let imagesObj;
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
const gatherDataOnlocalStorage = (storageKey, key, value)=>{
    const obj = localStorage.getItem(storageKey) == null ? {} : JSON.parse(localStorage.getItem(storageKey));

    if(obj){
        obj[key] = value;
    }
    const stringifiedObj = JSON.stringify(obj)
    localStorage.setItem(storageKey, stringifiedObj)

}
const prepareToUpload = (imgsObj)=>{
    const storage = getStorage();
    const storageRef = ref(storage, 'Products');
    let imgNum = 0;
    const imgFileArr = [
        imgsObj.primary_img,
        imgsObj.secondary_imgs[0],
        imgsObj.secondary_imgs[1],
    ];
    const uploadedImgsURL = {secondary_imgs:[]};

    imgFileArr.forEach(file =>{
        file++;
        uploadBytes(storageRef, file).then((snapshot) => {
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                forms_section.innerHTML = `
                <div class ="loader-con">
                    Uploading image please wait...
                    <h3> ${imgNum}/${imgFileArr.length} | ${progress}% done </h3>
                    <div class="loader"></div>
                </div>
                `
            },
            (error) => {
                forms_section.innerHTML = `
                <div class ="loader-con">
                    error: ${error} <br>
                    <h3> Task failed! <a href="">Please try again.</a></h3>

                </div>
                `
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                if(imgNum < 2){
                    uploadedImgsURL[primary_img] = downloadURL
                }else{
                    uploadedImgsURL.secondary_imgs.push(downloadURL)
                }

              });
            }
          );
        });
        
        localStorage.setItem("uploadedImgsUrls", JSON.stringify(uploadedImgsURL));
    })
}


//event listners
form_step_1.addEventListener('submit',(e)=>{
    e.preventDefault();
    const dropAreas = [...e.target.querySelectorAll('.image-upload')]

     if(!hasEmptySrc(dropAreas)){
        const toStoreElems = [...e.target.querySelectorAll('[data-identification_name]')];

        const primary_img = e.target.querySelector('#primary_img').src;

        const secondary_imgs = [...e.target.querySelectorAll('.secondary_image_preview')]

        for (let i = 0; i < secondary_imgs.length; i++) {
            secondary_imgs[i] = secondary_imgs[i].src
            
        }

        const images = {
            primary_img,
            secondary_imgs,
        }
        imagesObj = {...images}
        
        toStoreElems.forEach((elem)=>{
            const feildName = elem.dataset.identification_name
            gatherDataOnlocalStorage("product_to_be_Added", feildName, elem.value);
        })
        updateSteps()
    }

})

form_step_2.addEventListener('submit',(e)=>{
    e.preventDefault();
    const toStoreElems = [...e.target.querySelectorAll('[data-identification_name]')];
    toStoreElems.forEach((elem)=>{
        const feildName = elem.dataset.identification_name
        gatherDataOnlocalStorage("product_to_be_Added", feildName, elem.value);
    })

    prepareToUpload(imagesObj);
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
