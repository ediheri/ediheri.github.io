const reaper = document.querySelector(".reaper"),
musicImg = reaper.querySelector(".img-area img"),
musicName = reaper.querySelector(".song-details .name"),
musicArtist = reaper.querySelector(".song-details .artist"),
mainAudio = reaper.querySelector("#main-audio"),
playPauseBtn = reaper.querySelector(".play-pause"),
prevBtn = reaper.querySelector("#prev"),
nextBtn = reaper.querySelector("#next"),
progressArea = reaper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = reaper.querySelector(".music-list"),
showMoreBtn = reaper.querySelector("#more-music"),
hideMusicBtn = musicList.querySelector("#close");





let musicIndex = 2;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playingNow();
})

function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `img/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//play music function
function playMusic(){
    reaper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}
//pause music function
function pauseMusic(){
    reaper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}



//prev msc funct
function prevMusic(){
    musicIndex--;
    //if musindex less than array length
    musicIndex < 1 ? musicIndex = allMusic.length :musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//next msc funct
function nextMusic(){
    musicIndex++;
    //if musindex more than array lengtgh
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//play pause event
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = reaper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
})

//next music event//
nextBtn.addEventListener("click", ()=>{
    nextMusic();
});

//prev music event//
prevBtn.addEventListener("click", ()=>{
    prevMusic();
});



//progress bar
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //current time
    const duration = e.target.duration; //total time
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`;

    
        let musicCurrentTime = reaper.querySelector(".current"),
        musicDuration = reaper.querySelector(".duration");

        mainAudio.addEventListener("loadeddata", ()=>{

        //total song duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;

    });
            //current song duration
            let currentMin = Math.floor(currentTime / 60);
            let currentSec = Math.floor(currentTime % 60);
            if(currentSec < 10){
                currentSec = `0${currentSec}`;
            }
            musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//progress bar

progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});

//repeat suffle according to the icon
const repeatBtn = reaper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText;

    switch(getText){
        case "repeat":      //repeat one
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "song looped")
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "playback shuffle")
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "playlist looped")
            break;
    }
});

//shuffle accoring to the funnction of player
mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;

    switch(getText){
        case "repeat":      //repeat one
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do{
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            }while(musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            break;
    }
});



//show menu list
showMoreBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});
hideMusicBtn.addEventListener("click", ()=>{
    showMoreBtn.click();
});


const ulTag = reaper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                    <div class="row">
                    <span>${allMusic[i].name}</span>
                    <p>${allMusic[i].artist}</p>
                    </div>
                    <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                    <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){
        totalSec = `0${totalSec}`;
    };

    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
    liAudioDurationTag.setAttribute ("t-duration", `${totalMin}:${totalSec}`);
  });
};

//playing list
const allLitags = ulTag.querySelectorAll("li");
function playingNow(){
   
    for (let j = 0; j < allLitags.length; j++) {
        let audioTag = allLitags[j].querySelector("audio-duration");
        if(allLitags[j].classList.contains("playing")){
            allLitags[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }
        if(allLitags[j].getAttribute("li-index") == musicIndex){
            allLitags[j].classList.add("playing");
            audioTag.innerText = "playing";
        }
        allLitags [j].setAttribute("onclick", "clicked(this)");
    }
}

//playing function
function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}