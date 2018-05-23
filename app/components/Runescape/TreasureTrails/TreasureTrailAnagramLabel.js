import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/TreasureTrails.css';

export default class TreasureTrailAnagramLabel extends Component {
    render(){
        return (
            <div className={styles.anagramLabel}>
                {this.props.label}
            </div>
        )
    }
}