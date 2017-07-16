const timer = document.querySelector('.timer');

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  save: document.querySelector('.save.button'),
};

timer.textContent = '00:00';
const time = {
  minute: 0,
  second: 0,
};
let isTiming = false;
let timeout;

const getPartTimeStr = t => t < 10 ? `0${t}` : `${t}`;

const setTimerValue = () => {
  timer.textContent = getPartTimeStr(time.minute) + ':' + getPartTimeStr(time.second);
};

function goTimer() {
  time.second++;
  if(time.second === 60) {
    time.minute ++;
    time.second = 0;
  }
  setTimerValue();
  timeout = setTimeout(() => {
    goTimer();
  }, 1000);
}

function start() {
  if (isTiming) return;
  isTiming = true;
  setTimeout(goTimer(), 1000);
}

function stop() {
  isTiming = false;
  clearTimeout(timeout);
}

function reset() {
  // isTiming = false;
  timer.textContent = '00:00';
  time.minute = 0;
  time.second = 0;
}

function minus() {
  time.second -= 10;

  if (time.second < 0) {
    time.minute --;
    time.second += 60;
    if (time.minute < 0) {
      time.minute = 0;
      time.second = 0;
    }
  }
  setTimerValue();
}

function plus() {
  time.second += 10;
  if (time.second > 59) {
    time.minute ++;
    time.second -= 60;
  }
  setTimerValue();
}

function save() {
  const table = document.querySelector(".table__body");
  const row = table.insertRow(0);
  const cell = row.insertCell(0);
  cell.classList.add("table__cell");
  cell.innerHTML = timer.textContent;
}

buttons.start.addEventListener("click", start);
buttons.minus.addEventListener("click", minus);
buttons.plus.addEventListener("click", plus);
buttons.reset.addEventListener("click", reset);
buttons.stop.addEventListener("click", stop);
buttons.save.addEventListener("click", save);
