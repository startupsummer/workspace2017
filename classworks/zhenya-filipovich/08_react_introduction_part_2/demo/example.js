import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


ReactDOM.render((
  <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <Route exact path="/" component={() => <h2>Home</h2>}/>
        <Route path="/about" component={() => <h2>About</h2>}/>
      </div>
    </Router>
  ),
  document.getElementById('root')
);
