"use strict";

import { readUsedSize } from "chart.js/helpers";

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
  
 
export {
    getParamFromUrl,
    setParamInUrl
}