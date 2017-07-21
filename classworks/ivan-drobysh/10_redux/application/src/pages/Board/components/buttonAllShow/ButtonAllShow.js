import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { setStateShow } from '../../../../resources/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

AllShow.propTypes = {
  stateShow: PropTypes.string,
  setStateShow: PropTypes.func,  
};

export default connect((state) => {
  return {
    stateShow: state.stateShow,
  }
}, {
  setStateShow,
})(AllShow);
