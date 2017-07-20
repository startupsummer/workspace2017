import React, {Component} from 'react';
import classNames from 'classnames';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import lorem from 'lorem-ipsum';

import PageHead from './PageHead';
import Issues from './Issues';
import DetailedIssue from './DetailedIssue';

const access_token = 'access_token=bfc4541d21741c3b3e3e20e9b407b4f84d1686fa';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { issues: [] }
  }

  // callback
  openIssue = () => {
    fetch(`https://api.github.com/repos/danilyanich/special-waffle/issues?${access_token}`, {
      method: 'POST',
      body: JSON.stringify({
        title: lorem(),
        body: lorem({ count: 5 })
      })
    })
    .then(response => response.json())
    .then(data => {
      const issues = this.state.issues.splice(0);
      issues.push(data);
      this.setState({ issues });
    });
  };

  // argument wrappers
  setIssueState = (number, state) => () => {
    fetch(`https://api.github.com/repos/danilyanich/special-waffle/issues/${number}?${access_token}`, {
      method: 'PATCH',
      body: JSON.stringify({
        state: state
      })
    })
    .then(response => response.json())
    .then(data => {
      let { issues } = this.state;
      issues = issues.splice(0);
      let found = issues.find(issue => data.id === issue.id);
      if (found) found.state = state;
      this.setState({ issues });
    });
  };

  componentDidMount() {
    fetch(`https://api.github.com/repos/danilyanich/special-waffle/issues?${access_token}&state=all`)
    .then(response => response.json())
    .then(data => {
      data = data.filter(issue => !issue.pull_request);
      this.setState({ issues: data });
    });
  }

  render() {
    const { issues } = this.state;

    return (
      <Router>
        <main className="content">

          <PageHead
            user="startupsummer"
            repo="dan's_react_task"
            count={ issues.length } />

          <Route exact path="/" component={ () =>
            <Issues
              data={ issues }
              callbacks={{ openIssue: this.openIssue }}
              wraps={{ setIssueState: this.setIssueState }} />
          } />

          <Route exact path="/:id" component={ ({ match }) =>
            <DetailedIssue data={ issues.find(issue => issue.id === +match.params.id) }/>
          } />

        </main>
      </Router>
    );
  }
}

export default App;
