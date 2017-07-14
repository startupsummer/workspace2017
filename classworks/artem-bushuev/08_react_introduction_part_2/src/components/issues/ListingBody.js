import React, { Component } from 'react';
import IssuesItem from './IssuesItem.js'

class ListingBody extends Component {
  render() {
    let {data} = this.props.status;
     return (
     <ul className="issues"> {
         data.records.map(
           item => 
               ( (item.state === this.props.status.state) && (!this.props.status.search || item.title.toLowerCase().includes(this.props.status.search.toLowerCase()) ) )  
               && <IssuesItem element =  {
                 {
                    item: item,
                    update : this.props.status.updatePage
                 }
                } />
           )
    }
    </ul>
    );
  }
}
export default ListingBody;