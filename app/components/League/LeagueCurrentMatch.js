import React, {Component} from 'react';
var assetRequire = require.context('../../images/League/', true, /\.(png|jpg)/);
import styles from '../../Stylesheets/League/LeagueCurrentMatch.css';
import LeagueMatchParticipant from "./LeagueMatchParticipant";

export default class LeagueCurrentMatch extends Component{
    constructor(props){
        super(props);

        this.mapParticipants = this.mapParticipants.bind(this);
        this.determineTime = this.determineTime.bind(this);
        this.mapBans = this.mapBans.bind(this);
    }

    mapParticipants(index){
        var self = this;
        return this.props.match.participants.map(function(v, i){
            if(index === 5 && i < self.props.match.participants.length/2) {
                return <LeagueMatchParticipant key={i} participant={v} summoner={self.props.summoner} region={self.props.region}/>
            }
            else if(index === 10 && i >= self.props.match.participants.length/2){
                return <LeagueMatchParticipant key={i} participant={v} summoner={self.props.summoner} region={self.props.region}/>
            }
        });
    }

    mapBans(team){
        var self = this;
        return this.props.match.bannedChampions.map(function(v, i){
            if(v.teamId === team){
                return <img src={assetRequire('./ChampionImages/' + v.championId + '.png')} key={i} className={styles.banImage}/>
            }
            else{
                return null;
            }
        });
    }

    determineTime(){
        var minutes = Math.floor(this.props.match.gameLength/60)
        var seconds = this.props.match.gameLength % 60;
        if(seconds < 10){
            seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
    }

    render(){
        if(this.props.error !== null){
            return (
                <div className={styles.errorMessage}>
                    {this.props.error}
                </div>
            );
        }
        else if(this.props.match.length !== 0) {
            return (
                <div>
                    <div className={styles.currentMatchContainer}>
                        <div className={styles.matchHeader}>
                            <div className={styles.matchType}>
                                {'gameQueueConfigId' in this.props.match ?
                                    queues[this.props.match.gameQueueConfigId][0] + ' - ' + queues[this.props.match.gameQueueConfigId][1]
                                :
                                    queues[0][1]}
                            </div>
                            <div className={styles.matchTime}>
                                {this.determineTime()}
                            </div>
                        </div>
                        <div className={styles.blueTeam}>
                        </div>
                        <div className={styles.playersContainer}>
                            {this.props.match.length !== 0 ? this.mapParticipants(5) : null}
                        </div>
                    </div>
                    <div className={styles.currentMatchContainer}>
                        <div className={styles.matchHeader}>
                            {this.props.match.bannedChampions.length !== 0 ?
                                <div className={styles.blueTeamBans}>
                                    <img src={assetRequire('./Roles/BlueTeam.png')} className={styles.blueTeamLogo}/>
                                    {this.mapBans(100)}
                                </div>
                                : null}
                            {this.props.match.bannedChampions.length !== 0 ?
                                <div className={styles.bansLabel}>
                                    BANS
                                </div>
                                : null}
                            {this.props.match.bannedChampions.length !== 0 ?
                                <div className={styles.redTeamBans}>
                                    {this.mapBans(200)}
                                    <img src={assetRequire('./Roles/RedTeam.png')} className={styles.redTeamLogo}/>
                                </div>
                                : null}
                        </div>
                        <div className={styles.redTeam}>
                        </div>
                        <div className={styles.playersContainer}>
                            {this.props.match.length !== 0 ? this.mapParticipants(10) : null}
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return null;
        }
    }
}

const queues = {
    0: ['Summoner\'s Rift', 'Custom Game'],
    70:	['Summoner\'s Rift', 'One for All'],
    72:	['Howling Abyss' ,'1v1 Snowdown Showdown'],
    73:	['Howling Abyss' ,'2v2 Snowdown Showdown'],
    75:	['Summoner\'s Rift', '6v6 Hexakill'],
    76:	['Summoner\'s Rift', 'Ultra Rapid Fire'],
    78:	['Howling Abyss', 'One For All: Mirror Mode'],
    83:	['Summoner\'s Rift', 'Co-op vs AI Ultra Rapid Fire'],
    98:	['Twisted Treeline', '6v6 Hexakill'],
    100: ['Butcher\'s Bridge', '5v5 ARAM'],
    310: ['Summoner\'s Rift', 'Nemesis games'],
    313: ['Summoner\'s Rift', 'Black Market Brawlers'],
    317: ['Crystal Scar', 'Definitely Not Dominion'],
    325: ['Summoner\'s Rift', 'All Random'],
    400: ['Summoner\'s Rift', '5v5 Draft Pick'],
    420: ['Summoner\'s Rift', '5v5 Ranked Solo'],
    430: ['Summoner\'s Rift', '5v5 Blind Pick'],
    440: ['Summoner\'s Rift', '5v5 Ranked Flex'],
    450: ['Howling Abyss 5v5', 'ARAM'],
    460: ['Twisted Treeline', '3v3 Blind Pick'],
    470: ['Twisted Treeline', '3v3 Ranked Flex'],
    600: ['Summoner\'s Rift', 'Blood Hunt Assassin'],
    610: ['Cosmic Ruins', 'Dark Star: Singularity'],
    800: ['Twisted Treeline', 'Co-op vs. AI Intermediate Bot'],
    810: ['Twisted Treeline', 'Co-op vs. AI Intro Bot'],
    820: ['Twisted Treeline', 'Co-op vs. AI Beginner Bot'],
    830: ['Summoner\'s Rift', 'Co-op vs. AI Intro Bot'],
    840: ['Summoner\'s Rift', 'Co-op vs. AI Beginner Bot'],
    850: ['Summoner\'s Rift', 'Co-op vs. AI Intermediate Bot'],
    900: ['Summoner\'s Rift', 'ARURF'],
    910: ['Crystal Scar', 'Ascension'],
    920: ['Howling Abyss', 'Legend of the Poro King'],
    940: ['Summoner\'s Rift', 'Nexus Siege'],
    950: ['Summoner\'s Rift', 'Doom Bots Voting'],
    960: ['Summoner\'s Rift', 'Doom Bots Standard'],
    980: ['Valoran City Park', 'Star Guardian Invasion: Normal'],
    990: ['Valoran City Park', 'Star Guardian Invasion: Onslaught'],
    1000: ['Overcharge', 'PROJECT: Hunters'],
    1010: ['Summoner\'s Rift', 'Snow ARURF']
};