import React, { Component } from 'react';
import { connect } from 'react-redux';

class IssueDescription extends Component {
  // constructor(props) {
  //   super(props);
  //   const {id, issues} = this.props;
  //   this.state = {
  //     id,
  //     issues,
  //     issue: issues.filter((item) => item.id == id),
  //   };
  // }
  // componentWillReceiveProps(nextProps) {
  //   const {id: prevId, issues} = this.props;
  //   const {id: nextId} = nextProps;
  //   if (prevId != nextId) {
  //     const newIssue = issues.filter((item) => item.id == nextId);
  //     this.setState({id: nextId, issue: newIssue});
  //   }
  // }
  render() {
    return (
      <div>{this.state.issue[0].body}</div>
    );
  }
}


export default connect(state => ({
  issues: state.issues,
}), {})(IssueDescription);
