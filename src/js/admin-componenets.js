//getting elems 
const sidebar_toggler_btn = document.getElementById('sidebar_toggler');
const sidebar = document.getElementById("sidebar");

//functions


//eventlistners
sidebar_toggler_btn.addEventListener('click',()=>{
    sidebar.classList.toggle('sidebar_visible')
})