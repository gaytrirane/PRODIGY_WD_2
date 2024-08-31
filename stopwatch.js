let startTime, updatedTime, difference, interval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

// Start or Pause the stopwatch
startPauseBtn.addEventListener('click', () => {
    if (!running) {
        startTime = Date.now() - (difference || 0);
        interval = setInterval(updateTime, 1000);
        startPauseBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(interval);
        difference = Date.now() - startTime;
        startPauseBtn.textContent = 'Start';
        running = false;
    }
});

// Update the time display
function updateTime() {
    updatedTime = new Date(Date.now() - startTime);
    let minutes = String(updatedTime.getUTCMinutes()).padStart(2, '0');
    let seconds = String(updatedTime.getUTCSeconds()).padStart(2, '0');
    let hours = String(updatedTime.getUTCHours()).padStart(2, '0');
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    running = false;
    startTime = 0;
    difference = 0;
    display.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    laps.innerHTML = '';
    lapCounter = 1;
});

// Record a lap time
lapBtn.addEventListener('click', () => {
    if (running) {
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapItem);
        lapCounter++;
    }
});
