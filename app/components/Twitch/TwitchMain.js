import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import TwitchSidePanel from './TwitchSidePanel';
import TwitchMainPanel from './TwitchMainPanel';
import styles from '../../Stylesheets/Twitch/TwitchMain.css';

var cookies = new Cookies();

export default class TwitchMain extends Component {

    constructor(props){
        super(props);
        this.state = {
            expanded: true,
            twitchId: cookies.get('PreferredTwitchUser', {path: '/'}) || '',
            user: '',
            recommendations: []
        };

        this.handleExpansion = this.handleExpansion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLookup = this.handleLookup.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUserClick = this.handleUserClick.bind(this);
        this.handleFollowedClick = this.handleFollowedClick.bind(this);
    }

    componentWillMount(){
        document.title = 'Twitch';
        var self = this;
        if(cookies.get('TwitchUser') !== undefined) {
            var termArray = [];
            cookies.get('TwitchUser').forEach(function(term){
                if(term.toLowerCase().indexOf(self.state.twitchId) >= 0 || self.state.twitchId === ''){
                    termArray.push(term);
                }
            });
            this.setState({
                recommendations: termArray
            });
        }
    }

    handleExpansion(){
        this.setState({
            expanded: !this.state.expanded
        });
    }

    handleRemove(e, input){
        let d = new Date();
        d.setTime(d.getTime() + (365*24*60*60*1000));
        var cook = cookies.get('TwitchUser', {path: '/'});
        cook.splice(cookies.get('TwitchUser', {path: '/'}).indexOf(e), 1);
        cookies.set('TwitchUser', cook, {path: '/', expires: d});
        if(cookies.get('PreferredTwitchUser', {path: '/'}).toLowerCase() === e.toLowerCase()){
            cookies.set('PreferredTwitchUser', '', {path: '/', expires: d});
        }
        this.setState({
            recommendations: cook
        });
        input.focus();
    }

    handleUserClick(e, input, target){
        if(!(target.target.src) && target.target.nodeName !== 'SPAN') {
            this.setState({
                twitchId: e,
                recommendations: [e]
            });
            input.focus();
        }
    }

    handleFollowedClick(e){
        this.setState({
            twitchId: e,
            recommendations: [e]
        });
    }

    handleLookup(){
        if(cookies.get('TwitchUser', {path: '/'}) !== undefined) {
            if (!cookies.get('TwitchUser', {path: '/'}).includes(this.state.twitchId)) {
                if (cookies.get('TwitchUser', {path: '/'}) === 'undefined' || cookies.get('TwitchUser', {path: '/'}) === undefined) {
                    let d = new Date();
                    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
                    cookies.set('TwitchUser', [this.state.twitchId], {path: '/', expires: d});
                }
                else {
                    let d = new Date();
                    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
                    cookies.set('TwitchUser', cookies.get('TwitchUser', {path: '/'}).concat([this.state.twitchId]), {
                        path: '/',
                        expires: d
                    });
                }
                this.handleChange({target: {value: this.state.twitchId}});
            }
        }
        else{
            let d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
            cookies.set('TwitchUser', [this.state.twitchId], {path: '/', expires: d});
        }
        this.setState({
            user: this.state.twitchId
        });
    }

    handleChange(e){
        var self = this;
        var termArray = [];
        if(cookies.get('TwitchUser') !== undefined) {
            cookies.get('TwitchUser').forEach(function(term){
                if(term.toLowerCase().substr(0, e.target.value.length) === e.target.value.toLowerCase()){
                    termArray.push(term);
                }
            });
        }
        this.setState({
            twitchId: e.target.value,
            recommendations: termArray
        });
    }

    render(){
        return (
            <div className={styles.twitchMain}>
                <TwitchSidePanel expanded={this.state.expanded} handleExpansion={this.handleExpansion} handleClick={this.handleFollowedClick}/>
                <TwitchMainPanel expanded={this.state.expanded} handleChange={this.handleChange} handleLookup={this.handleLookup}
                                  twitchId={this.state.twitchId} handleRemove={this.handleRemove} handleUserClick={this.handleUserClick} recommendations={this.state.recommendations}
                                  user={this.state.user}/>
            </div>
        );
    }
}