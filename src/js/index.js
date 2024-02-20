//getting elements from DOM
const track = document.querySelector('.carousel__track');
const slides = [...track.children]
const dotNav = document.querySelector('.carousel__indicators-con');
const dots = [...dotNav.children]

// variable 
let touchstartX = 0
let touchendX = 0
const slideWidth = slides[0].getBoundingClientRect().width;  

// functions 
function checkDirection() {
  if (touchendX < touchstartX) alert('swiped left!')
  if (touchendX > touchstartX) alert('swiped right!')
}

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.left = slideWidth * i + 'px';
    }


// eventlistner 

track.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

track.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
//   checkDirection()
})


// debugging consoles 
console.log(slides, dots)
