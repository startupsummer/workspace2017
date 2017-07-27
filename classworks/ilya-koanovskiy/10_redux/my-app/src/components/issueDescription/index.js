import React from 'react';
import { connect } from 'react-redux';
import select from '../../Resources/issues/issues.selectors';

function Description(props){
  const filteredIssue = props.issues.filter(item => item.id == props.match.params.id);

  return(
    <div>
      <h1>{filteredIssue[0].title}</h1>
      <p>{filteredIssue[0].body}</p>
    </div>
  )    
}

export default connect(state => ({
  issues : select.getIssues(state)
}))(Description);
