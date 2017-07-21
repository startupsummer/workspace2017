import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header.js'
import Content from './components/Content.js'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
< main>
  <Header />
  
  <Router>
    <Provider store ={store}>
    <Content />
    </Provider>
  </Router>
</main >

, document.getElementById('root'));

registerServiceWorker();
