let isRunning = false;
let isPaused = false;
let startTime;
let interval;
const laps = [];

function startStop() {
  if (isPaused) { 
    startTime = Date.now() - (laps.length > 0 ? laps.reduce((a, b) => a + b) : 0);
    interval = setInterval(updateTime, 10);
    document.getElementById("startStop").textContent = "Stop";
    document.getElementById("pauseResume").textContent = "Pause";
    isPaused = false;
  } else if (isRunning) {
    clearInterval(interval);
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("pauseResume").textContent = "Pause";
  } else {
    startTime = Date.now() - (laps.length > 0 ? laps.reduce((a, b) => a + b) : 0);
    interval = setInterval(updateTime, 10);
    document.getElementById("startStop").textContent = "Stop";
    document.getElementById("pauseResume").textContent = "Pause";
  }
  isRunning = !isRunning;
}

function pauseResume() {
  if (isRunning) {
    clearInterval(interval);
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("pauseResume").textContent = "Resume";
    isRunning = false;
    isPaused = true;
  } else if (isPaused) {
    startTime = Date.now() - (laps.length > 0 ? laps.reduce((a, b) => a + b) : 0);
    interval = setInterval(updateTime, 10);
    document.getElementById("startStop").textContent = "Stop";
    document.getElementById("pauseResume").textContent = "Pause";
    isPaused = false;
    isRunning = true;
  }
}


function updateTime() {
    const currentTime = Date.now() - startTime;
    const formattedTime = formatTime(currentTime);
    document.getElementById("display").textContent = formattedTime;
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(value, length = 2) {
    return value.toString().padStart(length, "0");
}

function reset() {
    clearInterval(interval);
    document.getElementById("display").textContent = "00:00:00.000";
    document.getElementById("startStop").textContent = "Start";
    isRunning = false;
    laps.length = 0;
    updateLaps();
}

function lap() {
    if (isRunning) {
        const currentTime = Date.now() - startTime;
        laps.push(currentTime);
        updateLaps();
    }
}

function updateLaps() {
    const lapsList = document.getElementById("laps");
    lapsList.innerHTML = "";
    laps.forEach((lapTime, index) => {
        const lapItem = document.createElement("li");
        lapItem.classList.add("lap-item");
        lapItem.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapItem);
    });
}
