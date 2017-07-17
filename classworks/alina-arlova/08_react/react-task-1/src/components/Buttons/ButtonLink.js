import React, { Component } from 'react';
import data from '../../data.js';
import App from '../../App.js';
import SvgOpenPage from '../SvgOpenPage.js';
import SvgClosedPage from '../SvgClosedPage.js';
import '../../main.css';

class ButtonLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className={`btn-link ${this.props.className}`}
        type="button"
        onClick={this.props.onClick}
      >
        {
          this.props.svgClassName === 'open'
          ? <SvgOpenPage />
          : <SvgClosedPage />
        }
        {` ${this.props.count} ${this.props.text}`}
      </button>
    )
  }
}

export default ButtonLink;
