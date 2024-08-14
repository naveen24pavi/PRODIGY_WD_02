document.addEventListener('DOMContentLoaded', () => {
    let startTime, updatedTime, difference, tInterval;
    let running = false;
    let elapsedTime = 0;
    let lapCount = 1;

    const timeDisplay = document.getElementById('time');
    const lapList = document.getElementById('lapList');

    const formatTime = (ms) => {
        let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((ms / (1000 * 60)) % 60);
        let seconds = Math.floor((ms / 1000) % 60);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return `${hours}:${minutes}:${seconds}`;
    };

    const startTimer = () => {
        if (!running) {
            startTime = new Date().getTime();
            tInterval = setInterval(getShowTime, 1);
            running = true;
        }
    };

    const pauseTimer = () => {
        if (running) {
            clearInterval(tInterval);
            running = false;
        }
    };

    const resetTimer = () => {
        clearInterval(tInterval);
        running = false;
        elapsedTime = 0;
        timeDisplay.innerHTML = "00:00:00";
        lapList.innerHTML = "";
        lapCount = 1;
    };

    const lapTimer = () => {
        if (running) {
            const lapTime = formatTime(elapsedTime);
            const lapItem = document.createElement('li');
            lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
            lapList.appendChild(lapItem);
            lapCount++;
        }
    };

    const getShowTime = () => {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime + elapsedTime;
        timeDisplay.innerHTML = formatTime(difference);
    };

    document.getElementById('startBtn').addEventListener('click', startTimer);
    document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
    document.getElementById('resetBtn').addEventListener('click', resetTimer);
    document.getElementById('lapBtn').addEventListener('click', lapTimer);
});
