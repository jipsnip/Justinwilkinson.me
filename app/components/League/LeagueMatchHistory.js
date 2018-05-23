import React, {Component} from 'react';
import MatchHistoryEntry from "./MatchHistoryEntry";

export default class LeagueMatchHistory extends Component {

    constructor(props){
        super(props);

        this.mapMatches = this.mapMatches.bind(this);
    }

    mapMatches(){
        var self = this;
        if(this.props.matchHistory.length !== 0) {
            return this.props.matchHistory.map(function (v, i) {
                return (
                    <div key={i}>
                        <MatchHistoryEntry match={v} entry={i} summoner={self.props.summoner} region={self.props.region}/>
                    </div>
                );
            });
        }
    }

    render(){
        return (
            <div>
                {this.mapMatches()}
            </div>
        )
    }
}