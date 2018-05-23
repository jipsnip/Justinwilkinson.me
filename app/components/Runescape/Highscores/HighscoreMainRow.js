import React, {Component} from 'react';
import style from '../../../Stylesheets/Runescape/HighscoreRows.css';


export default class HighscoreMainRow extends Component{
    constructor(props){
        super(props);
    }

    render(){

        return(
            <div className={style.mainRowDiv}>
                <div className={style.mainRowSkill}>
                    Skill
                </div>
                <div className={style.mainRowLevel}>
                    Level
                </div>
                <div className={style.mainRowExp}>
                    Exp
                </div>
                <div className={style.mainRowRank}>
                    Rank
                </div>
                <div className={style.mainRowDailyGainz}>
                    DailyGainz
                </div>
                <div className={style.mainRowYesterdaysGainz}>
                    YesterdaysGainz
                </div>
                <div className={style.mainRowWeeklyGainz}>
                    WeeklyGainz
                </div>
            </div>
        );

    }
}