import React, {Component} from 'react';
import LeagueChampMastery from './LeagueChampMastery';
import styles from '../../Stylesheets/League/SummonerInfo.css';
import LeagueRanking from "./LeagueRanking";

export default class SummonerInfo extends Component {

    constructor(props){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props.summoner !== nextProps.summoner;
    }

    render(){
        return (
            <div className={styles.summonerInfoContainer}>
                <div style={{overflow: 'hidden', minWidth: '325px', position: 'sticky', top: '-5px'}}>
                    {/*{this.props.summoner ?
                        <div className={this.props.expanded ? styles.minimizeContainer : styles.minimizedContainer} onClick={this.props.handleExpansion}>
                            <span className={this.props.expanded ? styles.minimize : styles.minimized}/>
                        </div>
                        : null}*/}
                {this.props.summoner ? <div className={styles.summonerName}>
                    {this.props.summoner}
                </div>
                    : null}
                {this.props.iconId ? <div className={styles.imageDiv}><img src={'https://ddragon.leagueoflegends.com/cdn/8.2.1/img/profileicon/' + this.props.iconId + '.png'} className={styles.profileImage}/></div> : null}
                    {this.props.summoner  ? <LeagueChampMastery summonerId={this.props.id} region={this.props.region}/> : null}
                    {this.props.id  ? <LeagueRanking id={this.props.id} region={this.props.region}/> : null}
                </div>
            </div>
        );
    }
}