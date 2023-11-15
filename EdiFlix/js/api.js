"use strict";
const api_key = "048baf30f89eb2f23ebe0d28726feeb7";
const imageBaseURL = "https://image.tmdb.org/t/p/";

//fecth data from server using the url and passes the result in jsonn data to callback function, aong with optional parameter if has optional parameter
const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam));
};

export { imageBaseURL, api_key, fetchDataFromServer };
