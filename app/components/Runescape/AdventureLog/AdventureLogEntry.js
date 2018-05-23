import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/AdventureLog.css';

export default class AdventureLogEntry extends Component {

    render(){
        return (
            <div className={this.props.number % 2 === 0 ? styles.adventureLogEntry : styles.adventureLogEntryRight}>
                <div className={styles.adventureLogHeader}>
                    <div className={styles.adventureLogText}>
                        {this.props.value.text}
                    </div>
                    <div className={styles.adventureLogDate}>
                        {this.props.value.date}
                    </div>
                </div>
                <div className={styles.adventureLogBody}>
                    <div className={styles.adventureLogDetail}>
                        {this.props.value.details}
                    </div>
                </div>
            </div>
        );
    }
}