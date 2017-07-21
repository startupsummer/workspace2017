import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../../components/Button/Button'
import { newIssue } from '../../../../resources/actions.js';
import PropTypes from 'prop-types';

class ButtonNewIssue extends Component {

  render() {
    return (
        <Button onClick={() => this.props.newIssue()} text='New Issue' className='btn-primary'/>
    )
  }
}

ButtonNewIssue.propTypes = {
  newIssue: PropTypes.func,
};


export default connect(null, {
  newIssue
})(ButtonNewIssue);
