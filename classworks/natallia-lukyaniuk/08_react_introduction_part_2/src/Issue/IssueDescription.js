import React, { Component } from 'react';

class IssueDescription extends Component {
  constructor(props) {
    super(props);
    const {id, issues} = this.props;
    this.state = {
      id,
      issues,
      issue: issues.filter((item) => item.id == id),
    }
  }
  componentWillReceiveProps(nextProps) {
    const {id: prevId, issues} = this.props;
    const {id: nextId} = nextProps;
    if (prevId != nextId) {
      const newIssue = issues.filter((item) => item.id == nextId);
      this.setState({id: nextId, issue: newIssue});
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>{this.state.issue[0].description}</div>
    )
  }
}

export default IssueDescription;