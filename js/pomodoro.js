const minDisplay = document.getElementById('pom-min');
const secDisplay = document.getElementById('pom-sec');
const modeText = document.getElementById('mode-text');
const dots = document.querySelectorAll('.dot');
const startBtn = document.getElementById('pom-start-btn');
const pauseBtn = document.getElementById('pom-pause-btn');
const skipBtn = document.getElementById('pom-skip-btn');
const resetBtn = document.getElementById('pom-reset-btn');

const WORK_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

let timeLeft = WORK_TIME;
let timerInterval;
let isRunning = false;
let currentMode = 'work'; 
let completedSessions = 0;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function updateUI() {
    if (currentMode === 'work') {
        modeText.textContent = 'Focus Time';
        document.documentElement.style.setProperty('--accent-color', 'var(--accent-color)'); 
    } else if (currentMode === 'shortBreak') {
        modeText.textContent = 'Short Break';
        document.documentElement.style.setProperty('--accent-color', '#3b82f6'); 
    } else {
        modeText.textContent = 'Long Break';
        document.documentElement.style.setProperty('--accent-color', '#8b5cf6'); 
    }

    dots.forEach((dot, index) => {
        if (index < completedSessions % 4) {
            dot.classList.remove('empty');
        } else {
            dot.classList.add('empty');
        }
    });
}

function switchMode() {
    if (currentMode === 'work') {
        completedSessions++;
        if (completedSessions % 4 === 0) {
            currentMode = 'longBreak';
            timeLeft = LONG_BREAK;
        } else {
            currentMode = 'shortBreak';
            timeLeft = SHORT_BREAK;
        }
    } else {
        currentMode = 'work';
        timeLeft = WORK_TIME;
    }
    updateUI();
    updateDisplay();
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';

    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            switchMode();
            alert(`${modeText.textContent} is starting!`);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    pauseBtn.style.display = 'none';
    startBtn.style.display = 'flex';
}

function skipTimer() {
    pauseTimer();
    switchMode();
}

function resetTimer() {
    pauseTimer();
    currentMode = 'work';
    completedSessions = 0;
    timeLeft = WORK_TIME;
    updateUI();
    updateDisplay();

    const themeBtn = document.getElementById('theme-toggle');
    if (document.body.getAttribute('data-theme') === 'secret') {
        document.documentElement.style.setProperty('--accent-color', '#ef233c');
    } else {
        document.documentElement.style.setProperty('--accent-color', '#22c55e');
    }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
skipBtn.addEventListener('click', skipTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
updateUI();