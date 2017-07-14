import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IssueDescription extends Component {
  static propTypes = {
    number: PropTypes.string, 
  }
  
  render() {
    const id = this.props.number.slice(1);
    const title = this.props.items
      .find(item => item.id === Number(id)).title;
    return (
      <div>
        <h1 className="issues__item">{title}</h1>
        <p className="issues__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
           Harum architecto odit maiores in voluptatibus minus ipsam
            non necessitatibus sapiente, iste sunt modi cum voluptate,
               assumenda mollitia dolorum illo veritatis dolore!</p>
      </div>
    );
  }
}

export default IssueDescription;
