const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll(".controlls");
const sectBtn = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");

//galery
const gallery = document.querySelectorAll(".gallery .image"),
previewBox = document.querySelector(".preview-box"),
previewImg =previewBox.querySelector("img"),
closeIcon = previewBox.querySelector(".icon"),
currentImg = previewBox.querySelector(".current-img"),
totalImg = previewBox.querySelector(".total-img"),
shadow = document.querySelector(".shadow");


window.onload = ()=>{//once window loaded
    for ( let i = 0; i < gallery.length; i++) {
        totalImg.textContent = gallery.length;
        let newIndex = i;
        let clickImgIndex;
        gallery[i].onclick = ()=>{
            clickImgIndex = newIndex;
            console.log(i);
            function preview(){
                currentImg.textContent = newIndex + 1;
                let selectedImgurl = gallery[newIndex].querySelector("img").src;
                previewImg.src = selectedImgurl;

            }
            //prev next btn
            const prevBtn = document.querySelector(".prev");
            const nextBtn = document.querySelector(".next");
            if(newIndex == 0){
                prevBtn.style.display = "none";
            }
            if(newIndex >= gallery.length - 1){
                nextBtn.style.display = "none";
            }
            prevBtn.onclick = ()=>{
                newIndex--;
                if(newIndex == 0){
                    preview();
                    prevBtn.style.display = "none";
                }else{
                    preview();
                    nextBtn.style.display = "block";
                }
            }
            nextBtn.onclick = ()=>{
                newIndex++;
                if(newIndex >= gallery.length - 1){
                    preview();
                    nextBtn.style.display = "none";
                }else{
                    preview();
                    prevBtn.style.display = "block";
                }
            }

            preview();
            previewBox.classList.add("show");
            shadow.style.display = "block";
            document.querySelector(".wrapper").style.overflow = "hidden";

            closeIcon.onclick = ()=>{
                newIndex = clickImgIndex;
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
                previewBox.classList.remove("show");
                shadow.style.display = "none";
                document.querySelector(".wrapper").style.overflow = "auto";
            }
        }
    }
}

//end of galery

function pageTransitions(){
    //btn click active class
    for(let i = 0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener("click", function(){
            let currentBtn = document.querySelectorAll(".active-btn");
            currentBtn[0].className = currentBtn[0].className.replace("active-btn", "");
            this.className += " active-btn";
        })
    }
    //section active class
    allSections.addEventListener("click", (e) =>{
        const id = e.target.dataset.id;
        if(id){
            //remove selected from the other btns
            sectBtn.forEach((btn) =>{
                btn.classList.remove("active")
            })
            e.target.classList.add("active")

            //hide other sections
            sections.forEach((section) =>{
                section.classList.remove("active")
            })

            const element = document.getElementById(id);
            element.classList.add("active");
        }
    })

    //toggle theme
    const themeBtn = document.querySelector(".theme-btn")
    themeBtn.addEventListener("click", () =>{
        let element = document.body;
        element.classList.toggle("light-mode")
    })
}
pageTransitions();

//16;16
