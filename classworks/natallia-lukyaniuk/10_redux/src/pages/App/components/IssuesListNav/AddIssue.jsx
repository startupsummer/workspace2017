import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addIssue } from '../../../../resources/issuesList/issues.actions';

class AddIssue extends Component {
  handleAddIssue() {
    const id = Math.random().toString();
    const newIssue = {
      "title": id,
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    };
    this.props.addIssue(newIssue);
  }
  render() {
    return (
      <button onClick={this.handleAddIssue.bind(this)} className="btn btn-primary" type="button">
        New issue
      </button>
    );
  }
}

export default connect(null, {
  addIssue,
})(AddIssue);
