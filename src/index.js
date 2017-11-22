var workTime = 1500;
var pauseTime = 300;
var leftTime = workTime;
var minutes = 0;
var seconds = 0;
var started = false;
var status = 'work';
var clock = document.getElementById('round');

var statusNames = {
    work: 'Session',
    pause: 'Pause'
};

function renderLeftTime() {
    minutes = Math.floor(leftTime / 60);
    seconds = leftTime % 60;

    if (seconds < 10) {
       seconds = '0' + seconds;
    }
    document.getElementById('time').innerHTML = minutes + ':' + seconds;

    clock.classList.toggle('work', status === 'work');
    clock.classList.toggle('pause', status === 'pause');

    document.getElementsByClassName('name')[0].innerHTML = statusNames[status];
}

renderLeftTime();

function decreaseTime() {
    leftTime -= 1;

    if (leftTime <= 0) {
        if (status === 'work') {
            status = 'pause';
            leftTime = pauseTime;
        } else {
            status = 'work';
            leftTime = workTime;
        }
    }

    renderLeftTime();
}

setInterval(function () {
    if (started) {
        decreaseTime();
    }
},1000);

function startOrPause() {
    started = !started;
    renderPulsating();
}

function reset() {
    started = false;
    leftTime = workTime;
    status = 'work';
    renderLeftTime();
    renderPulsating();
}

function renderPulsating() {
    clock.classList.toggle('pulsating', started);
}

function renderSettings() {
    document.getElementById('pause-time').innerHTML = Math.floor(pauseTime / 60).toString();
    document.getElementById('work-time').innerHTML = Math.floor(workTime / 60).toString();
}

function decreasePause() {
    pauseTime -= 60;
    if (pauseTime < 0) {
        pauseTime = 0;
    }
    renderSettings();
    reset();
}

function increasePause() {
    pauseTime += 60;
    renderSettings();
    reset();
}

function decreaseWork() {
    workTime -= 60;
    if (workTime < 0) {
        workTime = 0;
    }
    renderSettings();
    reset();
}

function increaseWork() {
    workTime += 60;
    renderSettings();
    reset();
}

renderSettings();

document.getElementById('round').addEventListener('click', startOrPause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('less-pause').addEventListener('click', decreasePause);
document.getElementById('more-pause').addEventListener('click', increasePause);
document.getElementById('less-work').addEventListener('click', decreaseWork);
document.getElementById('more-work').addEventListener('click', increaseWork);







