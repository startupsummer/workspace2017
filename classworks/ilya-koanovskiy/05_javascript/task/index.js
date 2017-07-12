const timer = document.querySelector('.timer');
const table = document.querySelector('.intervals')

const buttons = {
  start: document.querySelector('.start.button'),
  stop: document.querySelector('.stop.button'),
  reset: document.querySelector('.reset.button'),
  plus: document.querySelector('.plus.button'),
  minus: document.querySelector('.minus.button'),
  reverse : document.querySelector('.reverse.button'),
  interval : document.querySelector('.makeInterval')
};

let currentTimeSec = 0;
let currentTimeMin = 0;
let intervalId = null;
let isInterval = false;
let isReverseInterval = false;

timer.textContent = '00:00';

function check(){
  if(currentTimeSec >= 60){
      currentTimeMin+=1;
      currentTimeSec -= 60;
  }
  if(currentTimeSec < 0 && currentTimeMin > 0){
    currentTimeMin-=1;
    currentTimeSec = 59;
  }
  if(currentTimeMin == 0 && currentTimeSec < 0){
    currentTimeSec = 0;
  }
}

function print(){

  let currentTimeSecStr = currentTimeSec + "";
  let currentTimeMinStr = currentTimeMin + "";

  if(currentTimeMinStr.length == 1) currentTimeMinStr = "0" + currentTimeMinStr;
  if(currentTimeSecStr.length == 1) currentTimeSecStr = "0" + currentTimeSecStr;

  timer.textContent =  currentTimeMinStr + ":" + currentTimeSecStr;
  
}

buttons.start.addEventListener("click",function(){
  if(!isInterval){
    if(isReverseInterval) clearInterval(intervalId);
    isInterval = true;
    isReverseInterval = false;
    intervalId =  setInterval(function(){
      currentTimeSec+=1;
      check();
      print();
    },1000);
  }
});

buttons.stop.addEventListener("click",function(){
  if(isInterval || isReverseInterval){
    isInterval = false;
    isReverseInterval = false;
    clearInterval(intervalId);
  }
}) 

buttons.reset.addEventListener("click",function(){
  currentTimeMin = 0;
  currentTimeSec = 0;
  timer.textContent = "00:00";
})

buttons.minus.addEventListener("click",function(){
  currentTimeSec-=10;
  if(currentTimeMin > 0 && currentTimeSec < 0){
    currentTimeSec = 60+currentTimeSec;
    currentTimeMin-=1;
  }
  if(currentTimeSec < 0)
    currentTimeSec = 0;
  print();
})

buttons.plus.addEventListener("click",function(){
  currentTimeSec += 10;
  check();
  print();  
});

buttons.reverse.addEventListener('click',function(){
  if(!isReverseInterval){
    if(isInterval) clearInterval(intervalId);
    isInterval = false;
    isReverseInterval = true;
    intervalId = setInterval(function(){
      --currentTimeSec;
      check();
      print();
    },1000)
  }
});

buttons.interval.addEventListener('click',function(){
  let currentTimeSecStr = currentTimeSec + "";
  let currentTimeMinStr = currentTimeMin + "";

  if(currentTimeMinStr.length == 1) currentTimeMinStr = "0" + currentTimeMinStr;
  if(currentTimeSecStr.length == 1) currentTimeSecStr = "0" + currentTimeSecStr;

  let fullTime = currentTimeMinStr + ":" + currentTimeSecStr;

  let row = table.insertRow(0);
  let cell = row.insertCell(0);

  cell.innerHTML = fullTime;

});






