import React, {Component} from 'react';
import styles from '../../Stylesheets/General/Button.css';

export default class LookupButton extends Component{
    constructor(props){
        super(props);
    }

    determineClass(){
        switch(this.props.site){
            case 'Runescape': return styles.runescapeButton;
            default: return styles.genericButton;
        }
    }

    render(){
        return <button className={this.determineClass()} onClick={this.props.onClick}>{this.props.label}</button>
    }
}


