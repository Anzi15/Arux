"use strict";


function getParamFromUrl(paramName) {
    const searchParams = new URLSearchParams(window.location.search);
    const paramValue = searchParams.get(paramName)
    return paramValue
}

function setParamInUrl(paramName, paramValue) {
    const url = new URL(window.location.href);
    url.searchParams.set(paramName, paramValue);
    window.history.replaceState(null, null, url);
}

function getFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
  
    return day + '/' + month + '/' + year;
  }
  
 
export {
    getParamFromUrl,
    setParamInUrl,
    getFormattedDate
}