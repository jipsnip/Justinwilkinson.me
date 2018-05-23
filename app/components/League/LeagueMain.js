import React, {Component} from 'react';
import LeagueSubNav from './LeagueSubNav';
import styles from '../../Stylesheets/Main/League.css';
import LeagueWrapper from './LeagueWrapper';
import LeagueTextInput from "./LeagueTextInput";
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class LeagueMain extends Component {

    constructor(props){
        super(props);
        this.state = {
            summoner: cookies.get('prefSummoner', {path: '/'}) || '',
            summonerName: null,
            summonerId: null,
            accountId: null,
            iconId: null,
            error: null,
            selected: 'Match History',
            expanded: true,
            region: 'NA',
            recommendations: []
        };

        this.handleRecommended = this.handleRecommended.bind(this);
        this.textChange = this.textChange.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
        this.categoryClicked = this.categoryClicked.bind(this);
        this.handleExpansion = this.handleExpansion.bind(this);
        this.regionClicked = this.regionClicked.bind(this);
        this.enterKey = this.enterKey.bind(this);
        this.removeOption = this.removeOption.bind(this);
    }

    componentWillMount(){
        document.body.className = styles.leagueComponent;
        document.title = 'LoL';
        var self = this;
        if(cookies.get('summoners') !== undefined) {
            var termArray = [];
            cookies.get('summoners').forEach(function(term){
                if(term.toLowerCase().indexOf(self.state.summoner) >= 0 || self.state.summoner === ''){
                    termArray.push(term);
                }
            });
            this.setState({
                recommendations: termArray
            });
        }

    }

    removeOption(e, input){
        let d = new Date();
        d.setTime(d.getTime() + (365*24*60*60*1000));
        var cook = cookies.get('summoners', {path: '/'});
        cook.splice(cookies.get('summoners', {path: '/'}).indexOf(e), 1);
        cookies.set('summoners', cook, {path: '/', expires: d});
        this.setState({
            recommendations: cook
        });
    }

    handleRecommended(e, input, target){
        if(!(target.target.src) && target.target.nodeName !== 'SPAN') {
            this.setState({
                summoner: e,
                recommendations: [e]
            });
            input.focus();
        }
    }

    textChange(e){
        var self = this;
        var termArray = [];
        if(cookies.get('summoners') !== undefined) {
            cookies.get('summoners').forEach(function(term){
                if(term.toLowerCase().substr(0, e.target.value.length) === e.target.value.toLowerCase()){
                    termArray.push(term);
                }
            });
        }
        this.setState({
            summoner: e.target.value,
            recommendations: termArray
        });
    }

    enterKey(e){
        if(e.key === 'Enter'){
            this.buttonClicked();
        }
    }

    buttonClicked(){
        var self = this;
        axios.get('/league/summoner/id?summoner=' + this.state.summoner + '&platform=' + this.state.region)
            .then(function(summoner){
               if(!('status' in summoner.data)) {
                   if(cookies.get('summoners') === undefined){
                        let d = new Date();
                        d.setTime(d.getTime() + (365*24*60*60*1000));
                        var arr = [summoner.data.name];
                        cookies.set('summoners', arr, {path: '/', expires: d});
                   }
                   else if(cookies.get('summoners').join(',').toLowerCase().split(',').indexOf(self.state.summoner.toLowerCase()) < 0) {
                       let d = new Date();
                       d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
                       var cook = cookies.get('summoners');
                       cook.push(summoner.data.name);
                       cookies.set('summoners', cook, {path: '/', expires: d});
                   }
                        self.textChange({target: {value: summoner.data.name}});
                       self.setState({
                           summonerName: summoner.data.name,
                           summonerId: summoner.data.id,
                           accountId: summoner.data.accountId,
                           iconId: summoner.data.profileIconId,
                           error: null
                       });
               }
               else if(summoner.data.status.status_code === 404){
                   self.setState({
                      error: 'Summoner not found.'
                   });
               }
               else{
                   self.setState({
                       error: 'API Key is out of date.'
                   });
               }
        });
    }

    categoryClicked(e){
        if(e.target.name !== this.state.selected) {
            this.setState({
                selected: e.target.name
            });
        }
    }

    handleExpansion(){
        this.setState({
            expanded: !this.state.expanded
        });
    }

    regionClicked(e){
        this.setState({
            region: e
        });
    }

    render(){
        return(
            <div>
                <LeagueTextInput summoner={this.state.summoner} textChange={this.textChange} buttonClicked={this.buttonClicked} recommendations={this.state.recommendations}
                                  error={this.state.error} regionClicked={this.regionClicked} region={this.state.region} enterKey={this.enterKey} removeOption={this.removeOption}
                                  handleRecommended={this.handleRecommended}/>
                <LeagueSubNav selected={this.state.selected} categoryClicked={this.categoryClicked} expanded={this.state.expanded}/>
                <LeagueWrapper summoner={this.state.summonerName} iconId={this.state.iconId} id={this.state.summonerId}
                               selected={this.state.selected} accountId={this.state.accountId} expanded={this.state.expanded}
                                handleExpansion={this.handleExpansion} region={this.state.region}/>
            </div>
        )
    }
}