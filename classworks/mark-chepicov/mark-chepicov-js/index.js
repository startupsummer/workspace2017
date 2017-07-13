const timer = document.querySelector('.timer');

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  reverse: document.querySelector('.reverse.button'),
  intable: document.querySelector('.intable.button'),
};

let sec = -1, min = 0;
let flag = false, reverse = false;
let timerId;
timer.textContent = '00:00';
let table = document.querySelector(".table");

function start(){
  if (!flag){
    if (reverse) dec();
    else inc();
    flag=true;
  }
  else reset();
}

function inc(){
  sec += 1;
  view();
  if (reverse) timerId = setTimeout(dec,1000);
  else timerId = setTimeout(inc,1000);
}
function dec(){
  sec -= 1;
  view();
  timerId = setTimeout(dec,1000); 
}

function stop(){
  flag=false;
  clearTimeout(timerId);
}
function plus(){
  if (sec === -1) sec = 0;
  sec += 10;
  view();
}
function minus(){
  sec -= 10;
  view();
}
function reset(){
  sec = -1;
  min = 0;
  view();
}
function intable(){
  let el = document.createElement('div');
  el.className = 'button';
  let minute = min, second = sec;
  if (sec === -1) sec = 0;
  if (min < 10) minute = '0'+min;
  if (sec < 10) second = '0'+sec;
  el.textContent = minute + ':' + second;
  table.appendChild(el);
}

function view(){
  if (sec>=60){
    min += 1;
    sec = sec % 60;
  }
  if (sec<0){
    if (min===0) sec=0;
    else {
      sec += 60;
      min -=1;
    }
  }
  let minute = min, second = sec;
  if (min < 10) minute = '0'+min;
  if (sec < 10) second = '0'+sec;
  timer.textContent = minute+':'+second;
}

function obratno(){
  clearTimeout(timerId);
  reverse = !reverse;
}