const timer = document.querySelector('.timer');

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  reverse: document.querySelector('.reverse.button'),
  writeIntoTable: document.querySelector('.writeIntoTable.button'),
};

timer.textContent = '00:00';

let seconds = 0;
let minutes = 0;
let intervalId = 0;
let table = document.querySelector(".table");
let isStart = false;

function start(){
  if (!isStart) {
    isStart = true;
    intervalId = setInterval(increaseTime, 1000);
  }
}

function stop(){
  clearTimeout(intervalId);
  isStart = false;
}

function reset(){
  seconds = 0;
  minutes = 0;
  showTime();
}

function increaseTime(){
  seconds += 1;
  showTime();
}

function decreaseTime(){
  if (seconds > 0){
    seconds -= 1;
  }else {
    clearTimeout(intervalId);
  }
  showTime();
}

function plus(){
  seconds += 10;
  showTime();
}

function minus(){
  seconds -= 10;
  showTime();
}

function reverse(){
  clearTimeout(intervalId);
  intervalId = setInterval(decreaseTime, 1000);
}

function showTime(){
  if (seconds >= 60){
    minutes += 1;
    seconds = seconds % 60;
  } else if (seconds < 0){
    seconds = 0;
  }

  let showMinutes = minutes;
  let showSeconds = seconds;

  if (minutes < 10)
    showMinutes = "0" + minutes;
  if (seconds < 10)
    showSeconds = "0" + seconds;
  timer.textContent = showMinutes + ":" + showSeconds;
}

function writeIntoTable(){
  let item = document.createElement('div');
  item.className = 'table__item';
  let showMinutes = minutes, showSeconds = seconds;
  if (minutes < 10){
     showMinutes = "0" + minutes;
  }
  if (seconds < 10){
    showSeconds = "0" + seconds;
  }
  item.textContent = showMinutes + ":" + showSeconds;
  table.appendChild(item);
}
