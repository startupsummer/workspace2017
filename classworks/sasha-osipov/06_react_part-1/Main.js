import React, { Component } from 'react';
import Button from './Button';
// import data from '../data';
import './Main.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Main extends Component {
  
  openList = () => {
    this.setState({
      tab: 'open',
    })
  }

  closedList = () => {
    this.setState({
      tab: 'closed',
    })
  }

  closeItem = (id) => () => {
    const issues = this.props.issues;
    this.setState({
      issues: issues.issues.map(item => item.id === id ? { ...item, state: 'closed'} : item),
    })
  }

  openItem = (id) => () => {
    const issues = this.props.issues;
    this.setState({
      issues: issues.issues.map(item => item.id === id ? { ...item, state: 'open'} : item),
    })
  }

  newIssue = () => {
    const newItem = {
      "id": Math.random()*1000000000,
      "state" : "open",
      "title" : "Hello, it's me",
    };
    const newIssues = [...this.props.issues, newItem];
    this.setState({
      issues: newIssues,
    })
  }

  searchTitle = (event) => {
    this.setState({
      value: event.target.value,
    })
    console.log(event.target.value);
  }

  getTitle = (title) => () => {
    return title;
  }

  render() {

  const issues = this.props.issues;

  const renderIssues = issues.issues.filter(item => item.state === issues.tab && item.title.toLowerCase().includes(issues.value.toLowerCase()));

  const openIssues = issues.issues.filter(item => item.state === 'open');
  const closeIssues = issues.issues.filter(item => item.state === 'closed');
  
  const countOpen = openIssues.length;
  const countClose = closeIssues.length;
  
  return (
    
  <main className="content">
    <div className="pagehead">
            <div className="container repohead-container">
                <h1 className="pagehead-title">
                <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 12 16" width="12">
                    <path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path>
                </svg>
                <a href="">startupsummer</a>
                <span>/</span>
                <b><a href="">react-task-1</a></b>
                </h1>
            </div>
            <div className="container">
                <nav className="reponav">
                    <a href="" className="reponav-item selected">
                        <svg height="16" version="1.1" viewBox="0 0 14 16" width="14">
                            <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
                        </svg>
                        <span>Issues</span>
                        <span className="counter">{ issues.issues.length }</span>
                    </a>
                </nav>
            </div>
        </div>
      
    <div className="container">
      <div className="issues-listing">
        <div className="issues-listing__subnav">
          <div className="subnav">
            <form className="subnav__search">
              <input className="subnav__search-input" type="text" placeholder="Search" onChange={this.searchTitle}/>
              <svg className="subnav__search-icon" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path></svg>
            </form>
            <Button btn primary text="New Issue" click={this.newIssue}/>
          </div>
        </div>

        <div className="issues-listing__header">
          <div className="issues-listing__states">
            <Button link selected={issues.tab === 'open'} text={`Open ${ countOpen }`} click={this.openList}>
            </Button>

            <Button link selected={issues.tab === 'closed'} text={`Closed ${ countClose }`} click={this.closedList}>
            </Button>
          </div>
        </div>

        <div className="issues-listing__body">
          <ul className="issues">
              {renderIssues.length !== 0 ? renderIssues.map(item => 
                <li key={ item.id } className="issues__item">
                  { item.state === 'open' ? 
                  <div className="issues__status issues__status--open">
                    <svg className="issues__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                  </div> : 
                  <div className="issues__status issues__status--closed">
                    <svg className="issues__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                  </div> 
                  }  
                  <div className="issues__title">
                    <Link className="issues__link" to="/description" onClick={ this.getTitle(issues.title) }>{item.title}</Link>
                  </div>
                  { item.state === 'open' ? <Button btn text="Close issue" click={this.closeItem(item.id )}/> :
                  <Button btn text="Open issues" click={this.openItem(item.id)}/>}
                </li>): 
              
                <li className="issues__item">{ this.state.tab === 'open' ? 'No open issues' : 'No closed issues' }</li> }
          </ul>
        </div>

        </div>
      </div>
      </main>

    );
  }
}

export default Main;