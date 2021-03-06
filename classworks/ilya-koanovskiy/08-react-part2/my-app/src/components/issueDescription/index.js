import React, { Component } from 'react';

function Description(props){
  console.log(props);
  return(
  <div>
    {   
      props.items.filter((item)=>{
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

export default Description;