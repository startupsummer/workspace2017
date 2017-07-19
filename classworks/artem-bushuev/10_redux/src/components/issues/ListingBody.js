import React from 'react';
import IssuesItem from './IssuesItem.js'
import fromStore from '../../index.selectors'
import { connect } from 'react-redux'

const ListingBody = ({data,search,state})=> {
  return (
    <ul className="issues"> {
      data.map(
        item => 
          ( (item.state === state) && (!search 
          || item.title.toLowerCase().includes(search.toLowerCase()) ) )  
          && <IssuesItem item = {item} /> 
      )
    }
    </ul>
    );
  }

export default connect( (store) => ({
  data: fromStore.getData(store),
  state: fromStore.getState(store),
  search: fromStore.getSearch(store),
}))(ListingBody);