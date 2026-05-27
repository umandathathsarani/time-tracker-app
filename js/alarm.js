const currentTimeDisplay = document.getElementById('current-time-display');
const alarmTimeInput = document.getElementById('alarm-time-input');
const addAlarmBtn = document.getElementById('add-alarm-btn');
const alarmsList = document.getElementById('alarms-list');

let alarms = [];

function formatCurrentTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }).format(date);
}

function updateClock() {
    const now = new Date();
    currentTimeDisplay.textContent = formatCurrentTime(now);
    checkAlarms(now);
}

function checkAlarms(now) {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    alarms.forEach(alarm => {
        if (alarm.isActive && alarm.hour === currentHour && alarm.minute === currentMinute && now.getSeconds() === 0) {
            alert(`⏰ ALARM RINGING: ${alarm.timeString} ⏰`);
        }
    });
}

function renderAlarms() {
    alarmsList.innerHTML = '';
    
    alarms.forEach((alarm, index) => {
        const alarmEl = document.createElement('div');
        alarmEl.className = 'alarm-item';
        
        alarmEl.innerHTML = `
            <div class="time" style="color: ${alarm.isActive ? 'var(--text-color)' : 'var(--nav-text)'}">
                ${alarm.timeString}
            </div>
            <div class="actions">
                <i class="fa-solid ${alarm.isActive ? 'fa-toggle-on alarm-toggle' : 'fa-toggle-off alarm-toggle inactive'}" 
                   onclick="toggleAlarm(${index})"></i>
                <button class="delete-btn" onclick="deleteAlarm(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        alarmsList.appendChild(alarmEl);
    });
}

function addAlarm() {
    const timeValue = alarmTimeInput.value;
    if (!timeValue) return;

    const [hourStr, minuteStr] = timeValue.split(':');
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    
    const timeString = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date);

    alarms.push({
        hour: hour,
        minute: minute,
        timeString: timeString,
        isActive: true
    });

    alarmTimeInput.value = '';
    renderAlarms();
}

window.toggleAlarm = function(index) {
    alarms[index].isActive = !alarms[index].isActive;
    renderAlarms();
};

window.deleteAlarm = function(index) {
    alarms.splice(index, 1);
    renderAlarms();
};

addAlarmBtn.addEventListener('click', addAlarm);
setInterval(updateClock, 1000);
updateClock();