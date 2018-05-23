import React, {Component} from 'react';
import axios from 'axios';
import styles from '../../Stylesheets/League/LeagueMainContent.css';
import LeagueMatchHistory from "./LeagueMatchHistory";
import LeagueCurrentMatch from "./LeagueCurrentMatch";

export default class LeagueMainContent extends Component{

    constructor(props){
        super(props);
        this.state = {
            matchHistory: [],
            currentMatch: [],
            error: null
        };

        this.lookupMatchHistory = this.lookupMatchHistory.bind(this);
        this.lookupCurrentMatch = this.lookupCurrentMatch.bind(this);
        {this.props.accountId && this.props.selected === 'Match History' ? this.lookupMatchHistory() : null}
        {this.props.accountId && this.props.selected === 'Current Match' ? this.lookupCurrentMatch() : null}
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.selected !== this.props.selected){
            if(nextProps.selected === 'Match History' && this.state.matchHistory.length === 0 && this.props.accountId){
                this.lookupMatchHistory();
            }
            else if(nextProps.selected === 'Current Match' && this.state.currentMatch.length === 0 && this.props.accountId){
                this.lookupCurrentMatch();
            }
        }
        else if(nextProps.summoner !== this.props.summoner){
            this.setState({
                matchHistory: [],
                currentMatch: [],
                error: null
            }, () => {
                nextProps.selected === 'Match History' ? this.lookupMatchHistory() : this.lookupCurrentMatch();
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;/*nextProps.selected !== this.props.selected ||
            nextProps.accountId !== this.props.accountId ||
            nextState.matchHistory !== this.state.matchHistory ||
            nextState.currentMatch !== this.state.currentMatch ||
            nextState.error !== this.state.error;*/
    }

    lookupMatchHistory(){
        var self = this;
        axios.get('/league/summoner/matches/history?id=' + this.props.accountId + '&beginIndex=0&platform=' + this.props.region)
            .then(function(matches){
                self.setState({
                    matchHistory: self.state.matchHistory.concat(matches.data.matches)
                });
            });
    }

    lookupCurrentMatch(){
        var self = this;
        axios.get('/league/match/current/id?summoner=' + this.props.id + '&platform=' + this.props.region)
            .then(function(match){
                if('status' in match.data){
                    self.setState({
                        error: 'That user is currently not in an active game.'
                    });
                }
                else{
                    self.setState({
                        currentMatch: match.data
                    });
                }
            });
    }

    render(){
        return (
            <div className={this.props.expanded ? styles.mainContentDiv : styles.expandedMainContentDiv}>
                <div style={this.props.selected === 'Match History' ? {display: 'block'} : {display: 'none'}}>
                    <LeagueMatchHistory matchHistory={this.state.matchHistory} summoner={this.props.summoner} region={this.props.region}/>
                </div>
                <div style={this.props.selected === 'Current Match' ? {display: 'block', padding: '50px 0'} : {display: 'none'}}>
                    <LeagueCurrentMatch match={this.state.currentMatch} summoner={this.props.summoner} id={this.props.id} error={this.state.error}
                                        region={this.props.region}/>
                </div>
            </div>
        );
    }
}