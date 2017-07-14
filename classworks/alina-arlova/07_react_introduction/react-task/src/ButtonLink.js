import React, { Component } from 'react';
import data from './data.js';
import App from './App.js';
import './main.css';

class ButtonLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: data,
      menuState : "open"
    };

    this.hangleClick = this.hangleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <button onClick = {this.press} className={'btn-link' + this.props.className} type="button" onClick={this.onClick} >
        <svg aria-hidden="true" className={"octicon " + this.props.svgClassName}  height="16" version="1.1" viewBox="0 0 14 16" width="14">
          <path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
        </svg>
          {' ' + this.props.count + ' ' + this.props.text}
      </button>
    )
  }
}

export default ButtonLink;
