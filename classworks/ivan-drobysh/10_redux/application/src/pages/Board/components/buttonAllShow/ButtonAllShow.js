import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { setStateShow } from '../../../../resources/actions';
import { connect } from 'react-redux';

class AllShow extends Component {
  onClick = () => {
    this.props.setStateShow('all');
  }
  render() {
    let className = "btn-link ";
    if(this.props.stateShow === 'all') className+= "btn-link--selected";
    return (
      <Link to='/'>
        <button onClick={this.onClick} className={className} type="button">
          All
        </button>
      </Link>
    )
  }
}

export default connect((state) => {
  return {
    stateShow: state.stateShow,
  }
}, {
  setStateShow,
})(AllShow);
