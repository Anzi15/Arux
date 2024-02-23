// getting elements from dom
const slider = document.querySelector(".carousel__slider");
const slides = [...slider.children];
const prev_btn = document.getElementById("prev_btn");
const next_btn = document.getElementById("next_btn");

//functions
function moveLeft() {
  const current_slide = slider.querySelector(".ative_slide"); //getting the current active slide from all the slides
  const next_slide =
    current_slide.nextSibling == null ? slides[0] : current_slide.nextSibling; //checking if we have reached to the end of slides to handle it accordingly
  if (!next_slide) {
    //if we have reached the end
    slider.style.transform = `translateX(${0})`;
    current_slide.classList.remove("ative_slide");
    slides[0].classList.add("ative_slide");
  } else {
    //if we haven't slide as much as the width of a slide
    const amountToSlide = next_slide.getBoundingClientRect().width; //getting the width of a slide

    slider.style.transform = `translateX(-${
      amountToSlide * slides.indexOf(next_slide)
    }px)`; //applying the styles to scroll accordingly

    current_slide.classList.remove("ative_slide");
    next_slide.classList.add("ative_slide");
    //removing the active slide class to resolve future conflicts
  }
}

function moveRight() {
  const current_slide = slider.querySelector(".ative_slide");
  const prev_slide = current_slide.previousSibling;
  const amountToSlide = current_slide.getBoundingClientRect().width;

  if (prev_slide) {
    slider.style.transform = `translateX(-${
      amountToSlide * slides.indexOf(prev_slide)
    }px)`;
    current_slide.classList.remove("ative_slide");
    prev_slide.classList.add("ative_slide");
  } else {
    const lastSlideIndex = slides.length - 1;
    slider.style.transform = `translateX(-${amountToSlide * lastSlideIndex}px)`;

    current_slide.classList.remove("ative_slide");
    slides[lastSlideIndex].classList.add("ative_slide");
  }
}

//getting slides to there position
for (let i = 0; i < slides.length; i++) {
  const slideWidth = slides[i].getBoundingClientRect().width;
  slides[i].style.left = `${i * slideWidth}px`;
}

prev_btn.addEventListener("click", moveRight);
next_btn.addEventListener("click", moveLeft);
