let num = 0;
function start(){
    timer.start();
}
function stop(){
    timer.stop();
}
function plus(){
    timer.add(0,10)
    timer.writeInTextContent();
}
function minus(){
    timer.add(0,-10);
    timer.writeInTextContent();
}
function reset(){
    timer.setTime(0,0);
    timer.writeInTextContent();
}

function clear(){
    num = 0;
    var node = document.getElementById('table').childNodes[1].childNodes;
    console.log(node);
    while(node.length > 1){
        node[1].parentNode.removeChild(node[1]);
        buttons.сlear.addEventListener("click", clear);
    }   
}
function counting(){
    num ++;
    document.getElementById('table').childNodes[1].appendChild(getEntryInTable(num,timer.minutes,timer.second));
}
function getEntryInTable(num,minutes,second){
    let tr = document.createElement("tr");
    tr.appendChild(creteTd(num));
    tr.appendChild(creteTd(minutes));
    tr.appendChild(creteTd(second)); 
    return tr;

    function creteTd(content){
        let td = document.createElement("td");
        td.textContent = content;
        return td;
    }
}
function isTimer(){
    timer.isTimer = !timer.isTimer;
    let content = timer.isTimer?"Таймер":"Секундомер";
    document.querySelector('.isTimer').textContent = content;
}