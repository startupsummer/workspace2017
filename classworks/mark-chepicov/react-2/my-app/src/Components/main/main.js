import React, { PureComponent } from 'react';
import '../../main.css';
import {Route} from 'react-router-dom';
import Issues from './issues/issues.js';
import SubNavigation from './sub_navigation/subnav.js';
import Repo from './repo/repo.js';
import data from './data/data.js';
import Description from './description/description.js';
import IssueList from './issue_list/issue-list.js';
import IssueHeader from './issue_header/issue-header.js';
import 'whatwg-fetch';

class Main extends PureComponent {
  state = {
    issues: data,
    tab: 'open',
    text: '',
  };

  openState = (status) => () => {
    status !== this.state.tab ? this.setState({tab : status}) : true;
  }

  closeIssue = (id) => () => {
    const issue = this.state.issues.find((item) => item.id === id);
    const number = issue.number;
    fetch(
      `https://api.github.com/repos/chepicov/react/issues/${number}?access_token=9294d42dc8c23075967707aa366e867931fcb2d6`, 
      {
        body: JSON.stringify({
          state: 'closed'
        }),
        method: 'PATCH'
      }
    )
    .then(response => response.json())
    .then(data => {
      const array = this.state.issues.map((item) => item.id === id ? {...item, state:'closed'} : item);
      return this.setState({issues:array})
    });
  }

  openIssue = (id) => () => {
    const issue = this.state.issues.find((item) => item.id === id);
    const number = issue.number;
    fetch(
      `https://api.github.com/repos/chepicov/react/issues/${number}?access_token=9294d42dc8c23075967707aa366e867931fcb2d6`, 
      {
        body: JSON.stringify({
          state: 'open'
        }),
        method: 'PATCH'
      }
    )
    .then(response => response.json())
    .then(data => {
      const array = this.state.issues.map((item) => item.id === id ? {...item, state:'open'} : item);
      return this.setState({issues:array})
    });
  }

  newIssue = () => () => {
    fetch(
      'https://api.github.com/repos/chepicov/react/issues?state=all;access_token=9294d42dc8c23075967707aa366e867931fcb2d6', 
      {
        body: JSON.stringify({ 
          title: 'Lorem ipsum', 
          body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", 
          state: 'open'
        }),
        method: 'POST'
      }
    )
    .then(response => response.json())
    .then(data => {
      data = {...data, id: `${data.id}`};
      return this.setState({issues:[...this.state.issues, data]})
    });
  }

  search = (event) => {
    this.setState({text: event.target.value});
  }

  componentDidMount(){
    fetch('https://api.github.com/repos/chepicov/react/issues?state=all;access_token=9294d42dc8c23075967707aa366e867931fcb2d6')
    .then(response => response.json())
    .then(data => {
      data = data.map(item => {return {...item, id: `${item.id}`}});
      return this.setState({issues: data})
    });
  }

  render() {
    const newIssues = this.state.issues.filter((item) => item.title.indexOf(this.state.text) !== -1);
    return (
      <main className="content">
        <div className="pagehead">
          <Repo 
            repname="startupsummer" 
            taskname="react-task-1"
          />
          <Issues counter={this.state.issues.length} />
        </div>
        <div className="container">
          <div className="issues-listing">
            <SubNavigation 
              newIssue={this.newIssue} 
              search={this.search} 
            />
            <IssueHeader 
              tab={this.state.tab}
              openState={this.openState}
              newIssues={newIssues} 
            />
            <Route 
              exact path="/" 
              component={(props) =>
              <IssueList 
                issues={newIssues} 
                tab={this.state.tab} 
                text={this.state.text}
                openIssue={this.openIssue}
                closeIssue={this.closeIssue}
                {...props} 
              />} 
            />
            <Route
              path="/:id"
              render={(props) => 
              <Description
                item={newIssues.find((issue) => props.match.params.id === issue.id)}
                location={props.location}
                {...props}
              />
              }
            />
          </div>
        </div>
      </main>
    );
  }
}
export default Main;
