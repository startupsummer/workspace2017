import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchRequest } from '../../../../resources/actions';

function Search (props) {
    return (
      <input className="subnav__search-input" onChange={(event) => {props.setSearchRequest(event)}} type="text" placeholder="Search" />
    )
}

export default connect(null, {
  setSearchRequest
})(Search);
