function updateClocks() {
    const now = new Date();

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
}

updateClocks();

setInterval(updateClocks, 10000);