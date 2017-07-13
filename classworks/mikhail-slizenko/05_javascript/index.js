const timer = document.querySelector('.timer');
const results = document.querySelector('.results');

const buttons = {
  start: document.querySelector('.start.button'),
  reverse: document.querySelector('.reverse.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  record: document.querySelector('.record.button')
};

timer.textContent = '00:00';

let sec = 0;

let startTimerId;
let timerIsStart = false;
let timerReverse = false;

const updateTimerView = () => {
  if (sec < 0) resetTimer();

  let seconds = sec % 60;
  let minutes = (sec - seconds) / 60;

  if (seconds < 10) seconds = '0' + seconds;
  if (minutes < 10) minutes = '0' + minutes;

  timer.textContent = minutes + ':' + seconds;
}

const updateTimer = () => {
  if (!timerReverse) {
    sec++;
    updateTimerView();
  } else {
    sec--;
    updateTimerView();
  }
}

const startTimer = () => {
  if (!timerIsStart) {
    startTimerId = setInterval(updateTimer, 1000);
    timerIsStart = true;
  }
} 

const resetTimer = () => {
  sec = 0;
  updateTimerView();
}

const stopTimer = () => {
  clearInterval(startTimerId);
  timerIsStart = false;
}

const reverseTimer = () => {
  timerReverse = !timerReverse;
}

const incTimer = () => {
  sec += 10;
  updateTimerView();
}

const decTimer = () => {
  sec -= 10;
  if (sec < 0) {
    resetTimer();
  }
  updateTimerView();
}

const recordTime = () => {
  let savedTime = document.createElement('div');
  savedTime.classList.add('results__item');
  savedTime.textContent = timer.textContent;
  results.appendChild(savedTime);
}

buttons.start.addEventListener('click', startTimer);
buttons.reverse.addEventListener('click', reverseTimer);
buttons.stop.addEventListener('click', stopTimer);
buttons.reset.addEventListener('click', resetTimer);
buttons.plus.addEventListener('click', incTimer);
buttons.minus.addEventListener('click', decTimer);
buttons.record.addEventListener('click', recordTime);
