// getting elements from dom
const slider = document.querySelector(".carousel__slider");
const slides = [...slider.children];
const nav_dot_con = document.getElementById('carousel__nav');

const nav_dots = [...nav_dot_con.children]
console.log(``,nav_dots[0].getBoundingClientRect())
//functions
function moveLeft() {
  const current_slide = slider.querySelector(".ative_slide"); //getting the current active slide from all the slides
  const next_slide =
    current_slide == null ? slides[0] : current_slide.nextSibling; //checking if we have reached to the end of slides to handle it accordingly
  if (!next_slide) {
    //if we have reached the end
    slider.style.transform = `translateX(${0})`;
    current_slide.classList.remove("ative_slide");
    slides[0].classList.add("ative_slide");

    nav_dot_con.querySelector(".active").classList.remove("active");
    nav_dot_con.children[0].classList.add("active")
  } else {
    //if we haven't slide as much as the width of a slide
    const amountToSlide = next_slide.getBoundingClientRect().width; //getting the width of a slide

    slider.style.transform = `translateX(-${
      amountToSlide * slides.indexOf(next_slide)
    }px)`; //applying the styles to scroll accordingly

    current_slide.classList.remove("ative_slide");
    next_slide.classList.add("ative_slide");
    //removing the active slide class to resolve future conflicts


    nav_dot_con.querySelector(".active").nextSibling.classList.add("active")
    nav_dot_con.querySelector(".active").classList.remove("active")
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

//getting slides to there position and adding that many dots to the dot con
for (let i = 0; i < slides.length; i++) {
  const slideWidth = slides[i].getBoundingClientRect().width;
  slides[i].style.left = `${i * slideWidth}px`;
}

setInterval(() => {
    moveLeft()
}, 1000);

