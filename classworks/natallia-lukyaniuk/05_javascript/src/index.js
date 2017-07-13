import './index.css';

const timer = document.querySelector('.timer');

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  direction: document.querySelector('.timerDirection.button'),
  remember: document.querySelector('.remember.button'),
};

timer.textContent = '00:00';
buttons.direction.innerHTML = 'обратный';

let seconds = 0;
let intervalId;
let isStart = false;
let direction = true;

// DISPLAYED FORMAT
function displayTime() {
  let displaySeconds = seconds % 60 + '';
  let displayMinutes = (seconds - displaySeconds) / 60 + '';
  if (displaySeconds.length === 1) displaySeconds = '0' + displaySeconds;
  if (displayMinutes.length === 1) displayMinutes = '0' + displayMinutes;
  timer.textContent = `${displayMinutes}:${displaySeconds}`;
}


// TIME CHANGING
function addTime(number) {
  seconds += number;
  displayTime();
}

function decreaseTime(number) {
  seconds = seconds >= number ? seconds - number : 0;
  displayTime();
}


function timeStep() {
  if (direction) {
    addTime(1);
    displayTime();
  } else {
    decreaseTime(1);
    displayTime();
  }
}


// BUTTON LISTENERS
function reverseDirection() {
  if (direction) {
    direction = false;
    buttons.direction.innerHTML = 'прямой';
  } else {
    direction = true;
    buttons.direction.innerHTML = 'обратный';
  }
}

function startTimer() {
  if (!isStart) {
    isStart = true;
    intervalId = setInterval(timeStep, 1000);
  }
}

function stopTimer() {
  clearInterval(intervalId);
  isStart = false;
}

function resetTime() {
  seconds = 0;
  isStart = false;
  displayTime();
}

function remember() {
  let historyTable = document.getElementById('historyTable');
  if (!historyTable) {
    historyTable = document.createElement('table');
    historyTable.id = 'historyTable';
    document.body.appendChild(historyTable);
  }
  const tr = document.createElement('tr');
  tr.innerHTML = timer.textContent;
  historyTable.appendChild(tr);
}

buttons.start.addEventListener('click', startTimer);
buttons.stop.addEventListener('click', stopTimer);
buttons.plus.addEventListener('click', addTime.bind(null, 10));
buttons.minus.addEventListener('click', decreaseTime.bind(null, 10));
buttons.reset.addEventListener('click', resetTime);
buttons.direction.addEventListener('click', reverseDirection);
buttons.remember.addEventListener('click', remember);
