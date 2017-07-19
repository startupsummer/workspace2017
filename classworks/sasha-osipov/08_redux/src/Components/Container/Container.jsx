import React, { Component } from 'react';
import cx from 'classnames';
import './Container.css';

class Container extends Component {
 
    render() {
        const containerStyles = cx({
            "container": true,
            "repohead-container": this.props.repohead,
        });

        return (
            <div className={ containerStyles }>
                { this.props.children }
            </div>
        );
    }
} 

export default Container;