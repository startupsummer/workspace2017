import React, { Component } from 'react';
import '../main.css';

class Button extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    className: React.PropTypes.string.isRequired,
    click: React.PropTypes.func.isRequired,
    issueId: React.PropTypes.number,
  }

  constructor(props){
    super(props);
  }

  render() {
    const {
      text,
      className,
      click,
      issueId,
    } = this.props;

    return (
      <button className={`btn ${this.props.className}`} type="button" onClick={this.props.click(this.props.issueId)}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;