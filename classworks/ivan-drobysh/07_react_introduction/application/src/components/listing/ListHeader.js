import React, { Component } from 'react';
import AllShow from './AllShow';
import CloseShow from './CloseShow';
import OpenShow from './OpenShow';

class ListHeader extends Component {
  render() {
    return (
      <div className="issues-listing__header">
        <div className="issues-listing__states">
          <AllShow state={this.props.state} show={this.props.show('all')}/>

          <OpenShow state={this.props.state} open={this.props.count.open} show={this.props.show('open')}/>

          <CloseShow state={this.props.state} close={this.props.count.close} show={this.props.show('closed')}/>
        </div>
      </div>
    )
  }
}

export default ListHeader;
