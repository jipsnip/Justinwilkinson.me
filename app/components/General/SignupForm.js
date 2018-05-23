import React, {Component} from 'react';
import styles from '../../Stylesheets/General/SignupForm.css';
import axios from 'axios';

export default class SignupForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            usernameAvailable: null,
            password: '',
            passwordStrength: '',
            confirmed: '',
            matching: null,
            email: '',
            emailValidity: null,
            valid: true,
            registered: false
        };

        this.determineClass = this.determineClass.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPasswordValidity = this.checkPasswordValidity.bind(this);
        this.checkMatchingPasswords = this.checkMatchingPasswords.bind(this);
        this.checkUsernameAvailability = this.checkUsernameAvailability.bind(this);
        this.signupUser = this.signupUser.bind(this);
    }

    determineClass(field){
        if(field === 'header'){
            switch(this.props.site){
                case 'League': return styles.leagueSignupHeader;
                case 'Twitch': return styles.twitchSignupHeader;
                default: return styles.signupHeader;
            }
        }
        else if(field === 'submit'){
            switch(this.props.site){
                case 'League': return styles.leagueSubmitButton;
                case 'Twitch': return styles.twitchSubmitButton;
                default: return styles.submitButton;
            }
        }
        else if(field === 'password'){
            switch(this.state.passwordStrength){
                case 'Strong': return styles.strongPass;
                case 'Medium': return styles.mediumPass;
                case 'Poor': return styles.poorPass;
            }
        }
        else if(field === 'label'){
            switch(this.state.passwordStrength){
                case 'Strong': return styles.strong;
                case 'Medium': return styles.medium;
                case 'Poor': return styles.poor;
            }
        }
        else if(field === 'input'){
            switch(this.state.matching){
                case false: return styles.invalidInput;
                case true: return styles.validInput;
            }
        }
        else if(field === 'email'){
            switch(this.state.emailValidity){
                case false: return styles.invalidInput;
                case true: return styles.validInput;
            }
        }
        else if(field === 'username'){
            switch(this.state.usernameAvailable){
                case false: return styles.invalidInput;
                case true: return styles.validInput;
            }
        }
        else if(field === 'activation'){
            switch(this.props.site){
                case 'League': return styles.leagueActivationMessage;
                case 'Twitch': return styles.twitchActivationMessage;
                default: return styles.activationMessage;
            }
        }
        else{
            switch(this.props.site){
                case 'League': return styles.leagueCancelButton;
                case 'Twitch': return styles.twitchCancelButton;
                default: return styles.cancelButton;
            }
        }
    }

    handleChange(field, e){
        if(field === 'username') {
            this.setState({
                username: e.target.value
            });
            this.checkUsernameAvailability(e.target.value);
        }
        else if(field === 'password'){
            this.setState({
                password: e.target.value
            });
            this.checkPasswordValidity(e.target.value);
        }
        else if(field === 'confirm'){
            this.setState({
                confirmed: e.target.value
            });
            this.checkMatchingPasswords(e.target.value);
        }
        else{
            this.setState({
                email: e.target.value
            });
            this.checkEmail(e.target.value);
        }
    }

    checkMatchingPasswords(confirmed){
        return new Promise((resolve, reject) => {
            if (confirmed === '') {
                this.setState({
                    matching: null
                }, () => {
                    resolve();
                });
            }
            else if (confirmed !== this.state.password) {
                this.setState({
                    matching: false
                }, () => {
                    resolve();
                });
            }
            else {
                this.setState({
                    matching: true
                }, () => {
                    resolve();
                });
            }
        });
    }

    checkPasswordValidity(password){
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
            if (password === '') {
                this.setState({
                    passwordStrength: ''
                });
                return;
            }
            if (strongRegex.test(password)) {
                this.setState({
                    passwordStrength: 'Strong'
                });
            }
            else if (mediumRegex.test(password)) {
                this.setState({
                    passwordStrength: 'Medium'
                });
            }
            else {
                this.setState({
                    passwordStrength: 'Poor'
                });
            }
    }

    checkEmail(email){
        var emailRegex = new RegExp(".*@.*[\.].+");
        return new Promise((resolve, reject) => {
            if (email === '') {
                this.setState({
                    emailValidity: null
                }, () => {
                    resolve();
                });
            }
            else if (emailRegex.test(email)) {
                this.setState({
                    emailValidity: true
                }, () => {
                    resolve();
                });
            }
            else {
                this.setState({
                    emailValidity: false
                }, () => {
                    resolve();
                });
            }
        });
    }

    checkUsernameAvailability(username){
        var self = this;
        return new Promise((resolve, reject) => {
            if (username === '') {
                self.setState({
                    usernameAvailable: null
                }, () => {
                    resolve();
                });
            }
            else {
                axios.get('/User/Status?username=' + username)
                    .then((results) => {
                        if (results.data.length === 0) {
                            self.setState({
                                usernameAvailable: true
                            }, () => {
                                resolve();
                            });
                        }
                        else if (results.data.length === 1) {
                            self.setState({
                                usernameAvailable: false
                            }, () => {
                                resolve();
                            });
                        }
                    }, (err) => {
                        console.log(err);
                    });
            }
        });
    }

    signupUser() {
        this.checkUsernameAvailability(this.state.username).then(() => {
            this.checkEmail(this.state.email).then(() => {
                this.checkMatchingPasswords(this.state.confirmed).then(() => {
                    if (this.state.matching && this.state.emailValidity && this.state.usernameAvailable) {
                        this.props.signup(this.state.username, this.state.password, this.state.email);
                    }
                });
            });
        });
    }


    render(){
        return (
            <div className={styles.signupDiv}>
                <div className={this.determineClass('header')}>
                    <i className={styles.closeButton} onClick={this.props.removeForm}>
                        &#128473;
                    </i>
                </div>
                {!this.props.signedup ?
                <div className={styles.mainSignupDiv}>
                    <div className={styles.signupEntryDiv}>
                        <label>
                            Username
                        </label>
                        <input type="text" spellCheck={false} value={this.state.username} className={this.determineClass('username')} onChange={this.handleChange.bind(this, 'username')}/>
                        {this.state.usernameAvailable === false ? <div style={{color: 'red', paddingTop: '3px', fontSize: '.9rem'}}>Username Not Available</div> : null}
                    </div>
                    <div className={styles.signupEntryDiv}>
                        <label>
                            Password
                        </label>
                        <input type="text" spellCheck="false" value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
                        {this.state.passwordStrength !== '' ?
                        <div>
                            <label style={{display: 'inline-block', fontSize: '.8rem', fontWeight: 'normal', paddingTop: '7px'}}>Strength: </label>
                            <div className={styles.passwordStrengthDiv}>
                                <span className={this.determineClass('password')}/>
                            </div>
                            <span className={this.determineClass('label')}>{this.state.passwordStrength}</span>
                        </div> : null}
                    </div>
                    <div className={styles.signupEntryDiv}>
                        <label>
                            Confirm Password
                        </label>
                        <input type="password"  spellCheck={false} value={this.state.confirmed} className={this.determineClass('input')} onChange={this.handleChange.bind(this, 'confirm')}/>
                        {this.state.matching === false ? <div style={{color: 'red', paddingTop: '3px', fontSize: '.9rem'}}>Passwords Do Not Match</div> : null}
                    </div>
                    <div className={styles.signupEntryDiv}>
                        <label>
                            Email
                        </label>
                        <input type="text" spellCheck={false} value={this.state.email} className={this.determineClass('email')} onChange={this.handleChange.bind(this, 'email')}/>
                        {this.state.emailValidity === false ? <div style={{color: 'red', paddingTop: '3px', fontSize: '.9rem'}}>Invalid Email</div> : null}

                    </div>
                </div> : null}
                {!this.props.signedup ? <div><div className={styles.recommendationDiv}>
                    Already have an account? <i onClick={this.props.showLogin}>Login</i>
                </div>
                <div className={styles.buttonDiv}>
                    <button className={this.determineClass('submit')} onClick={this.signupUser}>Signup</button>
                    <button className={this.determineClass('cancel')} onClick={this.props.removeForm}>Cancel</button>
                </div></div> : null}
                    {this.props.signedup ?
                    <div className={this.determineClass('activation')}>
                        An activation link has been sent to {this.state.email}.
                    </div>
                    : null}
            </div>
        );
    }
}