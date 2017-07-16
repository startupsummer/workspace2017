function StopWatch() {
  var eventHandlers = {
    tick: [],
    reset: [],
    plus: [],
    minus: []
  };
  var tickIntervalMs = 1000;
  var ticksElapsed = 0;
  var stopWatchId = null;

  this.start = function () {
    if (stopWatchId) return this;
    stopWatchId = setInterval(() => {
      ++ticksElapsed;
      eventHandlers.tick.forEach(h => h(ticksElapsed));

    }, tickIntervalMs);
    return this;
  }
  this.stop = function () {
    clearInterval(stopWatchId);
    stopWatchId = null;
    return this;
  }
  this.reset = function () {
    this.stop();
    ticksElapsed = 0;
    eventHandlers.reset.forEach(h => h())
    return this;
  }
  this.plus = function (ticks) {
    ticksElapsed += ticks;
    eventHandlers.plus.forEach(h => h(ticksElapsed));
    return this;
  }
  this.minus = function (ticks) {
    ticksElapsed -= ticks;
    ticksElapsed = ticksElapsed < 0 ? 0 : ticksElapsed;
    eventHandlers.minus.forEach(h => h(ticksElapsed));
    return this;
  }
  this.on = function (eventName, eventHandler) {
    if (!eventHandlers.hasOwnProperty(eventName)) return;

    eventHandlers[eventName].push(eventHandler);

    return this;
  }
}

function Timer(t) {
  var eventHandlers = {
    tick: [],
    reset: [],
    plus: [],
    minus: [],
    end: []
  };
  var tickIntervalMs = 1000;
  var ticksLeft = t || 0;
  var timerId = null;

  this.start = function () {
    if (timerId || !ticksLeft) return this;
    var that = this;
    timerId = setInterval(() => {
      --ticksLeft;
      eventHandlers.tick.forEach(h => h(ticksLeft));
      if (!ticksLeft) {
        that.stop();
        eventHandlers.end.forEach(h => h());
        return;
      }

    }, tickIntervalMs);
    return this;
  }
  this.stop = function () {
    clearInterval(timerId);
    timerId = null;
    return this;
  }
  this.reset = function () {
    this.stop();
    ticksLeft = 0;
    eventHandlers.reset.forEach(h => h());
    return this;
  }
  this.plus = function (ticks) {
    ticksLeft += ticks;
    eventHandlers.plus.forEach(h => h(ticksLeft))
    return this;
  }
  this.minus = function (ticks) {
    ticksLeft -= ticks;
    ticksLeft = ticksLeft < 0 ? 0 : ticksLeft;
    eventHandlers.minus.forEach(h => h(ticksLeft))
    return this;
  }
  this.on = function (eventName, eventHandler) {
    if (!eventHandlers.hasOwnProperty(eventName)) return;

    eventHandlers[eventName].push(eventHandler);

    return this;
  }
}

function buildTimeString(sec) {
  var minutes = Math.floor(sec / secondsPerMinute);
  var seconds = sec % secondsPerMinute;
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

const secondsPerMinute = 60;

const timeBoard = document.querySelector('.timer');
const results = document.querySelector('.results');

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
};

timeBoard.textContent = '00:00';


// var stopwatch = new StopWatch();
// stopwatch.on('tick', t => timeBoard.textContent = buildTimeString(t))
//   .on('reset', () => timeBoard.textContent = '00:00')
//   .on('plus', t => timeBoard.textContent = buildTimeString(t))
//   .on('minus', t => timeBoard.textContent = buildTimeString(t))

// buttons.start.addEventListener('click', () => stopwatch.start());
// buttons.stop.addEventListener('click', () => stopwatch.stop());
// buttons.reset.addEventListener('click', () => stopwatch.reset());
// buttons.plus.addEventListener('click', () => stopwatch.plus(10));
// buttons.minus.addEventListener('click', () => stopwatch.minus(10));

var timer = new Timer();
timer.on('tick', t => timeBoard.textContent = buildTimeString(t))
  .on('reset', () => timeBoard.textContent = '00:00')
  .on('plus', t => timeBoard.textContent = buildTimeString(t))
  .on('minus', t => timeBoard.textContent = buildTimeString(t))
  .on('end', () => alert("Timer stopped!"))

buttons.start.addEventListener('click', () => timer.start());
buttons.stop.addEventListener('click', () => timer.stop());
buttons.reset.addEventListener('click', () => timer.reset());
buttons.plus.addEventListener('click', () => timer.plus(10));
buttons.minus.addEventListener('click', () => timer.minus(10));

