import React, { Component } from 'react';
import Container from './pagehead/Container.js';
import RepoheadContainer from './pagehead/RepoheadContainer.js';
import ListingStates from './issues/ListingStates.js'
import ListingBody from './issues/ListingBody.js'
import Subnav from './issues/Subnav.js'

import { Route } from 'react-router-dom';
import Element from './Element.js'

import fromStore from '../index.selectors'
import { connect } from 'react-redux';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "open",
    };
    
  }
  
  
  getCountClose = () => {
    return this.props.data.length - this.getCountOpen();
  }
  getCountOpen = () => {
    let count = 0;
    for(let i of this.props.data){
      if(i.state === "open"){
        count++;
      }
    }
    return count;
  }
  findById(data,id){ 
    for(let i = 0 ; i < data.length ; ++i){
      if(data[i].id === Number(id)){
        return data[i];
      }
    }
  }

  updatePageSearch = (search)  => {
    this.setState({
      data: this.props.data,
      state: this.state.state,
      search,
    });
  }
  updatePageState = (state) => {
    this.setState({
      data: this.props.data,
      state,
      search: this.state.search,
    });
  }
  updatePageData = (data) => {
    this.setState({
      data,
      state: this.state.state,
      search: this.state.search,
    });
  }
  


  render() {

    console.log('constructor');
    console.log(this.props);

    return (
     <div className = "content">
        <div className = "pagehead">
            < RepoheadContainer />
            < Container />
        </div >

        < div className = "container">
                        
            <Route exact path='/' render={
              ()=>{
                return <Subnav updatePageSearch = {this.updatePageSearch}
                                updatePageData = {this.updatePageData}
                 />
              }
            }
            /> 

            < Route exact path='/' component={
              ()=>{
                return ListingStates(this.props.data,
                  this.updatePageState,
                  this.getCountOpen(),
                  this.getCountClose(),
            )}
            }
            /> 

            <Route exact path='/' component={
              ()=>{
               return ListingBody(this.props.data,
                this.state.search,
                this.state.state,
                this.updatePageData,
            )}
            }
            />
              <Route path={`/:id`} component={
           
                (props) => 
                   < Element id = {props.match.params.id} /> 
                
            } />
            
        </div>
     </div>
    );
  }
}

export default connect( (store) => ({
  data: fromStore.getData(store),
  state: fromStore.getState(store),
}))(Content);
