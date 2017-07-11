const timer = document.querySelector('.timer');

const commands = [start, stop, reset].map

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  save: document.querySelector('.save.button'),
};

timer.textContent = '00:00';

let time = {
  minute: undefined,
  second: undefined
};

let getPartTimeStr = (t) => {
  return t < 10 ? '0' + t : '' + t;
}

let isTiming = false;

function goTimer() {

  if(!isTiming) return;

  let timeStr = timer.textContent.split(':');

  time.second ++;

  if(time.second == 5) {
    time.minute ++;
    time.second = 0;
    timeStr[0] = getPartTimeStr(time.minute);
  }

  timeStr[1] = getPartTimeStr(time.second);
  timer.textContent = timeStr[0] + ':' + timeStr[1];
  setTimeout(() => {
    goTimer();
  }, 1000);

}


function start() {
  if(isTiming) return;

  time.second = 0;
  time.minute = 0;
  isTiming = true;
  setTimeout(goTimer(), 1000);

}

function stop() {
  isTiming = false;
}

function reset() {
  isTiming = false;
  timer.textContent =   '00:00';
}

function minus() {

  let timeStr = timer.textContent.split(':');

  time.second -= 2;

  if(time.second < 0) {
    time.minute --;
    time.second += 5;
    if (time.minute < 0) {
      time.minute = 0;
      time.second = 0;
    }
    timeStr[0] = getPartTimeStr(time.minute);
  }

  timeStr[1] = getPartTimeStr(time.second);
  timer.textContent = timeStr[0] + ':' + timeStr[1];

}


function plus() {

  let timeStr = timer.textContent.split(':');

  time.second += 2;
  if(time.second > 4) {
    time.minute ++;
    time.second -= 5;
  timeStr[0] = getPartTimeStr(time.minute);
}

timeStr[1] = getPartTimeStr(time.second);
timer.textContent = timeStr[0] + ':' + timeStr[1];

}


function save() {
  let table = document.querySelector(".table");
  var row = table.insertRow(0);
var cell = row.insertCell(0);
cell.innerHTML = timer.textContent;
}


buttons.start.addEventListener("click", start);
buttons.minus.addEventListener("click", minus);
buttons.plus.addEventListener("click", plus);
buttons.reset.addEventListener("click", reset);
buttons.stop.addEventListener("click", stop);
buttons.save.addEventListener("click", save);
