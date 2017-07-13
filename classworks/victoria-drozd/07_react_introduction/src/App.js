import React, { Component } from 'react';
import './App.css';

class Pagehead extends Component {
  render() {
    return (
      <div className="pagehead">
        <div className="container">
          <nav className="reponav">
            <a className="reponav-item selected" href="#">
              <svg height={16} version="1.1" viewBox="0 0 14 16" width={14}>
                <path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
              </svg>
              <span>Issues</span>
              <span className="counter">5</span>
            </a>
          </nav>
        </div>
      </div>
    );
  }
}

class Search extends Component {
  render() {
    return (
      <form className="subnav__search">
        <input className="subnav__search-input" type="text" placeholder="Search" />
        <svg className="subnav__search-icon" height={16} version="1.1" viewBox="0 0 16 16" width={16}>
          <path fill-rule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path>
        </svg>
      </form>
    );
  }
}

class Btn extends Component {
  render() {
    let svg;
    if (this.props.image === 'open') {
      svg =
        <svg className="octicon octicon-issue-opened" aria-hidden="true" height={16} version="1.1" viewBox="0 0 14 16" width={14}>
          <path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
        </svg>;
    } else if (this.props.image === 'closed') {
      svg =
        <svg className="octicon octicon-check" aria-hidden="true" height={16} version="1.1" viewBox="0 0 12 16" width={12}>
          <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path>
        </svg>;
    }

    return (
      <button className={this.props.classes} type="button">
        {svg}
        {this.props.text}
      </button>
    );
  }
}

class Subnav extends Component {
  render() {
    return (
      <div className="issues-listing__subnav">
        <div className="subnav">
          <Search />
          <Btn classes="btn btn-primary" text="New issue" />
        </div>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="issues-listing__header">
        <div className="issues-listing__states">
          <Btn classes="btn-link btn-link--selected" text="4 Open" image="open" />
          <Btn classes="btn-link" text="1 Closed" image="closed" />
        </div>
      </div>
    );
  }
}

class Item extends Component {
  render() {
    return (
      <li className="issues__item">
        <div className="issues__status issues__status--open">
          <svg className="issues__icon" height={16} version="1.1" viewBox="0 0 14 16" width={14}>
            <path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
          </svg>
        </div>
        <div className="issues__title">
          <a className="issues__link" href="#">
            {this.props.title}
          </a>
        </div>
        <Btn classes="btn issue__close" text="Close issue" />
      </li>
    );
  }
}

class Body extends Component {
  render() {
    let items = [];
    this.props.data.forEach((item) => {
      if (item.state === 'open')
      items.push(<Item title={item.title} key={item.id}/>);
    });

    return (
      <div className="issues-listing__body">
        <ul className="issues">
          {items}
        </ul>
      </div>
    );
  }
}

class Container extends Component {
  render() {
    return (
      <div className="container">
        <div className="issues-listing">
          <Subnav />
          <Header />
          <Body data={this.props.data}/>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
    <div>
      <Pagehead />
      <Container data={this.props.data}/>
    </div>
    );
  }
}

export default App;
