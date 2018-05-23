import React, {Component} from 'react';
import styles from '../../Stylesheets/League/LeagueWrapper.css';
import SummonerInfo from "./SummonerInfo";
import LeagueMainContent from "./LeagueMainContent";

export default class LeagueWrapper extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={styles.leagueWrapper}>
                <SummonerInfo summoner={this.props.summoner} iconId={this.props.iconId} id={this.props.id} region={this.props.region}/>
                <LeagueMainContent selected={this.props.selected} accountId={this.props.accountId} id={this.props.id} summoner={this.props.summoner}
                                    region={this.props.region}/>
            </div>
        );
    }
}