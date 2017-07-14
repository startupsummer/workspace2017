import React, { Component } from 'react';
import IssuesItem from './IssuesItem';


const IssuesListeningBody = ({ onIssueToogle, text, issuesState }) => {
  const data = issuesState.data;
  const listItems = data
    .filter(it => issuesState.issuesType === it.state && it.title.search(new RegExp('^' + text, 'i')) !== -1)
    .map(it =>
      <IssuesItem itemData={it} onIssueToogle={onIssueToogle} />
    );
  return (
    <ul className="issues">
      {listItems}
    </ul>
  );
}

IssuesListeningBody.propTypes = {
  onIssueToogle: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired,
  issuesState: React.PropTypes.object.isRequired,
}

export default IssuesListeningBody;
