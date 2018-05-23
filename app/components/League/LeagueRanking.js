import React, {Component} from 'react';
import styles from '../../Stylesheets/League/LeagueRanking.css';
import axios from 'axios';
var assetRequire = require.context('../../images/League/', true, /\.(png|jpg)/);

export default class LeagueRanking extends Component {

    constructor(props){
        super(props);
        this.state = {
            rankings: []
        };

        this.lookupRanking = this.lookupRanking.bind(this);
        this.mapRankings = this.mapRankings.bind(this);
        this.populateRankings = this.populateRankings.bind(this);
        this.mapSeries = this.mapSeries.bind(this);
        this.lookupRanking(this.props.id, this.props.region);
    }

    lookupRanking(id, platform) {
        var self = this;
        axios.get('/league/summoner/ranking?summoner=' + id + '&platform=' + platform)
            .then(function(rankings){
                self.setState({
                    rankings: rankings.data
                }, () => {
                    self.mapRankings();
                });
            });
    }

    componentWillReceiveProps(nextProps){
        this.props.id !== nextProps.id ? this.lookupRanking(nextProps.id, nextProps.region) : null;
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props.id !== nextProps.id || this.state.rankings !== nextState.rankings;
    }

    requireImage(rank){
        switch(rank){
            case 'UNRANKED': return assetRequire('./Rank/UnrankedBadge.png');
            case 'BRONZE': return assetRequire('./Rank/BronzeBadgeSeason2.png');
            case 'SILVER': return assetRequire('./Rank/SilverBadgeSeason2.png');
            case 'GOLD': return assetRequire('./Rank/GoldBadgeSeason2.png');
            case 'PLATINUM': return assetRequire('./Rank/PlatinumBadgeSeason2.png');
            case 'DIAMOND': return assetRequire('./Rank/DiamondBadge.png');
            case 'MASTER': return assetRequire('./Rank/MasterBadge.png');
            case 'CHALLENGER': return assetRequire('./Rank/ChallengerBadge.png');
        }
    }

    mapRankings(){
        var self = this;
        var userRanks = [];
        for(var i = 0; i < this.state.rankings.length; i++){
            userRanks.push(this.state.rankings[i].queueType);
        }
        if(userRanks.length !== 2){
            if(userRanks.length === 0){
                self.setState({
                    rankings: [{tier: 'UNRANKED', queueType: 'RANKED_SOLO_5x5'}, {tier: 'UNRANKED', queueType: 'RANKED_FLEX_5x5'}]
                });
            }
            else if(userRanks[0].queueType === 'RANKED_SOLO_5x5'){
                self.setState({
                    rankings: self.state.rankings.concat([{tier: 'UNRANKED', queueType: 'RANKED_SOLO_5x5'}])
                });
            }
            else{
                self.setState({
                    rankings: self.state.rankings.concat([{tier: 'UNRANKED', queueType: 'RANKED_FLEX_5x5'}])
                });
            }
        }
    }

    mapSeries(rank){
        var returnObj = [];
        if(rank.miniSeries){
            var games = rank.miniSeries.target === 2 ? 3 : 5;
            var currentWins = 0;
            var currentLoss = 0;
            for(let i = 0; i < games; i++) {
                if(rank.miniSeries.wins > currentWins){
                    returnObj.push('Win');
                    currentWins++;
                }
                else if(rank.miniSeries.losses > currentLoss){
                    returnObj.push('Loss');
                    currentLoss++;
                }
                else{
                    returnObj.push('Unplayed');
                }
            }
            return returnObj.map(function(v, i){
                if(v === 'Win'){
                    return <img src={assetRequire('./Rank/Win.png')} key={i}/>;
                }
                else if(v === 'Loss'){
                    return <img src={assetRequire('./Rank/Loss.png')} key={i}/>;
                }
                else{
                    return <img src={assetRequire('./Rank/Unplayed.png')} key={i}/>;
                }
            });
        }
    }

    populateRankings(){
        var self = this;
        return this.state.rankings.map(function(v, i){
            return (
                <div key={i} className={styles.rankDiv}>
                    <span className={styles.leagueQueue}>{v.queueType === 'RANKED_SOLO_5x5' ? 'SOLO' : 'FLEX'}</span>
                    <img src={self.requireImage(v.tier)} className={styles.rankImage}/>
                    <span className={styles.winLoss}>
                        <span className={styles.win}>{v.wins ? v.wins : '0'}</span>
                        <span className={styles.seperator}>/</span>
                        <span className={styles.loss}>{v.losses ? v.losses : '0'}</span>
                    </span>
                    <div style={{position: 'relative'}}>
                        <span className={styles.leaguePoints}>
                            {v.leaguePoints ? v.leaguePoints : '0'}
                            <span className={styles.leaguePointsLabel}>
                                LP
                            </span>
                        </span>
                        <div className={styles.miniSeriesDiv}>
                            <span className={styles.miniSeriesLabel}>
                                {v.miniSeries ? 'Series:' : null}
                            </span>
                            <span className={styles.miniSeriesImages}>
                                {self.mapSeries(v)}
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render(){
        return (
            <div>
                <span className={styles.seasonLabel}>Season 8</span>
                <div>
                    <div className={styles.mainRow}>
                        <span className={styles.queue}>
                            Queue
                        </span>
                        <span className={styles.rank}>
                            Rank
                        </span>
                        <span className={styles.wl}>
                            W/L
                        </span>
                        <span>
                            League Points
                        </span>
                    </div>
                    {this.state.rankings.length !== 0 ? this.populateRankings() : null}
                </div>
            </div>
        );
    }
}