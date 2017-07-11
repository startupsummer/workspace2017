const timer = document.querySelector('.timer');

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
};

timer.textContent = '00:00';

let sec = 0;
let min = 0;

let startTimerId;
let timerIsStart = false;

const updateTimer = () => {
  let seconds = sec; 
  let minutes = min;

  if (sec === 60) {
    min++;
    sec = 0;
    second = '00';
  } else sec++; 

  if (min < 10) minutes = '0' + min;
  if (sec < 10) seconds = '0' + sec;

  timer.textContent = minutes + ':' + seconds;
}

const startTimer = () => {
  if (!timerIsStart) {
    startTimerId = setInterval(updateTimer, 1000);
    timerIsStart = true;
  }
} 

const resetTimer = () => {
  sec = 0;
  min = 0;
  timer.textContent = '00:00';
}

const stopTimer = () => {
  clearInterval(startTimerId);
  timerIsStart = false;
}

const incTimer = () => {
  sec += 10;

  if (sec > 59) {
    min += 1;
    sec = 0;
  }

  updateTimer();
}

const decTimer = () => {
  sec -= 10;

  if (sec < 0) {
    sec += 60;
    if (min > 0) min -= 1;
      else resetTimer();
  }

  updateTimer();
}


buttons.start.addEventListener('click', startTimer);
buttons.stop.addEventListener('click', stopTimer);
buttons.reset.addEventListener('click', resetTimer);
buttons.plus.addEventListener('click', incTimer);
buttons.minus.addEventListener('click', decTimer);
