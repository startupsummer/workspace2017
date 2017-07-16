import React from 'react';
import IssuesItem from './IssuesItem.js'

const ListingBody = ({data,search,updatePage,currentState})=> {
     return (
     <ul className="issues"> {
         data.records.map(
           item => 
               ( (item.state === currentState) && (!search 
               || item.title.toLowerCase().includes(search.toLowerCase()) ) )  
               && IssuesItem({
                    item,
                    updatePage,
                    currentState,
                    data,
               })    
          )
    }
    </ul>
    );}

export default ListingBody;