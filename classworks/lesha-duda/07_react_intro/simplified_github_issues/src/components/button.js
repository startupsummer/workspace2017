import React, { Component } from 'react'

class MyButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <button onClick = {this.props.handler}>
        {this.props.number} {this.props.value}
      </button>
    )
  }
}

export default MyButton;
