import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './pagehead.css';

export default class Pagehead extends PureComponent {
  PropTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    return (
      <section className="pagehead">
        <div className="container">
          { this.props.children }
        </div>
      </section>
    );
  }
}
