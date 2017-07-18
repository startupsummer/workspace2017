import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './index.js';
import MyButton from './components/button/button';
import List from './components/list/list';
import Data from './data/data'
import Search from './components/search/search';
import ListItem from './components/listItem/listItem';
import 'whatwg-fetch'


class App extends Component {

  constructor() {
    super();
    this.state = {
      issues: Data,
      st: 'open',
      findName: "",
      cratch: "",
     }
  }

  componentDidMount() {
    fetch('https://api.github.com/repos/Hellycat/react_test/issues?access_token=d76ef4819f603e1deb94be5479f229abc13a85e9&state=all')
      .then(response => response.json())
      .then(data => {
        this.setState({ issues: data });
      }); 
  }

  render() {
    const {searchIssues} = this.state;
    const allIssuies = this.state.issues.length;
    let openedAmount = 0;

    this.state.issues.map(function(e) {
      if(e.state === 'open') {
        openedAmount += 1;
      }
    });

    const closedAmount = allIssuies - openedAmount;

    return (
      <Router>

        <div>
          <Route path="/">
            <div>
              <div className="pagehead">
                <div className="container">
                  <nav className="reponav">
                    <a href="#" className="reponav-item selected">
                      <svg height="16" version="1.1" viewBox="0 0 14 16" width="14">
                        <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
                        </svg>
                        <Link to="/" className="reponav-item.selected btn-link">
                          {allIssuies} Issues
                        </Link>
                    </a>
                  </nav>
                </div>
              </div>

                <div className="container issues-listing">
                  <div className="issues-listing__subnav">
                    <Link to="/">
                      <div className="subnav">
                        <Search handle={this.searchHandle}/>
                        <MyButton className="btn btn-primary" value='New issue'
                           handler={this.handlerAdd}
                         />
                      </div>
                    </Link>
                  </div>

                  <div className="issues-listing__header">
                    <div className="issues-listing__states">
                      <svg aria-hidden="true" className="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14">
                        <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
                      </svg>
                      <MyButton className ="btn-link btn-link--selected"
                        value='Open' handler={this.openState} number={openedAmount}
                      />
                      <svg aria-hidden="true" className="octicon octicon-check" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
                      <MyButton className="btn-link" type="button" value='Closed'
                        handler={this.closeState} number={closedAmount}
                      />
                    </div>
                  </div>

                </div>
              </div>
          </Route>

          <Route exact path="/" component={() =>
            <div className="container">
              <div className="issues-listing__body">
                <List listData={this.state.issues} sortField={this.state.findName}
                  state={this.state.st} handler={this.handlerDel}
                />
              </div>
            </div>
          }/>

          <Route path="/:id" component={(props) =>
            <ListItem data={this.state.issues}
              id={props.match.params.id}/>}
          />

        </div>
      </Router>
    );
  }

   hadnlerUpdate = () => {
    fetch('https://api.github.com/repos/Hellycat/react_test/issues?access_token=d76ef4819f603e1deb94be5479f229abc13a85e9&state=all')
      .then(response => response.json())
      .then(data => {
        this.setState({ issues: data });
      }); 
  }

  handlerDel = (number) => (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/repos/Hellycat/react_test/issues/${number}?access_token=d76ef4819f603e1deb94be5479f229abc13a85e9`, {
      method: "PATCH",
      body:JSON.stringify({
        state: "closed",
      })
    })
    .then(response => response.json())
    .then(data => {

      let length = this.state.issues.length

      let tempData = [...this.state.issues]
      for(let i = 0; i < length; i++) {
        if(this.state.issues[i].id === data.id) {
          tempData[i].state = `closed`;
          break;
        }
      }

      this.setState({issues: tempData})
    });
  }

  handlerAdd = (e) => {
    console.log("handler add");
    e.preventDefault();
    fetch('https://api.github.com/repos/Hellycat/react_test/issues?access_token=d76ef4819f603e1deb94be5479f229abc13a85e9', {
      method: "POST",
      body:JSON.stringify({
        title: Math.random().toString(36).slice(2),
        body: Math.random().toString(36).slice(2),
        state: "open",
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      this.setState({issues: [...this.state.issues, data]})
    });

  }

  searchHandle = (e) => {
    const findName = e.target.value;

    this.setState({
      findName: findName,
    })
  }

  closeState = (e) => {
      e.preventDefault();
      this.setState({
        st: 'closed'
      })
  }

  openState = (e) => {
      e.preventDefault();
      this.setState({
        st: 'open'
      })
  }

  allState = (e) => {
      e.preventDefault();
      this.setState({
        st: 'all'
      })
  }
}

export default connect(
  list
)(App);
