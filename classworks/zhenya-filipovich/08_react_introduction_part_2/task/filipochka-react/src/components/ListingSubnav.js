import React from 'react';
import Form from './Form';
import Button from './Button';
import PropTypes from 'prop-types';

const ListingSubnav = (props) => (
  <div className="issues-listing__subnav">
    <div className="subnav">
      <Form onChange={props.onChange}/>
      <Button
        className="btn btn-primary"
        onClick={props.onClick}
      >New issue</Button>
    </div>
  </div>  
)

ListingSubnav.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

export default ListingSubnav;
