import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header.js';
import Content from './components/Content.js'
import registerServiceWorker from './registerServiceWorker';
import records from './data.js';

let data = {
  records: records,
  getCountClose : function(){
    return this.records.length - this.getCountOpen();
  },
  getCountOpen : function(){
    let count = 0;
    for(let i of this.records){
      if(i.state === "open"){
        count++;
      }
    }
    return count;
  },
}
ReactDOM.render(
<main>
  <Header />
  <Content data = {data}/>
</main>

, document.getElementById('root'));
registerServiceWorker();
