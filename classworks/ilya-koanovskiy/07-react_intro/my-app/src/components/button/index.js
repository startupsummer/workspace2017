import React, { Component } from 'react';

class Button extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <button className={this.props.class}  type="button" onClick={this.props.onClick}>{this.props.text}</button>
        )
    }
}

export default Button;