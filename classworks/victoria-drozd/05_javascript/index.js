const timer = document.querySelector('.timer');

const buttons = {
    start: document.querySelector('.start.button'),
    countdown: document.querySelector('.countdown.button'),
    stop: document.querySelector('.stop.button'),
    reset: document.querySelector('.reset.button'),
    plus: document.querySelector('.plus.button'),
    minus: document.querySelector('.minus.button'),
    save: document.querySelector('.save.button'),
};

timer.textContent = '00:00';

let timerId;
let minutes = 0, seconds = 0;

function toFormat(number) {
    let numStr = String(number);

    if (numStr.length === 1) {
        numStr = '0' + numStr;
    }

    return numStr;
}

function changeText(element) {
    let minutesStr = toFormat(minutes);
    let secondsStr = toFormat(seconds);

    element.textContent = minutesStr + ':' + secondsStr;
}

buttons.start.addEventListener('click', function () {

    function recount() {

        if (seconds < 59) {
            seconds++;
        } else {

            if (minutes < 99) {
                minutes++;
            } else {
                minutes = 0
            }

            seconds = 0;
        }

        changeText(timer);
    };

    clearInterval(timerId);
    timerId = setInterval(recount, 1000);
});

buttons.countdown.addEventListener('click', function () {

    function recount() {

        if (seconds > 0) {
            seconds--;
        } else {

            if (minutes > 0) {
                minutes--;
            } else {
                minutes = 99
            }

            seconds = 59;
        }

        changeText(timer);
    };

    clearInterval(timerId);
    timerId = setInterval(recount, 1000);
});

buttons.stop.addEventListener('click', function () {
    clearInterval(timerId);
});

buttons.plus.addEventListener('click', function () {

    seconds += 10;

    if (seconds >= 60) {

        if (minutes < 99) {
            minutes++;
        } else {
            minutes = 0
        }

        seconds %= 60;
    }

    changeText(timer);
});

buttons.minus.addEventListener('click', function () {

    seconds -= 10;

    if (seconds < 0) {

        if (minutes > 0) {
            minutes--;
        } else {
            minutes = 99
        }
        seconds = 60 + seconds;
        seconds %= 60;
    }

    changeText(timer);
});

buttons.reset.addEventListener('click', function () {
    minutes = seconds = 0;
    timer.textContent = '00:00';
    clearInterval(timerId);
});

buttons.save.addEventListener('click', function () {

    let savedTimeContent = document.querySelector('.saved-time_content');
    let node = document.createElement('div');
    changeText(node);

    if (savedTimeContent.childElementCount >= 5) {
        savedTimeContent.removeChild(savedTimeContent.childNodes[0]);
    }

    savedTimeContent.appendChild(node);
});
