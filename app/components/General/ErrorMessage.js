import React, {Component} from 'react';
import styles from '../../Stylesheets/General/ErrorMessage.css';

export default class ErrorMessage extends Component {
    render(){
        return (
            <div className={this.props.skillIcons ? styles.redErrorMessage : styles.yellowErrorMessage}>
                <span>{this.props.error}</span>
            </div>
        );
    }
}