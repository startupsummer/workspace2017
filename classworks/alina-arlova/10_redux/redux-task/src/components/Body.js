import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromStore from '../resources/issues.selector.js';
import { fetchIssues } from '../resources/issues.actions.js';
import IssuesHeader from './Headers/IssuesHeader.js';
import Pageheader from './Headers/Pageheader.js';
import Navigation from './Navigation/Navigation.js';
import Issues from './Issues/Issues.js';
import Description from './Issues/Description.js';
import '../main.css';

class Body extends React.Component {
  render() {
    return (
      <main className="content">
        <Pageheader />
        <div className="container">
          <div className="issues-listing">
            <Navigation />
            <IssuesHeader />
            <Issues />
          </div>
        </div>
      </main>
    );
  }
}

export default Body;
