import React from 'react';
import { connect } from 'react-redux';
import { setSearchRequest } from '../../../../resources/actions';
import PropTypes from 'prop-types';

function Search (props) {
    return (
      <input className="subnav__search-input" onChange={(event) => props.setSearchRequest(event)} type="text" placeholder="Search" />
    )
}

Search.propTypes = {
  setSearchRequest: PropTypes.func,
};

export default connect(null, {
  setSearchRequest
})(Search);
