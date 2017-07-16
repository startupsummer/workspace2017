import React, { Component } from 'react';
import Container from './pagehead/Container.js';
import RepoheadContainer from './pagehead/RepoheadContainer.js';
import ListingStates from './issues/ListingStates.js'
import ListingBody from './issues/ListingBody.js'
import Subnav from './issues/Subnav.js'
import { Route } from 'react-router-dom';
import Element from './Element.js'

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
    
          <Route exact path='/' component={
            ()=>{
              return <Subnav data = {this.state.data}
                updatePage = {this.setState.bind(this)} 
                state = {this.state.state}
                />
              }
           }/>

            <Route exact path='/' component={
              ()=>{
                return <ListingStates  data = {this.props.data}
                    updatePage = {this.setState.bind(this)}
                    CountOpen = {this.state.data.getCountOpen()}
                    CountClose = {this.state.data.getCountClose()}       
                /> 
              }
            }
            /> 
            
            <Route exact path='/' component={
              () => {
                return <ListingBody data = {this.state.data}
                  search = {this.state.search}
                  updatePage = {this.setState.bind(this)}
                  currentState = {this.state.state}
                />
              } 
            }/>
            <Route path={`/:id`} component={
           
                (props) => {
                    return <Element status = {
                      {
                        data: this.props.data,
                        id: props.match.params.id,
                       }
                    }/>
                }   
            } />

        </div>
     </div>
    );
  }
}

export default Content;
