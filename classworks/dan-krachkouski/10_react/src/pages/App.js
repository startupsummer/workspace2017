import React, {Component} from 'react';
import classNames from 'classnames';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import PageHead from '../components/PageHead';
import Issues from './Issues/Issues';
import DetailedIssue from './DetailedIssue/DetailedIssue';

class App extends Component {
  shouldComponentUpdate(newProps) {
    return false;
  }

  render() {
    return (
      <Router>
        <main className="content">

          <PageHead
            user="startupsummer"
            repo="dan's_react_task" />

          <Route exact path="/" component={Issues} />

          <Route exact path="/:id" component={DetailedIssue} />

        </main>
      </Router>
    );
  }
}

export default App;

/*
component={ ({ match }) =>
  <DetailedIssue data={ issues.find(issue => issue.id === +match.params.id) }/>
} />*/
