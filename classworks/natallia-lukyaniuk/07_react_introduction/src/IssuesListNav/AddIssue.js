import React, { Component } from 'react';

class AddIssue extends Component {
  render() {
    const {handleNewIssue} = this.props;
    return (
      <button onClick={handleNewIssue} className="btn btn-primary" type="button">
        New issue
      </button>
    )
  }
}

export default AddIssue;