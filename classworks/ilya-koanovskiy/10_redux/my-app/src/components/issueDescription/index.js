import React from 'react';
import { connect } from 'react-redux';
import select from '../../Resources/issues/issues.selectors';

function Description(props){
  console.log(props);
  return(
  <div>
    {   
      props.issues.filter((item)=>{
        if(item.id == props.match.params.id){
          return item;
        }
      }).map((item)=>
      <div>
        <h1>{item.title}</h1>
        <p>{item.body}</p>
      </div>
      )
    }
  </div>
  )    
}

export default connect(state => ({
  issues : select.getIssues(state),
  activeButton : select.getIssuesState(state),
  value : select.getValue(state)
}))(Description);