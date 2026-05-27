const minDisplay = document.getElementById('sw-min');
const secDisplay = document.getElementById('sw-sec');
const msDisplay = document.getElementById('sw-ms');
const startBtn = document.getElementById('sw-start-btn');
const lapBtn = document.getElementById('sw-lap-btn');
const resetBtn = document.getElementById('sw-reset-btn');
const lapsList = document.getElementById('laps-list');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

function formatTime(time) {
    const date = new Date(time);
    const m = date.getUTCMinutes().toString().padStart(2, '0');
    const s = date.getUTCSeconds().toString().padStart(2, '0');
    const ms = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    return { m, s, ms };
}

function updateDisplay() {
    const { m, s, ms } = formatTime(elapsedTime);
    minDisplay.textContent = m;
    secDisplay.textContent = s;
    msDisplay.textContent = ms;
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        
        isRunning = true;
        startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
        lapBtn.disabled = true;
    }
}

function recordLap() {
    if (!isRunning) return;
    
    lapCount++;
    const { m, s, ms } = formatTime(elapsedTime);
    const lapTime = `${m}:${s}.${ms}`;
    
    const li = document.createElement('li');
    li.className = 'lap-item';
    li.innerHTML = `<span class="lap-number">Lap ${lapCount}</span><span>${lapTime}</span>`;
    
    lapsList.insertBefore(li, lapsList.firstChild);
}

function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    lapCount = 0;
    
    updateDisplay();
    
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapsList.innerHTML = '';
}

startBtn.addEventListener('click', startStopwatch);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetStopwatch);