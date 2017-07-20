import React, { Component } from 'react';
import data from '../../data.js';
import App from '../../App.js';
import SvgOpenPage from '../Svg/SvgOpenPage.js';
import SvgClosedPage from '../Svg/SvgClosedPage.js';
import '../../main.css';

function ButtonLink(props) {
  return (
    <button
      className={`btn-link ${props.className}`}
      type="button"
      onClick={props.onClick}
    >
      {
        props.svgClassName === 'open'
        ? <SvgOpenPage />
        : <SvgClosedPage />
      }
      {` ${props.count} ${props.text}`}
    </button>
  )
}

export default ButtonLink;
