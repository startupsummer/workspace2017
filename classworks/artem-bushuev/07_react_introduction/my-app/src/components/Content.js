import React, { Component } from 'react';
import Container from './pagehead/Container.js';
import RepoheadContainer from './pagehead/RepoheadContainer.js';
import ListingStates from './issues/ListingStates.js'
import ListingBody from './issues/ListingBody.js'
import Subnav from './issues/Subnav.js'

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "open",
      data: this.props.data  
    };

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
            <Subnav data = {this.state.data}
              updatePage = {this.setState.bind(this)} 
              state = {this.state.state}
           />
            <ListingStates  data = {this.props.data}
                updatePage = {this.setState.bind(this)}
                CountOpen = {this.state.data.getCountOpen()}
                CountClose = {this.state.data.getCountClose()}       
             />  
            
            <ListingBody data = {this.state.data}
              search = {this.state.search}
              updatePage = {this.setState.bind(this)}
              currentState = {this.state.state}
             />
        </div>
     </div>
    );
  }
}

export default Content;
