import React, {Component} from 'react';
import HighscoreTableRows from './HighscoreTableRows';
import HighscoreUserInfoContainer from './HighscoreUserInfoContainer';
import style from '../../../Stylesheets/Runescape/HighscoreRows.css';

export default class HighscoreTableContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={style.infoContainer}>
                <HighscoreUserInfoContainer user={this.props.username} overallLevel={this.props.overallLevel}
                                            overallXp={this.props.overallXp} overallRank={this.props.overallRank}/>
                <HighscoreTableRows stats={this.props.stats}/>
            </div>
        )
    }
}