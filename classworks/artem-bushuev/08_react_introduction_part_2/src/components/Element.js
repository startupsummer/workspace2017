import React from 'react';
import ElementDescription from './element/ElementDescription.js';
 
 const Element = (data,id,findById)=> {
     var item = findById(data,id);
     return (
      <div>
        { 
          item ?  
           ElementDescription(item)
          : "doesn't exist"
       }
       </div>
     );}
 
 export default Element; 