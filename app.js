const stopBtn = document.querySelector('.stop');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.previous');
const song = document.querySelector('#audio');

const progressBar = document.querySelector('.bar');
const progressBarContaner = document.querySelector('.progress-bar')
const duration = document.querySelector('.duration');
const currentTime = document.querySelector('.current-time');

const image = document.querySelector('img');
const singer = document.querySelector('.singer');
const artist = document.querySelector('.song-name');

// Musics
const songArray = [
    {
        name : "mu-1",
        singer : "Jeremy Zucker",
        songName : "Comethru"
    },
    {
        name : "mu-2",
        singer : "Jeremy Zucker",
        songName : "Always"
    },
    {
        name : "mu-3",
        singer : "Lukas Graham",
        songName : "7 Years Old"
    },
    {
        name : "mu-4",
        singer : "The Weeknd & Ariana Grande",
        songName : "Die For You"
    },
    {
        name : "mu-5",
        singer : "Glass Animals",
        songName : "Heat Waves"
    },
    {
        name : "mu-6",
        singer : "Toosii",
        songName : "Favorite Song"
    },
    {
        name : "mu-7",
        singer : "Luke Combs",
        songName : "Love You Anyway"
    },
];

let playing = false;
let songNumber = 0;

// Functionalities while playing
function songPlay () {
    playing = true;
    song.play();
    stopBtn.classList.replace('fa-play', 'fa-pause');
    stopBtn.setAttribute('title', 'Pause');
};

// Functionalities while paused
function songPause () {
    playing = false;
    song.pause();
    stopBtn.classList.replace('fa-pause', 'fa-play');
    stopBtn.setAttribute('title', 'Play');
};

// Changing the song, title, artist nad the cover image.
function loadSongs (songIN) {
    image.src = `covers/${songIN.name}.jpg`;
    song.src = `music/${songIN.name}.mp3`;
    singer.textContent = songIN.singer;
    artist.textContent = songIN.songName;
};

function next () {
    songNumber++;
    if (songNumber > songArray.length - 1) songNumber = 0;
    loadSongs(songArray[songNumber]);
    songPlay();
};

function previous () {
    songNumber--;
    if (songNumber < 0) songNumber = songArray.length -1
    loadSongs(songArray[songNumber]);
    songPlay();
};

// Update Progress Bar
function updateProgressBar (e) {
    const {duration : songDuration, currentTime : songCurrentTime} = e.srcElement;
    duration.textContent = `${Math.floor(songDuration / 60)}:${String(Math.floor(songDuration % 60)).padStart(2, 0)}`;
    currentTime.textContent = `${Math.floor(songCurrentTime / 60)}:${String(Math.floor(songCurrentTime % 60)).padStart(2, 0)}`;
    const progressPercent = (songCurrentTime / songDuration) * 100;
    progressBar.style.width = progressPercent + "%";
};

// Set progress bar
function progressBarFunctionality (e) {
    const {clientWidth : progressBarWidth} = e.srcElement;
    const {offsetX : progressClick} = e;
    const {duration} = song;
    song.currentTime = (progressClick / progressBarWidth) * duration;
};

// Event Listeners
stopBtn.addEventListener('click', (() => (playing ? songPause() : songPlay())));
nextBtn.addEventListener('click', next);
previousBtn.addEventListener('click', previous);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended', next);
progressBarContaner.addEventListener('click', progressBarFunctionality);
