import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { cardRemove } from 'resources/cards/cards.actions';
import Button from 'components/Button';
import './card.styles';


class Card extends React.Component {
  static propsTypes = {
    cardRemove: PropTypes.func.isRequired,

    card: PropTypes.object.isRequired,
  }

  onCardRemove = () => {
    this.props.cardRemove(this.props.card.id);
  }

  render() {
    return (
      <div className="card">
        {this.props.card.title}

        <Button onClick={this.onCardRemove} title="Remove Card" />
      </div>
    );
  }
}

export default connect(null, {
  cardRemove,
})(Card);
