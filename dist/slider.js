(()=>{const e=document.querySelector(".carousel__slider"),t=[...e.children],s=document.getElementById("carousel__nav"),i=[...s.children];function a(){const i=e.querySelector(".ative_slide"),a=null==i?t[0]:i.nextSibling;if(a){const l=a.getBoundingClientRect().width;e.style.transform=`translateX(-${l*t.indexOf(a)}px)`,i.classList.remove("ative_slide"),a.classList.add("ative_slide"),s.querySelector(".active").nextSibling.classList.add("active"),s.querySelector(".active").classList.remove("active")}else e.style.transform="translateX(0)",i.classList.remove("ative_slide"),t[0].classList.add("ative_slide"),s.querySelector(".active").classList.remove("active"),s.children[0].classList.add("active")}function l(s){const a=e.querySelector(".ative_slide"),l=i.indexOf(s.target),c=t[l].getBoundingClientRect().width;e.style.transform=`translateX(-${c*l}px)`,a.classList.remove("ative_slide"),t[l].classList.add("ative_slide"),s.target.parentElement.querySelector(".active").classList.remove("active"),i[l].classList.add("active")}for(let e=0;e<t.length;e++){const s=t[e].getBoundingClientRect().width;t[e].style.left=e*s+"px"}setInterval((()=>{a()}),5e3),i.forEach((e=>{e.addEventListener("click",l)}));let c=0,n=0;e.addEventListener("touchstart",(e=>{c=e.changedTouches[0].screenX})),e.addEventListener("touchend",(l=>{n=l.changedTouches[0].screenX,n<c&&a(),n>c&&function(){const a=e.querySelector(".ative_slide"),l=a.previousSibling,c=a.getBoundingClientRect().width;if(l){e.style.transform=`translateX(-${c*t.indexOf(l)}px)`,a.classList.remove("ative_slide"),l.classList.add("ative_slide");const n=s.querySelector(".active"),r=i.indexOf(n)-1;i[r].classList.add("active"),n.classList.remove("active")}else{const l=t.length-1;e.style.transform=`translateX(-${c*l}px)`,a.classList.remove("ative_slide"),t[l].classList.add("ative_slide");const n=i.length-1;i[n].classList.add("active"),s.querySelector(".active").classList.remove("active")}}()}))})();