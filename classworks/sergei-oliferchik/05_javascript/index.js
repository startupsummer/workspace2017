const timer = document.querySelector('.timer');
const table = document.querySelector('.table-result');

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  revers: document.querySelector('.revers.button'),
  addResult: document.querySelector('.addResult.button'),
};

let seconds = 0;
let minuts = 0;
let togle = true;
let valueTimer = 1;
let intervalID;
let numberResult = 0;

const addResult = () => {
  let curField = document.createElement('tr');
  let curResult_number = document.createElement('td');
  let curResult_time = document.createElement('td');

  curResult_number.textContent = timer.textContent;
  curResult_time.textContent = 1;

  curField.appendChild(curResult_time);
  curField.appendChild(curResult_number);
  table.appendChild(curField)

  table.style.display = 'table-row';
}
const chengeMinut = (val) => {
  let result;
  minuts + val < 10
    ? result = `0${minuts + val}`
    : result = `${minuts + val}`;
  minuts += val;
  return result;
};
const chengeSeconds = (val) => {
  if (seconds + val < 0 ) {
    minuts > 0
      ? timer.textContent = `${chengeMinut(-1)}:${seconds +=60 + val}`
      : timer.textContent = `0${minuts = 0}:0${seconds = 0}`;
  } else if (seconds + val > 59) {
    timer.textContent = `${chengeMinut(1)}:0${seconds += val - 60}`;
  } else if (seconds + val < 10) {
    seconds += val;
    timer.textContent = `${chengeMinut(0)}:0${seconds}`;
  } else {
    seconds += val;
    timer.textContent = `${chengeMinut(0)}:${seconds}`
  }
};
const start = () => {
  if(togle) {
    intervalID = setInterval(() => {
      chengeSeconds(valueTimer);
    }, 1000);
    togle = false;
  }
};
const stop = () => {
  clearInterval(intervalID);
  togle = true;
};
const reset = () => {
  table.innerHTML =
  `
    <tr class="table-result__title">
      <th>№</th>
      <th>Время</th>
    </tr>
  `;
  
  table.style.display = 'none';
  timer.textContent = '00:00';
  seconds = 0;
  minuts = 0;
  valueTimer = 1;
};
const plus = () => {
  chengeSeconds(10);
};
const minus = () => {
  chengeSeconds(-10);
};
const revers = () => {
  valueTimer *= -1;
}

timer.textContent = '00:00';

buttons.start.addEventListener("click", start, false);
buttons.stop.addEventListener("click", stop, false);
buttons.reset.addEventListener("click", reset, false);
buttons.plus.addEventListener("click", plus, false);
buttons.minus.addEventListener("click", minus, false);
buttons.revers.addEventListener("click", revers, false);
buttons.addResult.addEventListener("click", addResult, false);
