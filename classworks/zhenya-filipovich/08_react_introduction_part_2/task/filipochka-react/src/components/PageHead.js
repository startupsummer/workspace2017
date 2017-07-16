import React from 'react';
import PropTypes from 'prop-types';
import RepoHead from './RepoHead';
import NavIssues from './NavIssues';

const PageHead = ({ itemsNumber }) => (
  <div className="pagehead">
    <RepoHead />
    <NavIssues itemsNumber={itemsNumber} />
  </div>
);

PageHead.propTypes = {
  itemsNumber: PropTypes.number,
};

export default PageHead;
