import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { issuesSelector } from '../resources/issue/issue.selectors';

class IssueDiscription extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  }

  render() {
    let discription;
    const id = this.props.match.params.id;
    this.props.data.forEach(it => {
      it.id === Number(id) ? discription = it.title : null;
    });
    return (
      <div className="discription">
        <div className="discription__title"> DISCRIPTION </div>
        {discription}
      </div>
    );
  }
}

export default connect((state, props) => ({
  data: issuesSelector(state),
}))(IssueDiscription);
