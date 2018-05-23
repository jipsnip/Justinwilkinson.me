import React, {Component} from 'react';
import styles from '../../Stylesheets/Twitch/TwitchFormatButtons.css';

export default class TwitchFormatButtons extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className={styles.buttonDiv}>
                <span className={styles.modeLabel}>
                    Mode:
                </span>
                <button className={styles.button} onClick={this.props.handleClick.bind(this, 'list')}>
                    <img src={require("../../images/Twitch/ListView.png")} className={this.props.view === 'list' ? styles.selectedImage : styles.buttonImage}/>
                </button>
                <button className={styles.button} onClick={this.props.handleClick.bind(this, 'grid')}>
                    <img src={require("../../images/Twitch/GridView.png")} className={this.props.view === 'grid' ? styles.selectedImage : styles.buttonImage}/>
                </button>
            </div>
        );
    }
}