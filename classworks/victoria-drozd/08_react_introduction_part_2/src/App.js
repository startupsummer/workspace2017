import React, {Component, PropTypes} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Pagehead from './Pagehead';
import Container from './Container';
import Description from './Description';

import {displayAll} from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: displayAll(props.data)
    };
    this.handleAddNewIssue = this.handleAddNewIssue.bind(this);
    this.handleCloseIssue = this.handleCloseIssue.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
  }

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired
    })).isRequired
  };

  handleAddNewIssue(issues) {
    this.setState({issues});
  }

  handleCloseIssue(id) {
    this.setState((prevState) => {
      const newData = prevState.issues.map(issue => {
        if (issue.id !== id) {
         return issue;
        }

        return {...issue, state: 'closed'};
      });

      return {issues: newData};
    });
  }

  handleSearchText(text) {
    this.setState((prevState) => {
      const newData = prevState.issues.map(issue => ({
        ...issue,
        display: Boolean(~issue.title.toLowerCase().indexOf(text.toLowerCase()))
      }));

      return {issues: newData};
    });
  }

  render() {
    const { issues } = this.state;

    return (
      <Router>
        <div>
          <Pagehead issuesNum={issues.length} />
          <Route exact path="/" component={() => (
            <Container
              data={issues}
              handleAddNewIssue={this.handleAddNewIssue}
              handleCloseIssue={this.handleCloseIssue}
              handleSearchText={this.handleSearchText}
          />
          )} />
          <Route exact path="/:id" component={({match}) => (
            <Description
              issue={issues.find(elem => elem.id === +match.params.id)}
            />
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
