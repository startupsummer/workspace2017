import React, { Component } from 'react';
import Container from './pagehead/Container.js';
import RepoheadContainer from './pagehead/RepoheadContainer.js';
import ListingStates from './issues/ListingStates.js';
import ListingBody from './issues/ListingBody.js';
import Subnav from './issues/Subnav.js';

import { Route } from 'react-router-dom';
import Element from './Element.js'
//import browserHistory from 'browser-history';

//var Router = require('react-router').Router
//var Route = require('react-router').Route

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "open"
    };
    this.changeStateOnClosed = () => { this.setState({state: 'closed'}); } 
    this.changeStateOnOpen = () => { 
      if(this.state.state === 'closed') { this.setState({state: 'open'});}
    }
    this.getState = () => {return this.state;}
    this.updateStateContent = (newState) => {this.setState(newState)}
    //this.num = 123;
  }
  render() {
    let data = this.props.data;
    return (
     <div className = "content">
        <div className = "pagehead">
         
         <RepoheadContainer/>
         <Container countOpen ={data.getCountOpen()} />
         </div>
         <div className = "container">
          <Route exact path="/" component={() => { 
            return  <Subnav  status = {
                {
                  records: this.props.data.records,
                  updatePage : this.updateStateContent
                }
              } />
          }}/>  
          <Route exact path="/" component={() => {
             return <ListingStates  status = {
                {
                  data: this.props.data,
                  changeStateClosed : this.changeStateOnClosed,
                  changeStateOpen : this.changeStateOnOpen
                }
              } />  
          }}/>
          <Route exact path="/" component={() => {
           // console.log(this.num);
            return <ListingBody status ={ 
                { 
                  search: this.state.search,
                  data: this.props.data,
                  state : this.state.state,
                  updatePage : this.updateStateContent
                }
              }/>
          }} />  
           
          <Route path={`/:id`} component={
          
          (props) => {
            //console.log(props.match.params.id);
            return <Element status = {
              {
                data: this.props.data,
                id: props.match.params.id,
              }
             }/>
            }
          }/>
       

          </div>
     </div>
    );
  }
}

export default Content;
