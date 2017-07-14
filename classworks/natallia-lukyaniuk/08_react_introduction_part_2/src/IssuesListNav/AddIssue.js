import React from 'react';

const AddIssue = ({handleNewIssue}) => (
  <button onClick={handleNewIssue} className="btn btn-primary" type="button">
    New issue
  </button>
);

export default AddIssue;