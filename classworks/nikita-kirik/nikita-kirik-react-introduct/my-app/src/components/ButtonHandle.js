import React, { Component } from 'react';

class ButtonHandle extends Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <button onClick={this.props.onClick} className="btn issue__close" type="button">
      {this.props.children}
      </button>
  )
  }
}

export default ButtonHandle;
