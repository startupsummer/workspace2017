const timer = document.querySelector('.timer');
const table = document.querySelector('.data-results');

const buttons = {
  start: document.querySelector('.start.button'), 
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  screen: document.querySelector('.screen.button'),
};

let startID;
let count = 0;
let number = 0;
let currentTime = '';
let timerWorks = false; 

timer.textContent = '00:00';

buttons.start.addEventListener('click', startTimer);
buttons.stop.addEventListener('click', stopTimer);
buttons.reset.addEventListener('click', resetTimer);
buttons.plus.addEventListener('click', plusTime);
buttons.minus.addEventListener('click', minusTime);
buttons.screen.addEventListener('click', addToTable);

function startTimer() {
  if (timerWorks) return;
  const run = () => {
    const date = new Date(++count * 1000);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const currentTime = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    
    timer.textContent = currentTime;
    startID = setTimeout(run, 1000);
  }

  setTimeout(run, 1000);
  timerWorks = true;
}

function stopTimer() {
  clearTimeout(startID);
  timerWorks = false;
}

function resetTimer() {
  clearTimeout(startID);
  timerWorks = false;
  count = 0;
  timer.textContent = '00:00';
}

function plusTime() {
  count += 10;
  startTimer();
}

function minusTime() {
  if (count > 10) {
    count -= 10;
  }
}

function addToTable() {
  table.insertAdjacentHTML('beforeEnd',
    `<div class="row">
        <span>${++number}</span>
        <span>${timer.textContent}</span>
      </div>`
  );
}





