import React, { Component } from 'react';
import Container from './pagehead/Container.js';
import RepoheadContainer from './pagehead/RepoheadContainer.js';
import ListingStates from './issues/ListingStates.js'
import ListingBody from './issues/ListingBody.js'
import Subnav from './issues/Subnav.js'
import data from '../data.js'

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "open",
      data,  
    };

  }
  getCountClose = () => {
    return this.state.data.length - this.getCountOpen();
  }
  getCountOpen = () => {
    let count = 0;
    for(let i of this.state.data){
      if(i.state === "open"){
        count++;
      }
    }
    return count;
  }
  updatePageSearch = (search)  => {
    this.setState({
      data: this.state.data,
      state: this.state.state,
      search,
    });
  }
  updatePageState = (state) => {
    this.setState({
      data: this.state.data,
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
    return (
     <div className = "content">
        <div className = "pagehead">
            <RepoheadContainer />
            <Container countOpen ={this.getCountOpen()} />
        </div>
        <div className = "container">
            <Subnav data = {this.state.data}
              updatePageSearch = {this.updatePageSearch} 
              updatePageData = {this.updatePageData}
              state = {this.state.state}
           />
            <ListingStates  data = {this.state.data}
                updatePageState = {this.updatePageState}
                CountOpen = {this.getCountOpen()}
                CountClose = {this.getCountClose()}       
             />  
            
            <ListingBody data = {this.state.data}
              search = {this.state.search}
              updatePageData = {this.updatePageData}
              currentState = {this.state.state}
             />
        </div>
     </div>
    );
  }
}

export default Content;
