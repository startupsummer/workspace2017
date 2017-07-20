
import React from 'react';

const ElementDescription = (item) => {  
  return <div>
        <p> title: {item.title} </p>
        <p> {item.context} </p> 
        <p> state: {item.state}</p>
    </div>
}

export default ElementDescription;