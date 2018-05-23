import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/HighscoreRows.css';

export default class HighscoreUserMainDisplay extends Component {


    render(){
        return (
          <div className={styles.highscoreUserMainDisplay}>

              <div>
                  <img src={require('../../../images/Overall-Icon.png')}/>
                  <span>{this.props.overallLevel}</span>
              </div>
              <div>
                  <img src={require('../../../images/XP_Counter_icon.png')}/>
                  <span>{this.props.overallXp}</span>
              </div>
              <div>
                  <img src={require('../../../images/Wealth_evaluator_button.png')}/>
                  <span>{this.props.overallRank}</span>
              </div>

          </div>
        );
    }
}