import React, { Component } from 'react';
import Container from '../Container/Container';
import PageheadTitle from '../PageheadTitle/PageheadTitle';
import PageheadNav from '../PageheadNav/PageheadNav';
import './Pagehead.css';

class Pagehead extends Component {
  
  render() {
        return (
            <div className="pagehead">
                <Container repohead>
                    <PageheadTitle username="startupsummer" reponame="react-task-1"/>
                </Container>
                <Container>
                    <PageheadNav counter={ this.props.count }/>
                </Container>
            </div>
        );
    }
}

export default Pagehead;