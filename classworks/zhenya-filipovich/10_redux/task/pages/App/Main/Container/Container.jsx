import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListingSubnav from './ListingSubnav';
import ListingHeader from './ListingHeader';
import ListingBody from './ListingBody';
import IssueDescription from './IssueDescription';
import './container.styles';

class Container extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    getDataFromServer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      openTab: 'open',
      inputValue: '',
    };
  }

  enableOpenTab = () => {
    this.setState({
      openTab: 'open',
    });
  }

  enableCloseTab = () => {
    this.setState({
      openTab: 'closed',
    });
  }

  changeIssueState = (item) => {
    const { number, state } = item;
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        state: (state === 'open') ? 'closed' : 'open',
      }),
    };

    fetch(`https://api.github.com/repos/filipochka97/react-github/issues/${number}?access_token=c8c50b1970bdd6f537626534103dba0a5dfb4b88`,
      options)
      .then(response => response.json())
      .then(data => this.props.getDataFromServer(data));
  }

  addIssues = () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        title: `Some problems with ${Math.trunc((Math.random() * 200))}`,
        body: 'Description of this problem',
      }),
    };

    fetch('https://api.github.com/repos/filipochka97/react-github/issues?' +
    'access_token=c8c50b1970bdd6f537626534103dba0a5dfb4b88', options)
      .then(response => response.json())
      .then(data => this.props.getDataFromServer(data));
  }

  searchIssue = (e) => {
    this.setState({
      inputValue: e.target.value.toLowerCase(),
    });
  }

  render() {
    return (
      <div className="container">
        <div className="issues-listing">
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <ListingSubnav
                  onClick={this.addIssues}
                  onChange={this.searchIssue}
                />
                <ListingHeader
                  enableOpenTab={this.enableOpenTab}
                  enableCloseTab={this.enableCloseTab}
                  items={this.props.items}
                  openTab={this.state.openTab}
                />
                <ListingBody
                  items={this.props.items}
                  inputValue={this.state.inputValue}
                  openTab={this.state.openTab}
                  changeIssueState={this.changeIssueState}
                />
              </div>
            )}
          />
          <Route
            path="/issue/:number"
            render={props => (
              <IssueDescription
                number={props.match.params.number}
                items={this.props.items}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default Container;
