import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromStore from 'index.selectors';
import { cardAdd } from 'resources/cards/cards.actions';
import { listRemove } from 'resources/lists/lists.actions';
import Card from './Card';
import Button from 'components/Button';
import './list.styles';


class List extends React.Component {
  static propsTypes = {
    cardAdd: PropTypes.func.isRequired,
    listRemove: PropTypes.func.isRequired,
    fetchCards: PropTypes.func.isRequired,

    cards: PropTypes.object.isRequired,
  }

  onCardAdd = () => {
    this.props.cardAdd(this.props.list.id);
  }

  onListRemove = () => {
    this.props.listRemove(this.props.list.id);
  }

  render() {
    const cards = this.props.cards
      .map(card => <Card key={card.id} card={card} />);

    return (
      <div className="list">
        <div>
          {this.props.list.title}
          {cards}
        </div>

        <div>
          <Button onClick={this.onCardAdd} title="Add Card" />
          <Button onClick={this.onListRemove} title="Remove List" />
        </div>
      </div>
    );
  }
}

export default connect((state, props) => ({
  cards: fromStore.getCardsByListId(state, props.list.id),
}), {
  cardAdd,
  listRemove,
})(List);
