import React, { Component } from 'react';

class NewIssue extends Component {
  render() {
    return (
      <div className="issues-listing__subnav">
        <button onClick={this.props.onClick} className="btn btn-primary" type="button">
          New issue
        </button>
      </div>
    )
  }
}

export default NewIssue;
