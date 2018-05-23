import React, {Component} from 'react';
import styles from '../../Stylesheets/General/LoginForm.css';

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.determineClass = this.determineClass.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    determineClass(field){
        if(field === 'header'){
            switch(this.props.site){
                case 'League': return styles.leagueLoginHeader;
                case 'Twitch': return styles.twitchLoginHeader;
                default: return styles.loginHeader;
            }
        }
        else if(field === 'submit'){
            switch(this.props.site){
                case 'League': return styles.leagueSubmitButton;
                case 'Twitch': return styles.twitchSubmitButton;
                default: return styles.submitButton;
            }
        }
        else if(field === 'input'){
            switch(this.props.site){
                case 'League': return styles.leagueInput;
                case 'Twitch': return styles.twitchInput;
                default: return styles.runescapeInput;
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
        if(field === 'username'){
            this.setState({
               username: e.target.value
            });
        }
        else{
            this.setState({
                password: e.target.value
            });
        }
    }


    render(){
        return (
            <div className={styles.loginDiv}>
            <div className={this.determineClass('header')}>
                <i className={styles.closeButton} onClick={this.props.removeForm}>
                    &#128473;
                </i>
            </div>
                <div className={styles.mainLoginDiv}>
                    <div className={styles.loginEntryDiv}>
                       <label>
                           Username
                       </label>
                        <input type="text" className={this.determineClass('input')} value={this.state.username} onChange={this.handleChange.bind(this, 'username')}/>
                    </div>
                    {this.props.failedLogin ? <div className={styles.failMessage}>Username or Password are incorrect.</div> : null}
                    <div className={styles.loginEntryDiv}>
                        <label>
                            Password
                        </label>
                        <input type="password" className={this.determineClass('input')} value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
                    </div>
                </div>
                <div className={styles.recommendationDiv}>
                    Don't have an account? <i onClick={this.props.showSignup}>Signup</i>
                </div>
                <div className={styles.buttonDiv}>
                    <button className={this.determineClass('submit')} onClick={this.props.login.bind(this, this.state.username, this.state.password)}>Login</button>
                    <button className={this.determineClass('cancel')} onClick={this.props.removeForm}>Cancel</button>
                </div>
                <div className={styles.stayLoggedDiv}>
                    <label>Keep me logged in </label>
                    <input type="checkbox" value="loggedin" checked={this.props.stayLogged} onClick={this.props.handleClick}/>
                </div>
            </div>
        );
    }
}