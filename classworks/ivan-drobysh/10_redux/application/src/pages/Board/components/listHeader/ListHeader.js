import React, { Component } from 'react';
import ButtonAllShow from '../buttonAllShow/ButtonAllShow';
import CloseShow from '../buttonCloseShow/ButtonCloseShow';
import OpenShow from '../buttonOpenShow/ButtonOpenShow';

class ListHeader extends Component {
  render() {
    return (
      <div className="issues-listing__header">
        <div className="issues-listing__states">

          <ButtonAllShow />
          <OpenShow />
          <CloseShow />

        </div>
      </div>
    )
  }
}

export default ListHeader;
