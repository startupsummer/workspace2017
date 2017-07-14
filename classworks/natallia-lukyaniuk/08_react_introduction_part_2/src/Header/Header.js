import React, { Component } from 'react';

class Header extends Component {
  shouldComponentUpdate(nextProps) {
    const {count: currentCount} = this.props;
    const {count: nextCount} = nextProps;
    console.log(currentCount, nextCount);
    return currentCount !== nextCount;
  }
  render() {
    const {count} = this.props;
    return (
      <div>
        <header className="header">
            <div className="container">
              <a className="header-logo" href="https://github.com/">
                <svg className="octicon" height="32" version="1.1" viewBox="0 0 16 16" width="32"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
              </a>
            </div>
          </header>
          <main className="content">
            <div className="pagehead">
              <div className="container repohead-container">
                <h1 className="pagehead-title">
                  <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 12 16" width="12">
                    <path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path>
                  </svg>
                  <a href="#">startupsummer</a>
                  <span>/</span>
                  <b><a href="#">react-task-1</a></b>
                </h1>
              </div>
              <div className="container">
                <nav className="reponav">
                  <a href="#" className="reponav-item selected">
                    <svg height="16" version="1.1" viewBox="0 0 14 16" width="14">
                      <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
                    </svg>
                    <span>Issues</span>
                    <span className="counter">{count}</span>
                  </a>
                </nav>
              </div>
            </div>
          </main>
      </div>
    )
  }
}

export default Header;