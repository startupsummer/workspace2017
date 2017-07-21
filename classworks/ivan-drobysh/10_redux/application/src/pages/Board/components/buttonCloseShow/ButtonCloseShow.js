import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { setStateShow } from '../../../../resources/actions';
import selectors from '../../../../index.selectors.js';
import { connect } from 'react-redux';

class ButtonCloseShow extends Component {
  onClick = () => {
    this.props.setStateShow('closed');
  }
  render() {
    let className = "btn-link ";
    if(this.props.stateShow === 'closed') className+= "btn-link--selected";
    return (
      <Link to='/'>
        <button onClick={this.onClick} className={className} type="button">
          <svg aria-hidden="true" className="octicon octicon-check" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
          {this.props.count} Close
        </button>
      </Link>
    )
  }
}

export default connect((state) => {
  return {
    stateShow: state.stateShow,
    count: selectors.getIssuesByStateShow(state, 'closed'),
  }
}, {
  setStateShow,
})(ButtonCloseShow);
