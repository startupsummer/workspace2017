import React, { Component } from 'react';
import Counter from '../../../../components/Counter/Counter';

class PageHead extends Component{
  render() {
    return (
      <div className="pagehead">
        <div className="container repohead-container">
          <h1 className="pagehead-title">
            <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 12 16" width="12">
              <path d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path>
            </svg>
            <a>Ivanko</a>
            <span>/</span>
            <b><a>google</a></b>
          </h1>
        </div>
        <div className="container">
          <nav className="reponav">
            <Counter/>
          </nav>
        </div>
      </div>
    )
  }
}

export default PageHead;
