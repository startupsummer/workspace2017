import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IssueDescription extends Component {
  static propTypes = {
    number: PropTypes.string, 
  }
  
  render() {
    const id = this.props.number.slice(1);
    const title = this.props.items
      .find(item => item.id === Number(id));
    return (
      <div>
        <h1 className="issues__item">{title.title}</h1>
        <p className="issues__description">{title.body}</p>
      </div>
    );
  }
}

export default IssueDescription;
