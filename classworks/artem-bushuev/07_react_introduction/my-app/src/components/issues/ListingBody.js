import React, { Component } from 'react';
import IssuesItem from './IssuesItem.js'

class ListingBody extends Component {
  render() {
    let data = [ ...this.props.data];
     return (
     <ul className="issues"> {
         data.map(
           item => 
               ( (item.state === this.props.currentState) && (!this.props.search 
               || item.title.toLowerCase().includes(this.props.search.toLowerCase()) ) )  
               && <IssuesItem item = {item}
                    updatePageData = {this.props.updatePageData}
                    currentState = {this.props.currentState}
                    data = {data}
                  />
          )
    }
    </ul>
    );
  }
}
export default ListingBody;