import React, {Component} from 'react';
import Pages from '../../../config/Pages';
import styles from '../../Stylesheets/Navigation/NavBar.css';
import NavItem from './NavItem';
import LoginForm from "../General/LoginForm";
import SignupForm from "../General/SignupForm";
import MobileNavDropdown from './MobileNavDropdown';
import UserDropdown from '../General/UserDropdown';
import Cookies from 'universal-cookie';
import axios from 'axios';

var cookies = new Cookies();

export default class NavBar extends Component{

    constructor(props){
        super(props);

        this.state = {
            form: null,
            loggedIn: cookies.get('LoggedIn') || false,
            signedup: false,
            failedLogin: false,
            username: cookies.get('username') || '',
            stayLogged: false
        };

        if(cookies.get('StayLogged') === 'true'){
            let d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
            cookies.set('LoggedIn', true, {path: '/', expires: d});
            cookies.set('username', cookies.get('username'), {path: '/', expires: d});
        }

        this.mapPages = this.mapPages.bind(this);
        this.determineClass = this.determineClass.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.showSignup = this.showSignup.bind(this);
        this.disableForm = this.disableForm.bind(this);
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.changeLoginDuration = this.changeLoginDuration.bind(this);
        this.logout = this.logout.bind(this);
        this.determineLogo = this.determineLogo.bind(this);
    }

    disableForm(){
        this.setState({
            form: null,
            failedLogin: false,
            signedup: false
        });
    }

    changeLoginDuration(){
        this.setState({
            stayLogged: !this.state.stayLogged
        });
    }

    signup(username, password, email){
        var self = this;
        axios.post('/User/Signup?username=' + username + '&password=' + password + '&email=' + email)
            .then((results) => {
                self.setState({
                    signedup: true
                });
            }, (err) => {
                console.log(err);
            });
    }

    login(username, password){
        var self = this;
        axios.get('/User/Password?username=' + username + '&password=' + password)
            .then((results) => {
                if(results.data === true) {
                    this.disableForm();
                    self.setState({
                        loggedIn: 'true',
                        username: username
                    });
                    if(this.state.stayLogged) {
                        let d = new Date();
                        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
                        cookies.set('StayLogged', 'true', {path: '', expires: d});
                        cookies.set('LoggedIn', 'true', {path: '/', expires: d});
                        cookies.set('username', username, {path: '/', expires: d});
                    }
                    else{
                        let d = new Date();
                        d.setTime(d.getTime() + (60 * 60 * 1000));
                        cookies.set('LoggedIn', 'true', {path: '/', expires: d});
                        cookies.set('username', username, {path: '/', expires: d});
                    }
                }
                else{
                    self.setState({
                        failedLogin: true
                    });
                }
            }, (err) => {
                console.log(err);
            });
    }

    logout(){
        this.setState({
            loggedIn: false
        });

        cookies.set('username', null, {path: '/'});
        cookies.set('LoggedIn', null, {path: '/'});
        cookies.set('StayLogged', null, {path: '/'});
    }

    showLogin(){
        if(this.state.form !== null && this.state.form !== 'signup'){
            this.setState({
                form: null,
                failedLogin: false
            });
        }
        else{
            this.setState({
                form: 'login'
            });
        }
    }

    showSignup(){
        if(this.state.form !== null && this.state.form !== 'login'){
            this.setState({
                form: null,
                failedLogin: false
            });
        }
        else{
            this.setState({
                form: 'signup'
            });
        }
    }

    mapPages(pages){
        var self = this;
        return pages.pages.name.map(function(v, i){
            return (
                    <NavItem key={i} name={v} subpages={pages.pages.subpages[v] !== undefined} site={self.props.site}/>
            );
        });
    }

    determineLogo(){
        switch(this.props.site){
            case 'League':
                return require('../../images/Main/LeagueLogo.png');
            case 'Twitch':
                return require('../../images/Main/TwitchLogo.png');
            case 'Home':
                return require('../../images/Main/MainLogo.png');
            case 'Runescape':
                return require('../../images/Main/RunescapeLogo.png');
        }
    }

    determineClass(element){
            if (element === 'div') {
                switch (this.props.site) {
                    case 'League':
                        return styles.leagueNavBarContainer;
                    case 'Twitch':
                        return styles.twitchNavBarContainer;
                    case 'Activation':
                        return styles.activationNavBarContainer;
                    case 'Home':
                        return styles.homeNavBarContainer;
                    default:
                        return styles.navBarContainer;
                }
            }
            else if (element === 'nav') {
                switch (this.props.site) {
                    case 'League':
                        return styles.leagueNavBar;
                    case 'Twitch':
                        return styles.twitchNavBar;
                    case 'Activation':
                        return;
                    case 'Home':
                        return styles.homeNavBar;
                    default:
                        return styles.navBar;
                }
            }
            else if (element === 'loginList') {
                switch (this.props.site) {
                    case 'League':
                        return styles.leagueLoginList;
                    case 'Twitch':
                        return styles.twitchLoginList;
                    case 'Activation':
                        return;
                    case 'Home':
                        return styles.homeLoginList;
                    default:
                        return styles.loginList;
                }
            }
            else if (element === 'loginLabel') {
                switch (this.props.site) {
                    case 'League':
                        return styles.leagueLoginLabel;
                    case 'Twitch':
                        return styles.twitchLoginLabel;
                    case 'Activation':
                        return;
                    case 'Home':
                        return styles.homeLoginLabel;
                    default:
                        return styles.loginLabel;
                }
            }
            else if(element === 'logo'){
                switch(this.props.site){
                    case 'League':
                        return styles.leagueNavigationLogo;
                    case 'Twitch':
                        return styles.twitchNavigationLogo;
                    case 'Home':
                        return styles.homeNavigationLogo;
                    default:
                        return styles.navigationLogo;
                }
            }
            else {
                switch (this.props.site) {
                    case 'League':
                        return styles.leagueNavList;
                    case 'Twitch':
                        return styles.twitchNavList;
                    case 'Activation':
                        return;
                    case 'Home':
                        return styles.homeNavList;
                    default:
                        return styles.navList;
                }
            }
    }

    render(){
        return(
            <div className={this.determineClass('div')}>
                <a href="/">
                    <img src={this.determineLogo()} className={this.determineClass('logo')}/>
                </a>
                <nav className={this.determineClass('nav')}>
                    <ul className={this.determineClass('ul')}>
                        {this.mapPages(Pages)}
                    </ul>
                    <MobileNavDropdown pages={Pages} site={this.props.site}/>
                    {this.state.loggedIn !== 'true' ? <ul className={this.determineClass('loginList')}>
                        <li onClick={this.showLogin}><p className={this.determineClass('loginLabel')}>Login</p></li>
                        <li onClick={this.showSignup}><p className={this.determineClass('loginLabel')}>Signup</p></li>
                    </ul> : null}
                </nav>
                {this.state.form === 'login' ? <LoginForm removeForm={this.disableForm} showSignup={this.showSignup} login={this.login}
                                                          failedLogin={this.state.failedLogin} site={this.props.site} stayLogged={this.state.stayLogged}
                                                            handleClick={this.changeLoginDuration}/> : null}
                {this.state.form === 'signup' ? <SignupForm removeForm={this.disableForm} showLogin={this.showLogin} signup={this.signup} signedup={this.state.signedup}
                                                            site={this.props.site}/> : null}
                {this.state.loggedIn === 'true' ? <UserDropdown site={this.props.site} username={this.state.username} handleLogout={this.logout}/> : null}
            </div>
        )
    }
}