const timer = document.querySelector('.timer');
const ul = document.querySelector('.addTable');

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  countdown: document.querySelector('.countdown.button'),
  saveTable: document.querySelector('.saveTable.button'),
};

let second = 0;
let minute = 0;
let timerId, cdTimerId;
timer.textContent = '00:00';

const startTimer = () => {
  clearInterval(timerId);
  timerId = setInterval(addTime, 1000);
};

const сountdownTimer = () => {
  clearInterval(timerId);
  timerId = setInterval(subtractTime, 1000);
};

const toParse = (time) => {
  let strTime = String(time);

  if(strTime.length == 1) {
    strTime = '0' + strTime;
  }

  return strTime;
}

const changeTime = () => {
  let min = toParse(minute);
  let sec = toParse(second);

  timer.textContent = min + ":" + sec;
}

const saveTime = () => {
  let min = toParse(minute);
  let sec = toParse(second);

  return min + ":" + sec;
}

const addTime = () => {
  second++;

  if(second === 60) {
    minute++;
    second = 0;
  }

  changeTime();

}

const subtractTime = () => {
  if(second === 0) {
    if(minute > 0) {
      second = 60;
      minute--;
    } else {
      second++;
      stopTimer();
    }
  }

  second--;

  changeTime();
}

const stopTimer = () => {
  clearInterval(timerId);
}

const resetTimer = () => {
  second = 0;
  minute = 0;

  changeTime();
}

const plusTimer = () => {
  let sec;
  second = +second + 10;
  sec = second % 60;

  if(second > 60) {
    second = sec;
    minute++;
  }

  changeTime();
}

const minusTimer = () => {
  let sec;
  second = +second - 10;
  sec = -1 * (second % 60);

  if(second < 0) {
    if(minute > 0) {
      minute--;
      second = 60 - sec;
    } else {
      second = 0;
    }
  }

  changeTime();
}

const addTable = () => {
  const li = document.createElement('li');

  li.textContent = saveTime();

  ul.appendChild(li);
}

buttons.start.addEventListener('click', startTimer);
buttons.stop.addEventListener('click', stopTimer);
buttons.reset.addEventListener('click', resetTimer);
buttons.plus.addEventListener('click', plusTimer);
buttons.minus.addEventListener('click', minusTimer);
buttons.countdown.addEventListener('click', сountdownTimer);
buttons.saveTable.addEventListener('click', addTable);
