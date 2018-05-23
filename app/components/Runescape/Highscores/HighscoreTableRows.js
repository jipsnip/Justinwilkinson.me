import React, {Component} from 'react';
import HighscoreMainRow from './HighscoreMainRow';
import style from '../../../Stylesheets/Runescape/HighscoreRows.css';


export default class HighscoreTableRows extends Component{
    constructor(props){
        super(props);

        this.mapRows = this.mapRows.bind(this);
    }

    mapRows(){
        var ignore = ['daily_gainz', 'weekly_gainz', 'yesterdays_gainz', 'username', 'user_type'];
        var self = this;
        return Object.keys(this.props.stats).map(function(stat){
           if(ignore.indexOf(stat) === -1) {
                return (
                    <div className={style.rowContainer} key={stat}>
                        <div className={style.statRow}>
                            {stat}
                        </div>
                        <div className={style.levelRow}>
                            {self.props.stats[stat].level}
                        </div>
                        <div className={style.expRow}>
                            {self.props.stats[stat].exp}
                        </div>
                        <div className = {style.rankRow}>
                            {self.props.stats[stat].rank}
                        </div>
                        <div className={style.DailyGainzRow}>
                            {self.props.stats.daily_gainz[stat]["exp"] + ' ' + self.props.stats.daily_gainz[stat]["rank"]}
                        </div>
                        <div className={style.YesterdaysGainzRow}>
                            {self.props.stats.yesterdays_gainz[stat]["exp"] + ' ' + self.props.stats.yesterdays_gainz[stat]["rank"]}
                        </div>
                        <div className={style.WeeklyGainzRow}>
                            {self.props.stats.weekly_gainz[stat]["exp"] + ' ' + self.props.stats.weekly_gainz[stat]["rank"]}
                        </div>
                    </div>
                )
            }
            else {
                return null;
            }
        });
    }

    render(){
        return (
                <div className={style.highscoreContainer}>
                    <HighscoreMainRow/>
                    {this.mapRows()}
                </div>
        );
    }
}