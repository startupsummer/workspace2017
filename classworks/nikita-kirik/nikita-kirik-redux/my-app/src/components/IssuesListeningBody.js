import React from 'react';
import IssuesItem from './IssuesItem';


const IssuesListeningBody = ({ onIssueToogle, text, data, issuesType }) => {
  console.log(data);
  const data2 = data;
  const listItems = data2
    .filter(it => issuesType === it.state && it.title.search(new RegExp('^' + text, 'i')) !== -1)
    .map(it => <IssuesItem itemData={it} onIssueToogle={onIssueToogle} />);

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
