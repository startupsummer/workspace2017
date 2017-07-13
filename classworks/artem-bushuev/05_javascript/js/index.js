const timer = {
    isTimer:true,
    time : document.querySelector('.timer'),
    second : 0,
    minutes : 0,
    id : undefined,
    
    getTime: function(){
        return this.minutes*60+this.second;
    },
   
    add : function(minutes,second){
        let time = this.getTime() + minutes*60 + second;
        console.log(time);
        if(time > 0){
          this.setTime( Math.floor(time / 60) , time % 60);
        }else{
          this.setTime(0,0);
        }
    },
    setTime(minutes,second){
        this.minutes = minutes;
        this.second = second;
    },
   
   stop: function(){
      clearInterval(this.id);
      this.id = undefined;
    },
    
    start : function(){
      if(!this.id && ( !this.isTimer || this.getTime() ) ) {
        this.id = setInterval(function(){
                if(timer.getTime() <= 0 && timer.isTimer ){
                  timer.stop();
                  timer.setTime(0,0);
                }else{
                    if(timer.isTimer){
                      timer.second--;
                    
                    }else{
                      timer.second++;
                    }
                    timer.writeInTextContent();
                }
              }, 1000);
      }
       
    },
    
    writeInTextContent : function(){
        if(this.second >= 60){
           this.minutes = this.minutes + Math.floor(this.second / 60);
           this.second = this.second % 60;
        }
        this.time.textContent = (this.minutes >= 10 ? this.minutes : ('0' + this.minutes)) +":"+ (this.second >= 10 ? this.second : ('0'+this.second));
    }
  }
const buttons = {
    start: document.querySelector('.start.button'),
    stop: document.querySelector('.stop.button'),
    reset: document.querySelector('.reset.button'),
    plus: document.querySelector('.plus.button'),
    minus: document.querySelector('.minus.button'),
    сlear: document.querySelector('.сlear.button'),
    counting: document.querySelector('.counting.button'),
    isTimer: document.querySelector('.isTimer')
};

timer.writeInTextContent();
