"use strict";

//getting elems form dom
const form_step_1 = document.getElementById('form_step_1');

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

        let form_1_content = {
            image:{
                primary_img,
                secondary_imgs,
            }
        };
        toStoreElems.forEach((elem)=>{
            const feildName = elem.dataset.identification_name
            form_1_content[feildName] = elem.value
        })
        console.log(``,JSON.stringify(form_1_content))
        // localStorage.setItem('form_1_content')
    }
})