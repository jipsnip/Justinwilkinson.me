import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/HighscoreRows.css';

export default class HighscorePictureContainer extends Component{

    render(){
        return (
          <div className={styles.highscorePictureContainer}>
              <div className={styles.highscorePicture}>
                  <img src={'http://services.runescape.com/m=avatar-rs/a=13/' + this.props.user + '/chat.png'}/>
              </div>
          </div>
        );
    }

}