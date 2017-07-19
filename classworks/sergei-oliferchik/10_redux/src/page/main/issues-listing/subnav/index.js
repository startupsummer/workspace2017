import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addIssues } from 'src/resources/actions'

import Search from './subnav__search';
import Button from 'src/components/button';

import './index.css';

class Subnav extends Component{
  constructor(props) {
    super(props)
    this.state = {
      buttonColor: 'btn-primary',
      buttonText: 'new issues',
    };
  }
  
  render() {
    return (
      <div className="issues-listing__subnav">
        <div className="subnav">
            <Search eventSearch={this.props.eventSearch}/>
            <Button
              text={this.state.buttonText}
              color={this.state.buttonColor}
              eventClick={this.props.addIssues}
            />
        </div>
      </div>
    );
  }
}

export default connect(null, ({
  addIssues,
}))(Subnav);
