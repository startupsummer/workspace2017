const timer = document.querySelector('.timer');

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
};

let second = '00';
let minute = '00';
let timerId;
timer.textContent = '00:00';

const startTimer = () => {
  timerId = setInterval(addSecond, 1000);
};

const addSecond = () => {

  if(second === 60) {
    if(minute < 9) {
      minute++;
      minute = '0' + minute;
    } else {
      minute++;
    }

    second = 0;
  }
  
  second++;

  if(second < 10) {
    second = '0' + second;
  }

  timer.textContent = minute + ":" + second;
}

const stopTimer = () => {
  clearInterval(timerId);
}

const resetTimer = () => {
  second = '00';
  minute = '00';
}

const plusTimer = () => {
    let sec;
    second = +second + 10;
    sec = second % 60;

    if(second > 60) {
      if(minute < 9) {
        minute++;
      } else {
        minute++;
      }
      second = sec;
    }
}

const minusTimer = () => {
  let sec;
  second = +second - 10;
  sec = -1 * (second % 60);

  if(second <= 0) {
    if(minute > 0) {
        minute--;
        second = 60 - sec;
    } else if(minute <= 0){
        minute = '00';
        second = '00';
    } else {
      minute--;
      second = 60 - sec;
    }
  }
}

buttons.start.addEventListener('click', startTimer);
buttons.stop.addEventListener('click', stopTimer);
buttons.reset.addEventListener('click', resetTimer);
buttons.plus.addEventListener('click', plusTimer);
buttons.minus.addEventListener('click', minusTimer);
