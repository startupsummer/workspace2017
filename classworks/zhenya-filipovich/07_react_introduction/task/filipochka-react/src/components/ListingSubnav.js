import React, { Component } from 'react';
import Form from './Form';
import Button from './Button';
import PropTypes from 'prop-types';

class ListingSubnav extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    className: PropTypes.string
  }
  
  render() {
    return (
      <div className="issues-listing__subnav">
        <div className="subnav">
          <Form onChange={this.props.onChange}/>
          <Button
            className="btn btn-primary"
            onClick={this.props.onClick}
          >New issue</Button>
        </div>
      </div>
    )
  }
}

export default ListingSubnav;
