import React, { Component } from 'react';
import PropTypes from 'prop-types';


import './index.css';

class AboutIssue extends Component {
  render() {
    const id = this.props.match.params.id;
    const element = this.props.issues.find(el => `id:${el.id}` === id);
    const title = element.title;
    const about = element.about;

    return (
      <div>
        <h1>{title}</h1>
        <p>{about}</p>
      </div>
    )
  }
}

AboutIssue.propTypes = {
  match: PropTypes.string.isRequired,
  issues: PropTypes.array.isRequired,
}

export default AboutIssue;
