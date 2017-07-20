import React, { Component } from 'react';
import Container from './pagehead/Container.js';
import RepoheadContainer from './pagehead/RepoheadContainer.js';
import ListingStates from './issues/ListingStates.js'
import ListingBody from './issues/ListingBody.js'
import Subnav from './issues/Subnav.js'
import data from '../data.js'

import { Route } from 'react-router-dom';
import Element from './Element.js'

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
  findById(data,id){ 
    for(let i = 0 ; i < data.length ; ++i){
      if(data[i].id === Number(id)){
        return data[i];
      }
    }
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
            { RepoheadContainer() }
            
            {Container(this.getCountOpen())}           
        </div >

        < div className = "container">
                        
            <Route exact path='/' render={
              ()=>{
                return Subnav(this.state.data,
                this.updatePageSearch,
                this.updatePageData,
                this.state.state,
            )}
            }
            /> 

            < Route exact path='/' component={
              ()=>{
                return ListingStates(this.state.data,
                  this.updatePageState,
                  this.getCountOpen(),
                  this.getCountClose(),
            )}
            }
            /> 

            <Route exact path='/' component={
              ()=>{
               return ListingBody(this.state.data,
                this.state.search,
                this.state.state,
                this.updatePageData,
            )}
            }
            />
              <Route path={`/:id`} component={
           
                (props) => {
                    return Element(this.state.data,
                      props.match.params.id,
                      this.findById,
                    );
                }   
            } />
            
        </div>
     </div>
    );
  }
}

export default Content;
