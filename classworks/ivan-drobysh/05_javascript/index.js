const timer = document.querySelector('.timer');
const table = document.querySelector('.table');
const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  reverse: document.querySelector('.reverse.button'),
  add: document.querySelector('.add.button'),
};
buttons.start.addEventListener('click', buttonStart, true);
buttons.stop.addEventListener('click', buttonStop, true);
buttons.plus.addEventListener('click', buttonPlus, true);
buttons.minus.addEventListener('click', buttonMinus, true);
buttons.reset.addEventListener('click', buttonReset, true);
buttons.reverse.addEventListener('click', buttonReverse, true);
buttons.add.addEventListener('click', buttonAdd, true);
timer.textContent = '00:00';
let time = 0;
let timerId;
let isTimer = false;
let reverse = false;
function stopTimer() {
  isTimer = false;
  clearTimeout(timerId);
}
function buttonStart() {
  if(!isTimer) {
    timerId = setInterval(timerStep, 1000);
    isTimer = true;
  }
}

function timerStep() {
  if(reverse)
  {
    time--;
    if(time < 0) {
      time = 0;
      stopTimer();
    }
  }
  else
  time++;
  showTimer();
}

function buttonStop() {
  stopTimer();
  isTimer = false;
}

function buttonPlus() {
  time+=10;
  showTimer();
}

function buttonMinus() {
  time-=10;
  if(time < 0) time = 0;
  showTimer();
}

function buttonReset() {
  stopTimer();
  time = 0;
  buttonReverseRename(true);
  showTimer();
}

function showTimer() {
  let seconds = time % 60 + '';
  let minutes = (time - seconds) / 60 + '';
  if(seconds.length == 1) seconds = '0' + seconds;
  if(minutes.length == 1) minutes = '0' + minutes;
  timer.textContent = minutes + ':' + seconds;
}

function buttonReverse() {
  buttonReverseRename(reverse);
  buttonStart();
}

function buttonReverseRename(reverseL) {
  if(!reverseL) {
    reverse = true;
    buttons.reverse.textContent = 'Прямой';
  }else {
    reverse = false;
    buttons.reverse.textContent = 'Обратный';
  }
}

function buttonAdd() {
  table.innerHTML+= '<tr><td>'+ timer.textContent +'</td></tr>'
}
