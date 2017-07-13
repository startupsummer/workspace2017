import React, { Component } from 'react';
import Header from './header.js';
import Pageheader from './Pageheader.js';
import SubnavSearch from './SubnavSearch.js';
import Button from './Button.js';
import ButtonLink from './ButtonLink.js';
import Issues from './Issues.js';
import data from './data.js';
import './App.css';
import './main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: data,
      menuState : "open"
    };
  }

  handleOpenButtonLinkClick() {
    this.setState({
      menuState : "open"
    });
  }

  handleClosedButtonLinkClick() {
    this.setState({
      menuState : "closed"
    });
  }

  render() {
    return (
      <div>
        <Header />
        <main className="content">
          <Pageheader count={this.state.issues.length} />
          <div className="container">
            <div className="issues-listing">
              <div className="issues-listing__subnav">
                <div className="subnav">
                  <SubnavSearch />
                  <Button text='New issue' className='btn-primary' />
                </div>
              </div>
              <div className="issues-listing__header">
                <div className="issues-listing__states">
                  <ButtonLink className=" btn-link--selected" svgClassName="octicon-issue-opened" text="Open"
                    count={this.state.issues.filter((item) => { if (item.state === "open") return true;}).length}
                    onClick={this.handleOpenButtonLinkClick} />
                  <ButtonLink className="" svgClassName="octicon-check" text="Close"
                    count={this.state.issues.filter((item) => { if (item.state === "closed") return true;}).length}
                    onClick={this.handleClosedButtonLinkClick} />
                </div>
              </div>
              <div className="issues-listing__body">
                <Issues issues={this.state.issues} menuState={this.state.menuState} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
