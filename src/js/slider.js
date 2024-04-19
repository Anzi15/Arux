"use strict";

// getting elements from dom
const slider = document.querySelector(".carousel__slider");

const slides = [...slider.children];

const amountToSlide = slides[0].getBoundingClientRect().width;

const sliderDotCon = document.getElementById('carousel__nav');

let navDots = [];

//functions

//getting slides to there position and adding that many dots to the dot con
(()=>{
  for (let i = 0; i < slides.length; i++) {
    const slideWidth = slides[i].getBoundingClientRect().width;
    slides[i].style.left = `${i * slideWidth}px`;

    //populating the slider's nav dots accordingly 
    const newDot = document.createElement("div");
    newDot.classList.add("carousel__nav-dot");
    sliderDotCon.appendChild(newDot);
  }
  navDots = [...sliderDotCon.children];
  navDots[0].classList.add("active")
})();


const resetSlider = (currentSlide)=>{
  //reseting slides..
  slider.style.transform = `translateX(${0})`;

  currentSlide.classList.remove("active_slide");
  slides[0].classList.add("active_slide");

  //reseting navigation dots 
  syncDotWithSlide(0)
}

const moveToNextSlide = function () {
  const currentSlide = slider.querySelector(".active_slide");
  //getting the current active slide from all the slides
  const next_slide =
  currentSlide == null ? slides[0] : currentSlide.nextElementSibling; //checking if we have reached to the end of slides to handle it accordingly

  if (next_slide) {
    slider.style.transform = `translateX(-${
      amountToSlide * slides.indexOf(next_slide)
    }px)`; //applying the styles to scroll accordingly

    currentSlide.classList.remove("active_slide");
    next_slide.classList.add("active_slide");

    // moving the indication dots according to the slide 
    syncDotWithSlide(slides.indexOf(next_slide))
  } else {
    resetSlider(currentSlide)
  }
}

//basically does the same thing as moveToNextSlide() function but in opposite direction
const moveToPrevSlide = function () {
  const currentSlide = slider.querySelector(".active_slide");
  const prev_slide = currentSlide.previousElementSibling;

  if (prev_slide) {
    slider.style.transform = `translateX(-${
      amountToSlide * slides.indexOf(prev_slide)
    }px)`;

    currentSlide.classList.remove("active_slide");
    prev_slide.classList.add("active_slide");

    syncDotWithSlide(slides.indexOf(prev_slide))
  } else {
    const lastSlideIndex = slides.length - 1;
    slider.style.transform = `translateX(-${amountToSlide * lastSlideIndex}px)`;

    currentSlide.classList.remove("active_slide");
    slider.lastElementChild.classList.add("active_slide");
    
    syncDotWithSlide(slides.length-1)

  }
}

//moving the slides according to the dots clicked
function dotSlide(e){
  const currentSlide = slider.querySelector(".active_slide"); //getting the current active slide
  const index = navDots.indexOf(e.target); //getting the index of the dot clicked
  const amountToSlide = slides[index].getBoundingClientRect().width; //getting the width of a single slide
  slider.style.transform = `translateX(-${amountToSlide * index}px)`; //slide Slide's withs multiplied by the index
  
  //changing the classes of slides to avoid future conflicts
  currentSlide.classList.remove("active_slide");
  slides[index].classList.add("active_slide");

  //changing the classes of dots for indication
  e.target.parentElement.querySelector(".active").classList.remove("active")
  navDots[index].classList.add("active")
}

function syncDotWithSlide (indexOfSlide){
  sliderDotCon.querySelector(".active").classList.remove("active");
  navDots[indexOfSlide].classList.add("active");
}


const autoCarousal = setInterval(() => {
    moveToNextSlide()
}, 5000);

// event listner 
navDots.forEach((dot)=>{
  dot.addEventListener("click",dotSlide)
})