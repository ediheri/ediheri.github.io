// const form = document.querySelector("form"),
// statusTxt = form.querySelector(".button-area span");

// form.onsubmit = (e)=>{
//     e.preventDefault();
//     statusTxt.style.color = "#0D6EFD";
//     statusTxt.style.display = "block";
//     statusTxt.innerText = "Sending your message...";
//     form.classList.add("disabled");

//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", "message.php", true);
//     xhr.onload = ()=>{
//         if(xhr.readyState == 4 && xhr.status == 200){
//             let response = xhr.response;
//             if(response.indexOf("email and password field is required!") != -1 || response.indexOf("emter a valid email address") || response.indexOf("Sorry, failed to send your message!")){
//                 statusTxt.style.color = "red";
//             }else{
//                 form.reset();
//                 setTimeout(()=>{
//                     statusTxt.style.display = "name";
//                 }, 3000);
//             }

//             statusTxt.innerText = response;
//             form.classList.remove("disabled");
//         }
//     }
//     let formData = new FormData(form);
//     xhr.send(formData);
// }
