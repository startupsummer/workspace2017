import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header.js';
import Content from './components/Content.js'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
< main>
  { Header() }
  <Router>
    < Content/>
  </Router >
</main >

, document.getElementById('root'));
registerServiceWorker();
