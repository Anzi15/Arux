(()=>{const e=document.querySelector(".carousel__track"),t=[...e.children],n=[...document.querySelector(".carousel__indicators-con").children];let c=0,o=0;const l=t[0].getBoundingClientRect().width;for(let e=0;e<t.length;e++)t[e].style.left=l*e+"px";e.addEventListener("touchstart",(e=>{c=e.changedTouches[0].screenX})),e.addEventListener("touchend",(e=>{o=e.changedTouches[0].screenX})),console.log(t,n)})(),(()=>{const e=document.querySelectorAll("[data-nav-toggler]"),t=document.getElementById("mob-nav-links");document.getElementById("dark-overlay"),e.forEach((e=>{e.addEventListener("click",(()=>{((e,...t)=>{[e].forEach((e=>{t.forEach((t=>{e.classList.toggle(t)}))}))})(t,"none")}))}))})();