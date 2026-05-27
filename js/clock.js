const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const analogClock = document.querySelector('.analog-clock');

for (let i = 1; i <= 12; i++) {
    const numberContainer = document.createElement('div');
    numberContainer.className = 'clock-number';
    numberContainer.style.transform = `rotate(${i * 30}deg)`;
    
    const numberSpan = document.createElement('span');
    numberSpan.textContent = i;
    numberSpan.style.transform = `rotate(${-i * 30}deg)`;
    
    numberContainer.appendChild(numberSpan);
    analogClock.appendChild(numberContainer);
}

function updateAnalogClock(now) {
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondsDegrees = (seconds * 6); 
    const minutesDegrees = (minutes * 6) + (seconds * 0.1); 
    const hoursDegrees = ((hours % 12) * 30) + (minutes * 0.5); 

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

function updateClocks() {
    const now = new Date();
    
    updateAnalogClock(now);

    const formatTime = (date, timeZone) => {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(date);
    };

    const formatDate = (date, timeZone) => {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: timeZone,
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }).format(date);
    };

    const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('local-time').textContent = formatTime(now, localZone);
    document.getElementById('local-date').textContent = formatDate(now, localZone);

    document.getElementById('ny-time').textContent = formatTime(now, 'America/New_York');
    document.getElementById('ny-date').textContent = formatDate(now, 'America/New_York');

    document.getElementById('london-time').textContent = formatTime(now, 'Europe/London');
    document.getElementById('london-date').textContent = formatDate(now, 'Europe/London');

    document.getElementById('tokyo-time').textContent = formatTime(now, 'Asia/Tokyo');
    document.getElementById('tokyo-date').textContent = formatDate(now, 'Asia/Tokyo');

    document.getElementById('thailand-time').textContent = formatTime(now, 'Asia/Bangkok');
    document.getElementById('thailand-date').textContent = formatDate(now, 'Asia/Bangkok');

    document.getElementById('china-time').textContent = formatTime(now, 'Asia/Shanghai');
    document.getElementById('china-date').textContent = formatDate(now, 'Asia/Shanghai');

    document.getElementById('korea-time').textContent = formatTime(now, 'Asia/Seoul');
    document.getElementById('korea-date').textContent = formatDate(now, 'Asia/Seoul');

    document.getElementById('la-time').textContent = formatTime(now, 'America/Los_Angeles');
    document.getElementById('la-date').textContent = formatDate(now, 'America/Los_Angeles');
}

updateClocks();
setInterval(updateClocks, 1000);