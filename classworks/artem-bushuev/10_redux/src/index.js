import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header.js';
import Content from './components/Content.js'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';


import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import store from './store'

//const store = createStore( () => {}, {}); 
console.log(store.getState());


ReactDOM.render(
< main>
  <Header />
  <Router>
    <Provider store ={store}>
    < Content/>
    </Provider>
  </Router >
</main >

, document.getElementById('root'));
registerServiceWorker();
