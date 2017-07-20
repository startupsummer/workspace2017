import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../../components/Button/Button'
import { switchState } from '../../../../resources/actions.js';
import PropTypes from 'prop-types';

class ButtonClose extends Component {
  render() {
    let text = '';
    this.props.issue.state === 'open'
      ? text = 'Close Issue'
      : text = 'Open Issue';
    return (
        <Button onClick={() => this.props.switchState(this.props.issue)} text={text} className='issue__close'/>
    )
  }
}
ButtonClose.propTypes = {
  switchState: PropTypes.func,
  issue: PropTypes.object
}

export default connect(null, {
  switchState
})(ButtonClose);
