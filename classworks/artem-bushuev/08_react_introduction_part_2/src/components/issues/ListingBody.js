import React, { Component } from 'react';
import IssuesItem from './IssuesItem.js'

class ListingBody extends Component {
  render() {
    let {data} = this.props;
     return (
     <ul className="issues"> {
         data.records.map(
           item => 
               ( (item.state === this.props.currentState) && (!this.props.search 
               || item.title.toLowerCase().includes(this.props.search.toLowerCase()) ) )  
               && <IssuesItem item = {item}
                    updatePage = {this.props.updatePage}
                    currentState = {this.props.currentState}
                    data = {this.props.data}
                  />
          )
    }
    </ul>
    );
  }
}
export default ListingBody;