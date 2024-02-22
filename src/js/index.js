const slider = document.querySelector('.carousel__slider');
const slides = [...slider.children]

function moveLeft() {
    const current_slide = slider.querySelector(".ative_slide")
    const next_slide = current_slide == null ? slides[0] : current_slide.nextSibling;
    if(!next_slide){
        slider.style.transform = `translateX(${0})`;
        current_slide.classList.remove("ative_slide")
        slides[0].classList.add("ative_slide")
    }else{
        const amountToSlide = next_slide.getBoundingClientRect().width
    
        slider.style.transform = `translateX(-${amountToSlide * slides.indexOf(next_slide)}px)`
        current_slide.classList.remove("ative_slide");
        next_slide.classList.add("ative_slide");
    }
}

function moveRight() {
   
}

//getting slides to there position
for (let i = 0; i < slides.length; i++) {
    const slideWidth = slides[i].getBoundingClientRect().width
    slides[i].style.left = `${i * slideWidth }px`
}

const prev_btn = document.getElementById('prev_btn');
const next_btn = document.getElementById('next_btn');

prev_btn.addEventListener("click",moveRight)
next_btn.addEventListener("click",moveLeft)