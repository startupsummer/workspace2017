import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header.js';
import Content from './components/Content.js'
import registerServiceWorker from './registerServiceWorker';
import data from './data.js';

ReactDOM.render(
<main>
  <Header />
  <Content data = {data}/>
</main>

, document.getElementById('root'));
registerServiceWorker();
