import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import styles from '../../Stylesheets/Twitch/TwitchSidePanel.css';
import TwitchUserInfo from "./TwitchUserInfo";
import TwitchSidePanelFollowed from "./TwitchSidePanelFollowed";

var TWITCH_CLIENT_ID = 'redacted';
var cookies = new Cookies();

export default class TwitchSidePanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            Oauth: cookies.get('TwitchOAUTH', {path: '/'}) || '',
            username: '',
            id: null,
            valid: false
        };

        this.checkOauthValidity = this.checkOauthValidity.bind(this);
        this.setId = this.setId.bind(this);
        this.state.Oauth !== '' ? this.checkOauthValidity() : null;
    }

    checkOauthValidity(){
        var self = this;
        axios.get('https://api.twitch.tv/kraken?client_id=' + TWITCH_CLIENT_ID, {
            headers: {
                Authorization: 'OAuth ' + this.state.Oauth
            }
        }).then((response) => {
            if(response.data.token.valid){
                self.setState({
                    valid: true,
                    username: response.data.token.user_name
                });
            }
            else{
                axios.post('/Twitch/Refresh?refresh_token=' + cookies.get('TwitchRefresh')).then((response) => {
                    if(Object.keys(JSON.parse(response.data.body)).includes('access_token')) {
                        var data = JSON.parse(response.data.body);
                        let d = new Date();
                        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
                        cookies.set('TwitchOAUTH', data.access_token, {path: '/', expires: d});
                        cookies.set('TwitchRefresh', data.refresh_token, {path: '/', expires: d});
                        axios.get('https://api.twitch.tv/kraken?client_id=' + TWITCH_CLIENT_ID, {
                            headers: {
                                Authorization: 'OAuth ' + this.state.Oauth
                            }
                        }).then((response) => {
                            if(response.data.token.valid){
                                self.setState({
                                    Oauth: data.access_token,
                                    valid: true,
                                    username: response.data.token.user_name
                                });
                            }
                            else{
                                self.setState({
                                    Oauth: '',
                                    valid: false,
                                    username: ''
                                });
                            }
                        }, (err) => {
                            console.log(err);
                        })
                    }
                    else{
                        self.setState({
                            Oauth: '',
                            valid: false,
                            username: ''
                        });
                    }
                }, (err) => {
                    console.log(err);
                });
            }
        }, (err) => {
            console.log(err);
        });
    }

    setId(id){
        this.setState({
            id: id
        });
    }

    render(){
        return (
            <div className={this.props.expanded ? styles.sidePanel : styles.minifiedSidePanel}>
                <div className={styles.sidePanelExpanderContainer} onClick={this.props.handleExpansion}>
                    <span className={this.props.expanded ? styles.sidePanelExpander : styles.minifiedSidePanelExpander}/>
                </div>
                <div className={styles.twitchLoginContainer}>
                    {this.state.Oauth === '' ? <button className={this.props.expanded ? styles.twitchLogin : styles.minimizedTwitchLogin}
                            onClick={ () => {
                                    location.href = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=' + TWITCH_CLIENT_ID + '&redirect_uri=http://www.justinwilkinson.me/Twitch/Authorization&scope=viewing_activity_read';
                                }
                            }>
                        <span className={['fa fa-twitch', styles.twitchLogo].join(' ')}/>
                        <span className={styles.buttonText}>
                            Login
                        </span>
                    </button> : null}
                </div>
                <div style={{position: 'relative'}}>
                    {this.state.valid && this.state.Oauth !== '' && this.state.username !== '' ? <TwitchUserInfo Oauth={this.state.Oauth} username={this.state.username}
                                                                                                                 expanded={this.props.expanded} setId={this.setId}/> : null}
                    {this.state.valid && this.state.Oauth !== '' && this.state.id !== null ? <TwitchSidePanelFollowed id={this.state.id} Oauth={this.state.Oauth}
                                                                                                                       expanded={this.props.expanded} handleClick={this.props.handleClick}/> : null}
                </div>
            </div>
        );
    }
}