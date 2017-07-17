import React, { Component } from 'react';
import SubnavSearch from './SubnavSearch.js';
import Button from '../Buttons/Button.js';
import '../../main.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="issues-listing__subnav">
        <div className="subnav">
          <SubnavSearch onChange={this.props.onSearchChange} />
          <Button text='New issue' className='btn-primary' onClick={this.props.onButtonClick} />
        </div>
      </div>
    )
  }
}

export default Navigation;
