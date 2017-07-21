import React, { Component } from 'react';
import Container from './pagehead/Container.js';
import RepoheadContainer from './pagehead/RepoheadContainer.js'
import ListingStates from './issues/ListingStates.js'
import ListingBody from './issues/ListingBody.js'
import Subnav from './issues/Subnav.js'
import { Route } from 'react-router-dom'
import Element from './Element.js'
import fromStore from '../index.selectors'
import { connect } from 'react-redux'

class Content extends Component {
  
  render(){
    return (                                          
      <div className = "content">
        <div className = "pagehead">  
          <RepoheadContainer /> 
          <Container />
        </div>

        <div className = "container">
        <Route exact path='/' render={
          ()=>{
            return <Subnav />  
          }
        }/> 
            
        <Route exact path='/' component={
          ()=>{
            return <ListingStates />
          }
        }/> 

        <Route exact path='/' component={
          ()=>{
            return  <ListingBody />
          }
        } />
         
        <Route path={`/:id`} component={
          (props)=> 
            <Element id = {props.match.params.id} /> 

        } />
         
        </div>
     </div>
    );
  }
}

export default connect( (store) => ({
  data: fromStore.getData(store),
  state: fromStore.getState(store),
  search: fromStore.getSearch(store),
}))(Content);
