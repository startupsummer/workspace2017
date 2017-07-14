import React, { Component } from 'react';
import Container from './pagehead/Container.js';
import RepoheadContainer from './pagehead/RepoheadContainer.js';
import ListingStates from './issues/ListingStates.js'
import ListingBody from './issues/ListingBody.js'
import Subnav from './issues/Subnav.js'

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {state: "open"};
    this.changeStateOnClosed = () => { this.setState({state: 'closed'}); } 
    this.changeStateOnOpen = () => { 
      if(this.state.state === 'closed') { this.setState({state: 'open'});}
    }
    this.getState = () => {return this.state;}
    this.updatePage = () => {this.setState(this.getState())}
  }
  render() {
    let data = this.props.data;
    return (
     <div className = "content">
        <div className = "pagehead">
            <RepoheadContainer />
            <Container countOpen ={data.getCountOpen()} />
        </div>
        <div className = "container">
            <Subnav  status = {
              {
                records: this.props.data.records,
                updatePage : this.updatePage
              }
            } />
            <ListingStates  status = {
              {
                data: this.props.data,
                changeStateClosed : this.changeStateOnClosed,
                changeStateOpen : this.changeStateOnOpen
              }
            } />  
            
            <ListingBody status ={ 
              { 
                data: this.props.data,
                state : this.state.state,
                updatePage : this.updatePage
              }
            }/>
        </div>
     </div>
    );
  }
}

export default Content;
