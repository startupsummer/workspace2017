import React from 'react';
import RepoHead from './RepoHead';
import NavIssues from './NavIssues';
import PropTypes from 'prop-types';

const PageHead = (props) => (
  <div className="pagehead">
    <RepoHead />
    <NavIssues itemsNumber={props.itemsNumber}/>
  </div>
)

PageHead.propTypes = {
  itemsNumber: PropTypes.string,
}

export default PageHead;
