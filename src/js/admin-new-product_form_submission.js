"use strict";

//getting elems form dom
const forms_section = document.getElementById('forms_section');
const form_step_1 = document.querySelector('#form_step_1');
const form_step_2 = document.querySelector('#form_step_2');
let currentStep = 1;
let imagesObj;
const prev_step_btn = document.querySelector('#prev_step_btn');
const form_msg_display = document.querySelector('#form__msg-display');

//functions
const checkEmptySrc = (dropAreaArr)=>{
    const arr = [...dropAreaArr];
    let areEmpty = false;
    arr.forEach((area)=>{
        const img = area.querySelector('.preview-img');
        
        if(img.src.trim() == window.location.origin + window.location.pathname){
            areEmpty = true;
            const msg = area.querySelector('.image-upload-msg');
            msg.innerHTML = `This can't be empty!`;
            msg.classList.add('red')
        }
    })
    return areEmpty
}
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
const prepareToUpload = (locallySavedKey)=>{
    const productObj = JSON.parse(localStorage.getItem(locallySavedKey));

    forms_section.innerHTML = `

    <div class ="loader-con">
        Uploading image please wait...
        <div class="loader"></div>
    </div>
    `
}


//event listners
form_step_1.addEventListener('submit',(e)=>{
    e.preventDefault();
    const dropAreas = [...e.target.querySelectorAll('.image-upload')]
    
    if(!checkEmptySrc(dropAreas)){
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
        imagesObj = images
        
        toStoreElems.forEach((elem)=>{
            const feildName = elem.dataset.identification_name
            gatherDataOnlocalStorage("product_to_be_Added", feildName, elem.value);
        })
    }

    updateSteps()
})

form_step_2.addEventListener('submit',(e)=>{
    e.preventDefault();
    const toStoreElems = [...e.target.querySelectorAll('[data-identification_name]')];
    toStoreElems.forEach((elem)=>{
        const feildName = elem.dataset.identification_name
        gatherDataOnlocalStorage("product_to_be_Added", feildName, elem.value);
    })

    prepareToUpload("product_to_be_Added")
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
