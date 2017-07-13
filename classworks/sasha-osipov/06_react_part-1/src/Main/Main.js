import React, { Component } from 'react';
import Button from './Button';
import data from '../data';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'open',
      issues: data,
    }
  }
  
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
    this.setState({
      issues: this.state.issues.map(item => item.id === id ? { ...item, state: 'closed'} : item),
    })
  }

  openItem = (id) => () => {
    this.setState({
      issues: this.state.issues.map(item => item.id === id ? { ...item, state: 'open'} : item),
    })
  }

  newIssue = () => {
    const newItem = {
      "id": Math.random()*1000000000,
      "state" : "open",
      "title" : "Hello, it's me",
    };
    const newIssues = [...this.state.issues, newItem];
    this.setState({
      issues: newIssues,
    })
  }

  render() {

  const renderIssues = this.state.issues.filter(item => item.state === this.state.tab);
  const count = this.state.issues.length - renderIssues.length;
  
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
                        <span className="counter">{ this.state.issues.length }</span>
                    </a>
                </nav>
            </div>
        </div>
      
    <div className="container">
      <div className="issues-listing">
        <div className="issues-listing__subnav">
          <div className="subnav">
            <Button btn primary text="New Issue" click={this.newIssue}/>
          </div>
        </div>

        <div className="issues-listing__header">
          <div className="issues-listing__states">
            <Button link selected={this.state.tab === 'open'} text={`Open ${this.state.tab === 'open' ? renderIssues.length : count}`} click={this.openList}>
            </Button>

            <Button link selected={this.state.tab === 'closed'} text={`Closed ${this.state.tab === 'closed' ? renderIssues.length : count}`} click={this.closedList}>
            </Button>
          </div>
        </div>

        <div className="issues-listing__body">
          <ul className="issues">
              {renderIssues.length !== 0 ? renderIssues.map(item => 
                <li key={ item.id } className="issues__item">
                  <div className="issues__title">
                    <a href="" className="issues__link">
                      {item.title}
                    </a>
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