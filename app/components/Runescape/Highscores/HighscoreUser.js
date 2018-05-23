import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/HighscoreRows.css';

export default class HighscoreUser extends Component{

    render(){
        return (
          <div className={styles.highscoreUser}>
              {this.props.user}
          </div>
        );
    }
}