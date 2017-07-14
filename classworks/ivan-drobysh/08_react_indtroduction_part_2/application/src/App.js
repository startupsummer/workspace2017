import React, { Component } from 'react';
import './components/main.css';
import Header from './components/Header'
import PageHead from './components/PageHead'
import ListSubnav from './components/listing/ListSubnav';
import ListHeader from './components/listing/ListHeader';
import ListBody from './components/listing/ListBody';
import Description from './components/listing/Description';
import data from './data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {


    super(props);
    this.state = {
      searchText: '',
      issuesAll: [],
      stateShow: 'all',
    }
  }
  componentDidMount() {
    fetch('https://api.github.com/repos/Ivanko5417/google/issues?access_token=c2bca6983f3a5881e7d364c6d300e659862617b2&state=all')
    .then((resp) => resp.json())
    .then(data=>{
    console.log(data);
    this.setState({issuesAll: data.map((item) => ({
      id: item.id,
      description: item.body,
      title: item.title,
      state: item.state,
      number: item.number,
    }))});
    });
  }

  newOnClick= () => {
    fetch('https://api.github.com/repos/Ivanko5417/google/issues?access_token=c2bca6983f3a5881e7d364c6d300e659862617b2', {
      method: 'POST',
      body: JSON.stringify({
        title: 'My issue',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      }),
    }).then((resp) => resp.json())
    .then( item => this.setState({issuesAll:
      [...this.state.issuesAll, {
        id: item.id,
        description: item.body,
        title: item.title,
        state: item.state,
        number: item.number,
      }]}));
  }

  closeOnClick = (item) => () => {
    let stateItem = item.state;
    let issues = Object.assign([], this.state.issuesAll);
    issues.map((itemIssues)=> {
      if(itemIssues.id === item.id) {
        if(stateItem === 'open')
          stateItem = 'closed';
        else
          stateItem = 'open';
      }
    });
    fetch(`https://api.github.com/repos/Ivanko5417/google/issues/${item.number}?access_token=c2bca6983f3a5881e7d364c6d300e659862617b2`, {
      method: 'PATCH',
      body: JSON.stringify({
        state: stateItem,
      }),
    }).then((resp) => resp.json())
    .then( item => this.setState({issuesAll:
        issues.map((issue, index) => {
        if(issue.id === item.id) {
          issues[index].state = stateItem;
          return issues[index];
        }
        return issue;
      })}));
      console.log(this.state.issuesAll);
  }
  count() {
    let close = 0, open = 0;
    open = this.state.issuesAll.reduce(
      (previousValue, currentValue, index, array)=> {
      if(currentValue.state === 'open')
        return previousValue + 1;
      return previousValue;
    }, 0);
    close = this.state.issuesAll.length - open;
    return {
      open,
      close,
    }
  }
  inputChange = (event) => {
    const searchText = event.currentTarget.value.toLowerCase();
    this.setState({searchText});
  }

  showIssues = () => {
    let issues =  this.state.issuesAll.filter((item) => item.title.toLowerCase().indexOf(this.state.searchText) !== -1);
    let state = this.state.stateShow;
    if(state !== 'all')  {
      issues = this.state.issuesAll.filter((item) => item.state === state);
      return issues;
    }
    else {
      return issues;
    }
  }
c2bca6983f3a5881e7d364c6d300e659862617b2
  setShow = (stateShow) => () => {
    this.setState({stateShow});
  }

  render() {
    let issues = this.showIssues();
    let count = this.count(issues);
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <Header />
          </div>
          <div className="content">
            <PageHead count={this.state.issuesAll.length}/>
            <div className="container">
              <div className="issues-listing">
                <ListSubnav onClick={this.newOnClick} onChange={this.inputChange}/>
                <ListHeader count={count} show={this.setShow} state={this.state.stateShow}/>
                <Route path="/:id" component={(props) => <Description issues={this.state.issuesAll} {...props} />} />
                <Route exact path="/" component={() => <ListBody data={issues} onClick={this.closeOnClick}/>}/>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
