import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header.js';
import Content from './components/Content.js'
import registerServiceWorker from './registerServiceWorker';
import records from './data.js';
import { BrowserRouter as Router } from 'react-router-dom';


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
  findById(id){ 
    for(let i = 0 ; i < this.records.length ; ++i){
      if(this.records[i].id === Number(id)){
        return this.records[i];
      }
    }
  },
}

ReactDOM.render(
<main>

  {Header()}
  
  <Router>
    <Content data = {data}/>
  </Router>

</main>

, document.getElementById('root'));
registerServiceWorker();
