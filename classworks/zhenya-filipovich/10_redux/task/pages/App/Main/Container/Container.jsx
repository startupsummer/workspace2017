import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListingSubnav from './ListingSubnav';
import ListingHeader from './ListingHeader';
import ListingBody from './ListingBody';
import IssueDescription from './IssueDescription';
import './container.styles';

class Container extends Component {
  render() {
    return (
      <div className="container">
        <div className="issues-listing">
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <ListingSubnav />
                <ListingHeader />
                <ListingBody />
              </div>
            )}
          />
          <Route
            path="/issue/:number"
            render={props => (
              <IssueDescription
                number={props.match.params.number}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default Container;
