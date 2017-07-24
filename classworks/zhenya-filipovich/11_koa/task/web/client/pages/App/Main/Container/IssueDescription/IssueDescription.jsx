import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './issue-description.styles';

const IssueDescription = ({ number, items }) => {
  const id = number.slice(1);
  const title = items.find(item => item.id === Number(id));
  return (
    <div>
      <h1 className="issues__item">{title.title}</h1>
      <p className="issues__description">{title.body}</p>
    </div>
  );
};

IssueDescription.propTypes = {
  number: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(state => ({
  items: state.issues,
}))(IssueDescription);
