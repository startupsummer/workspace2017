import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromStore from 'index.selectors';
import { listAdd, fetchLists } from 'resources/lists/lists.actions';
import { fetchCards } from 'resources/cards/cards.actions';
import List from './components/List';
import Button from 'components/Button';
import './board.styles';


class Board extends React.Component {
  static propsTypes = {
    onListAdd: PropTypes.func.isRequired,
    fetchLists: PropTypes.func.isRequired,
    fetchCards: PropTypes.func.isRequired,

    lists: PropTypes.array.isRequired,
  }

  componentDidMount = () => {
    this.props.fetchLists();
    this.props.fetchCards();
  }

  render() {
    const lists = this.props.lists
      .map(list => <List key={list.id} list={list} />);

    return (
      <div className="board">
        <div className="board__lists">
          {lists}
        </div>

        <Button small onClick={this.props.onListAdd} title="Add List" />
      </div>
    );
  }
}

export default connect(state => ({
  lists: fromStore.getLists(state),
}), {
  onListAdd: listAdd,
  fetchLists,
  fetchCards,
})(Board);
