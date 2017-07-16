import React from 'react';
import ElementDescription from './element/ElementDescription.js';
 
 const Element = ({data,id})=> {
     var item = data.findById(id);
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