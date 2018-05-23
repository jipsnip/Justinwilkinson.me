import React, {Component} from 'react';
import axios from 'axios';
import styles from '../../Stylesheets/League/LeagueMatchParticipant.css';
var assetRequire = require.context('../../images/League/', true, /\.(png|jpg)/);

export default class LeagueMatchParticipant extends Component {
    constructor(props){
        super(props);
        this.state = {
            rank: null
        };

        this.lookupRank = this.lookupRank.bind(this);
        this.mapRank = this.mapRank.bind(this);
        this.mapSeries = this.mapSeries.bind(this);
        this.lookupRank();
    }

    lookupRank(){
        var self = this;
        axios.get('/league/summoner/ranking?summoner=' + this.props.participant.summonerId + '&platform=' + this.props.region)
            .then(function(rankings){
                self.setState({
                    rank: rankings.data
                });
            });
    }

    mapSeries(miniSeries){
        var self = this;
        return miniSeries.progress.split('').map(function(v, i){
                if(v === 'W'){
                    return <img src={assetRequire('./Rank/Win.png')} key={i}/>;
                }
                else if(v === 'L'){
                    return <img src={assetRequire('./Rank/Loss.png')} key={i}/>;
                }
                else{
                    return <img src={assetRequire('./Rank/Unplayed.png')} key={i}/>;
                }
        });
    }

    mapRank(){
        var self = this;
        if(this.state.rank.length !== 0) {
            return this.state.rank.map(function (v, i) {
                if(v.queueType !== 'RANKED_SOLO_5x5'){
                    return null;
                }
                else{
                    return (
                        <div key={i} className={styles.rankDiv}>
                            <div className={styles.rankPlacement}>
                                <div className={styles.rankCategory}>
                                    {v.tier}
                                </div>
                                <div className={styles.rankLevel}>
                                    {v.rank}
                                </div>
                            </div>
                            <div className={styles.rankLeaguePoints}>
                                <div>{v.leaguePoints}<span className={styles.lp}> LP</span></div>
                                    {'miniSeries' in v ?
                                        <div className={styles.miniSeries}>
                                            <span>Series:</span>
                                            {self.mapSeries(v.miniSeries)}
                                        </div>
                                        : null}
                            </div>
                            <div className={styles.rankWinLoss}>
                                <span className={styles.win}>{v.wins}</span> / <span className={styles.loss}>{v.losses}</span>
                            </div>
                            <div className={styles.runes}>
                                Runes
                            </div>
                        </div>
                    );
                }
            });
        }
        else{
            return (
                <div className={styles.rankDiv}>
                    <div className={styles.rankPlacement}>
                        <div className={styles.rankCategory}>
                            Unranked
                        </div>
                        <div className={styles.rankLevel}>
                        </div>
                    </div>
                    <div className={styles.rankLeaguePoints}>
                        0<span className={styles.lp}> LP</span>
                    </div>
                    <div className={styles.rankWinLoss}>
                        <span className={styles.win}>0</span> / <span className={styles.loss}>0</span>
                    </div>
                    <div className={styles.runes}>
                        Runes
                    </div>
                </div>
            );
        }
    }

    render(){
        return (
            <div className={styles.playerContainer}>
                <img src={assetRequire('./ChampionImages/' + this.props.participant.championId + '.png')} className={styles.championImage}/>
                <div className={styles.summonerSpells}>
                    <img src={assetRequire('./SummonerSpells/' + this.props.participant.spell1Id + '.png')} className={styles.summonerSpell}/>
                    <img src={assetRequire('./SummonerSpells/' + this.props.participant.spell2Id + '.png')} className={styles.summonerSpell}/>
                </div>
                <div className={this.props.participant.summonerName === this.props.summoner ? styles.mainSummonerName : styles.summonerName}>
                    {this.props.participant.summonerName}
                </div>
                {this.state.rank !== null ?
                    <div className={styles.rankContainer}>
                        {this.mapRank()}
                    </div>
                    : null}
            </div>
        );
    }
}
