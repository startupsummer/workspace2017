import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


ReactDOM.render((
  <Router>
      <div>
        <Header />

        <Route exact path="/" component={Issues}/>
        <Route path="/:id" component={Discr}/>
      </div>
    </Router>
  ),
  document.getElementById('root')
);
