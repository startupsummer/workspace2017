import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header.js';
import Content from './components/Content.js'
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
<main>
  <Header />
  <Content/>
</main>

, document.getElementById('root'));
registerServiceWorker();
