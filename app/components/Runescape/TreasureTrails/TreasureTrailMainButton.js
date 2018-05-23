import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/TreasureTrails.css';

export default class TreasureTrailMainButton extends Component{

    render(){
        return (
            <a href='/Treasure Trail'>
                <div className={styles.mainButton}>
                    <span style={{fontSize: '0.75rem'}}>◀</span> Back To Main
                </div>
            </a>
        );
    }

}