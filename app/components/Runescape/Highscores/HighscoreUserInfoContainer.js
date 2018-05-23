import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/HighscoreRows.css';
import HighscorePictureContainer from "./HighscorePictureContainer";
import HighscoreUser from './HighscoreUser';
import HighscoreUserMainDisplay from './HighscoreUserMainDisplay';

export default class HighscoreUserInfoContainer extends Component{

    render(){
        return (
            <div className={styles.userInfoContainer}>
                <HighscoreUser user={this.props.user}/>
                <HighscorePictureContainer user={this.props.user}/>
                <HighscoreUserMainDisplay overallLevel={this.props.overallLevel} overallRank={this.props.overallRank} overallXp={this.props.overallXp}/>
            </div>
        );
    }
}