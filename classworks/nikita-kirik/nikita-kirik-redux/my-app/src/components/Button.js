import React, { Component } from 'react';

class Button extends Component {
  static propTypes = {
    onIssueAdd: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <button onClick={this.props.onIssueAdd} className="btn btn-primary" type="button">
        {this.props.children}
      </button>
    )
  }
}

export default Button;
