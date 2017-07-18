import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../../components/Button/Button'
import { newIssue } from '../../../../resources/actions.js';

class ButtonNewIssue extends Component {

  render() {
    return (
        <Button onClick={() => this.props.newIssue()} text='New Issue' className='btn-primary'/>
    )
  }
}

export default connect(null, {
  newIssue
})(ButtonNewIssue);
