const timer = document.querySelector('.timer');
const table = document.querySelector('.table');

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  back: document.querySelector('.back.button'),
  circle: document.querySelector('.add.button'),
};

timer.textContent = '00:00';

let ticks = 0;
const timeChanging = 10;
const timeNull = 0;
const timeSetInterval = 10;
const delay = 1000 / timeSetInterval;
const timerForward = 1;
const timerBack = -1;

let timeIntervalId;

let timerMovementStart = false;
let timerMovementBack = false;

buttons.start.addEventListener('click', function () {
  if(changeTimerMovement("start")) {
    timerStart(timerForward);
  }
});

buttons.back.addEventListener('click', function() {
  if(changeTimerMovement("back")) {
    timerStart(timerBack);
  }
});

function changeTimerMovement(timerType) {
  if(timerType == "start"){
    if(!timerMovementStart) {
      timerMovementBack = false;
      timerMovementStart = true;
      clearInterval(timeIntervalId);
      return true;
    }
  }
  else {
    if(!timerMovementBack) {
      timerMovementBack = true;
      timerMovementStart = false;
      clearInterval(timeIntervalId);
      return true;
    }
  }

  return false;
}

function timerStart(plusTics) {
    startOff = false;
    timeIntervalId = setInterval(function(){
      ticks += plusTics;
      ticks = checkNegative(ticks);
      timer.textContent = prettyOut(ticks);
    }, delay);
}

buttons.stop.addEventListener('click', function () {
    startOff = true;
    clearInterval(timeIntervalId);
});

buttons.reset.addEventListener('click', function () {
    ticks = timeNull;
    timer.textContent = prettyOut(ticks);
});

buttons.plus.addEventListener('click', function () {
    ticks += timeChanging * timeSetInterval;
    timer.textContent = prettyOut(ticks);
});

buttons.minus.addEventListener('click', function () {
    if(ticks >= timeChanging * timeSetInterval) {
      ticks -= timeChanging * timeSetInterval;
    }
    else {
      ticks = timeNull;
    }

    timer.textContent = prettyOut(ticks);
});

buttons.circle.addEventListener('click', function () {
  let row = table.insertRow(0);
  let cell = row.insertCell(0);

  cell.innerHTML = prettyOut(ticks);
});

function prettyOut(ticks) {
  let sec = Math.floor(ticks / timeSetInterval);
  let min = 0;

  if(sec > 59) {
    min = Math.floor(sec / 60);
    sec -= min * 60;
  }

  sec = minTwoDigits(sec);
  min = minTwoDigits(min);

  return min + ":" + sec;
}

function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}

function checkNegative(ticks) {
  if(ticks < 0) {
    return 0;
  }

  return ticks
}
