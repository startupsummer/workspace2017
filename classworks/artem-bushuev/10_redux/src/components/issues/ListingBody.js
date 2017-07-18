import React from 'react';
import IssuesItem from './IssuesItem.js'

const ListingBody = (dataFormState,search,currentState,updatePageData)=> {
  let data = [ ...dataFormState];
     return (
     <ul className="issues"> {
         data.map(
           item => 
               ( (item.state === currentState) && (!search 
               || item.title.toLowerCase().includes(search.toLowerCase()) ) )  
               && IssuesItem(item,updatePageData,currentState,data) 
               )
    }
    </ul>
    );
  }

export default ListingBody;