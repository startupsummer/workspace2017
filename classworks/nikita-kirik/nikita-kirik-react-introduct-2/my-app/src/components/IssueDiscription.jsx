import React, { Component } from 'react';

class IssueDiscription extends Component {
  render() {
    console.log(this.props.match);
    return(
      <div className="discription">
        <div className="discription__title"> DISCRIPTION </div>
        {this.props.match.params.id}
      </div>
    );
  }
}

export default IssueDiscription;
