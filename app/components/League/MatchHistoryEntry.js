import React, {Component} from 'react';
import axios from 'axios';
import styles from '../../Stylesheets/League/MatchHistoryEntry.css';
var assetRequire = require.context('../../images/League/', true, /\.(png|jpg|gif)/);

export default class MatchHistoryEntry extends Component {

    constructor(props){
        super(props);
        this.state = {
            userItems: [],
            spells: [],
            runes: [],
            players: [],
            kills: null,
            deaths: null,
            assists: null,
            gameTime: null,
            queueId: null,
            gameCreated: null,
            win: null,
            dataVersion: null,
            loading: true
        };

        this.requireImage = this.requireImage.bind(this);
        this.lookupGameInfo = this.lookupGameInfo.bind(this);
        this.mapItems = this.mapItems.bind(this);
        this.mapPlayers = this.mapPlayers.bind(this);
        this.lookupGameInfo(500);
    }

    requireImage(url){
        return assetRequire(url);
    }

    lookupGameInfo(timeout){
        var self = this;
        setTimeout(() => {
            axios.get('/league/match/info?matchId=' + this.props.match.gameId + '&platform=' + this.props.region)
            .then(function (game) {
                if('status' in game.data){
                    self.lookupGameInfo(8000);
                }
                else{
                var createDate = new Date(0);
                createDate.setMilliseconds(parseInt(game.data.gameCreation));
                createDate = createDate.toISOString();
                createDate = createDate.split('T')[0];

                var participantId = null;
                game.data.participantIdentities.forEach(function(v, i){
                    if(v.player.summonerName === self.props.summoner){
                        participantId = v.participantId;
                    }
                });

                var userData = game.data.participants[participantId - 1];

                var win = userData.stats.win;
                var spells = [userData.spell1Id, userData.spell2Id];

                var items = [];
                for(let i = 0; i < 7; i++){
                        items.push(userData.stats['item' + i]);
                }

                var players = [];
                    for(let i = 0; i < game.data.participants.length; i++){
                        players[i] = {};
                        players[i].summoner = game.data.participantIdentities[i].player.summonerName;
                        players[i].champion = game.data.participants[i].championId;
                        players[i].rank = game.data.participants[i].highestAchievedSeasonTier;
                    }

                var dataVersion = game.data.gameVersion.split('.');
                dataVersion = dataVersion[0] + '.' + dataVersion[1] + '.' + '1';
                var queueId = game.data.queueId;
                var kills = userData.stats.kills;
                var deaths = userData.stats.deaths;
                var assists = userData.stats.assists;
                var champLevel = userData.stats.champLevel;
                var gameTime = Math.floor(parseInt(game.data.gameDuration)/60) + ':' + (parseInt(game.data.gameDuration) % 60 < 10 ?
                    '0' + (parseInt(game.data.gameDuration) % 60) : (parseInt(game.data.gameDuration) % 60));

                var runes = [];
                for(let i = 0; i < 6; i++){
                    runes.push(userData.stats['perk' + i])
                }

                self.setState({
                    userItems: items,
                    spells: spells,
                    players: players,
                    win: win,
                    kills: kills,
                    deaths: deaths,
                    assists: assists,
                    champLevel: champLevel,
                    runes: runes,
                    gameCreated: createDate,
                    gameTime: gameTime,
                    queueId: queueId,
                    dataVersion: dataVersion,
                    loading: false
                });
            }
            });
        }, timeout);
    }

    mapItems(){
        var self = this;
        return this.state.userItems.map(function(v, i){
           if(self.state.userItems[i] === 0){
                return <img src={assetRequire('./Items/NoItem.png')} key={i} className={i === 6 ? styles.lastImage : styles.itemImage}/>;
            }
            else{
                    return <img src={'https://ddragon.leagueoflegends.com/cdn/' + self.state.dataVersion + '/img/item/' + self.state.userItems[i] + '.png'} key={i} className={i === 6 ? styles.lastImage : styles.itemImage}/>
            }
        });
    }

    mapPlayers(index){
        var self = this;
        return this.state.players.map(function(v, i){
            if ((index === 5 && i < self.state.players.length/2) || (index === 10 && i >= self.state.players.length/2)){
            return (
                <div className={styles.playerContainer} key={i}>
                    <img src={self.requireImage('./ChampionImages/' + v.champion + '.png')} className={styles.playerChampion}/>
                    <span className={self.props.summoner === v.summoner ? styles.mainPlayerName : styles.playerName}>{v.summoner}</span>
                </div>
            );
            }
            else{
                return null;
            }
        });
    }

    render(){
        return (
            <div className={styles.matchDiv}>
                {this.state.win !== null ? <div className={this.state.win === true ? styles.winEntry : styles.lossEntry}/> : null}
                <div className={this.props.entry === 0 ? styles.firstMatchInfo : styles.matchInfo}>
                    <img src={this.requireImage('./ChampionImages/' + this.props.match.champion + '.png')} className={styles.matchChamp}/>
                    {this.state.loading ? <img src={this.requireImage('./LoadingSpinner.gif')} className={styles.loadingImage}/> : null}
                    {this.state.win !== null ? <div className={styles.summonerSpellsContainer}>
                        <img src={this.requireImage('./SummonerSpells/' + this.state.spells[0] + '.png')} className={styles.summonerSpell}/>
                            <img src={this.requireImage('./SummonerSpells/' + this.state.spells[1] + '.png')} className={styles.summonerSpell}/>
                    </div>
                        : null}
                    {this.state.queueId !== null ?
                        <div className={styles.mapContainer}>
                            <div>
                                {queues[this.state.queueId][0]}
                            </div>
                            <div className={styles.gameType}>
                                {queues[this.state.queueId][1]}
                            </div>
                        </div>
                        : null}
                    {this.state.userItems.length !== 0 ?
                        <div className={styles.itemContainer}>
                            <div className={styles.itemDiv}>
                                {this.mapItems()}
                            </div>
                        </div>
                        : null}
                    {this.state.kills !== null ?
                        <div className={styles.statDiv}>
                            <span className={styles.statCategory}><span className={styles.kills}>
                                    {this.state.kills}
                                </span>/<span className={styles.deaths}>
                                    {this.state.deaths}
                                </span>/<span className={styles.assists}>
                                    {this.state.assists}
                                </span>
                            </span>
                            <span className={styles.statCategory}>KDA: <span>{((this.state.kills + this.state.assists) / (this.state.deaths === 0 ? 1 : this.state.deaths)).toFixed(2)}</span></span>
                            <span className={styles.statCategory}>KD: <span>{(this.state.kills/(this.state.deaths === 0 ? 1 : this.state.deaths)).toFixed(2)}</span></span>
                        </div>
                        : null}
                    {this.state.players.length !== 0 ?
                        <div className={this.state.players.length === 6 ? styles.trioPlayersContainer : styles.playersContainer}>
                            <div className={this.state.players.length === 6 ? styles.trioBlueTeam : styles.blueTeam}>
                                {this.mapPlayers(5)}
                            </div>
                            <div className={this.state.players.length === 6 ? styles.trioRedTeam : styles.redTeam}>
                                {this.mapPlayers(10)}
                            </div>
                        </div>
                        : null}
                    {this.state.gameCreated !== null ?
                        <div className={styles.dateDiv}>
                            <span>{this.state.gameTime}</span>
                            <span className={styles.gameDate}>{this.state.gameCreated}</span>
                        </div>
                        : null}
                    {/*{this.state.runes.length !== 0 ?
                        <div className={styles.runesDiv}>
                            <span>Runes</span>
                        </div>
                        : null}*/}
                </div>
            </div>
        );
    }
}

const queues = {
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