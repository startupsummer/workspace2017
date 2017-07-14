import React, { Component } from 'react';

class SwitchButton extends Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <button onClick={this.props.onClick} className="btn-link btn-link--selected" type="button">
        {this.props.children}
      </button>
    )
  }
}

export default SwitchButton;
