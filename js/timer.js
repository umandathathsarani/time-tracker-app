const daysInput = document.getElementById('days-input');
const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');

const daysDisplay = document.getElementById('days-display');
const hoursDisplay = document.getElementById('hours-display');
const minutesDisplay = document.getElementById('minutes-display');
const secondsDisplay = document.getElementById('seconds-display');

const inputMode = document.getElementById('input-mode');
const countdownMode = document.getElementById('countdown-mode');

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

let timerInterval;
let totalSeconds = 0;
let isPaused = false;

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateDisplay() {
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    daysDisplay.textContent = formatTime(d);
    hoursDisplay.textContent = formatTime(h);
    minutesDisplay.textContent = formatTime(m);
    secondsDisplay.textContent = formatTime(s);
}

function startTimer() {
    if (!isPaused) {
        const d = parseInt(daysInput.value) || 0;
        const h = parseInt(hoursInput.value) || 0;
        const m = parseInt(minutesInput.value) || 0;
        const s = parseInt(secondsInput.value) || 0;
        
        totalSeconds = (d * 86400) + (h * 3600) + (m * 60) + s;
    }

    if (totalSeconds <= 0) return;

    inputMode.style.display = 'none';
    countdownMode.style.display = 'flex';
    
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
    resetBtn.style.display = 'flex';

    isPaused = false;

    updateDisplay();

    timerInterval = setInterval(() => {
        totalSeconds--;
        updateDisplay();

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    
    pauseBtn.style.display = 'none';
    startBtn.style.display = 'flex';
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
}

function resetTimer() {
    clearInterval(timerInterval);
    isPaused = false;
    totalSeconds = 0;

    daysInput.value = '';
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';

    inputMode.style.display = 'flex';
    countdownMode.style.display = 'none';

    startBtn.style.display = 'flex';
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
    pauseBtn.style.display = 'none';
    resetBtn.style.display = 'none';
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);