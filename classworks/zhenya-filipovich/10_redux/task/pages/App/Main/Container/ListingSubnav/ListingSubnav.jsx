import React from 'react';
import PropTypes from 'prop-types';
import Form from 'components/Form';
import Button from 'components/Button';
import './listing-subnav.styles';

const ListingSubnav = ({ onChange, onClick }) => (
  <div className="issues-listing__subnav">
    <div className="subnav">
      <Form onChange={onChange} />
      <Button
        className="btn btn-primary"
        onClick={onClick}
      >New issue</Button>
    </div>
  </div>
);

ListingSubnav.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListingSubnav;
