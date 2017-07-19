import React from 'react';
import IssuesItem from './IssuesItem';


const IssuesListeningBody = ({ onIssueToogle, text, data, issuesType }) => {
  const listItems = data
    .filter(it => issuesType === it.state && it.title.search(new RegExp('^' + text, 'i')) !== -1)
    .map(it => <IssuesItem itemData={it} data={data} />);
  return (
    <ul className="issues">
      {listItems}
    </ul>
  );
}

IssuesListeningBody.propTypes = {
  onIssueToogle: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  issuesType: React.PropTypes.string.isRequired,
}

export default IssuesListeningBody;
