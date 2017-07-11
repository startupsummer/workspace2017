const timer = document.querySelector('.timer');
const table = document.querySelector('.table');

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  lap: document.querySelector('.lap.button'),
};

timer.textContent = '00:00';

const time = {
    s: 0
};

let lapCount = 1;

const rerender = () => {
    timer.textContent = `${format('00', Math.floor(time.s/60))}:${format('00',time.s%60)}`;
    console.log(time.s);
};

let interval;

buttons.start.addEventListener('click', () => {
    if (!interval) {
        interval = setInterval(function () {
            time.s += 1;
            rerender();
        }, 1000);
    }
});

buttons.stop.addEventListener('click', () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
});

buttons.plus.addEventListener('click', () => {
    time.s += 10;
    rerender();
});

buttons.minus.addEventListener('click', () => {
    if (time.s > 10) {
        time.s -= 10;
        rerender();
    }
});

buttons.reset.addEventListener('click', () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
    time.s = 0;
    lapCount = 1;
    table.innerHTML = '';
    rerender();
});

buttons.lap.addEventListener('click', () => {
    if (interval) {
        let row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = `Lap ${lapCount}: ${timer.textContent}`;
        if (table.firstChild)
            table.insertBefore(row, table.firstChild);
        else
            table.appendChild(row);

        time.s = 0;
        lapCount += 1;
        rerender();
    }
});
