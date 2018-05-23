import React,{Component} from 'react';
import styles from '../../Stylesheets/General/Activation.css';
import axios from 'axios';
import qs from 'query-string';
import Cookies from 'universal-cookie';

var query = qs.parse(location.search);
var cookies = new Cookies();

export default class Activation extends Component{

    constructor(props){
        super(props);
        this.state = {
            code: '',
            activated: null,
            countdown: 5,
            reset: false
        };

        if(Object.keys(query).indexOf('id') < 0){
            window.location = '/';
        }
        axios.get('/User/Activation?id=' + query.id)
            .then((results) => {
                if(results.data.length === 0){
                    window.location = '/';
                }
            }, (err) => {
                console.log('here');
                console.log(err);
            });
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.decrementCountdown = this.decrementCountdown.bind(this);
        this.resetCode = this.resetCode.bind(this);
    }

    resetCode(){
        axios.put('/User/Reset?link=' + query.id)
            .then((results) => {
                console.log(results);
                this.setState({
                    reset: true,
                    activated: null
                });
            }, (err) => {
                console.log(err);
            });
    }

    handleChange(e){
        this.setState({
            code: e.target.value
        });
    }

    decrementCountdown(){
        this.setState({
            countdown: this.state.countdown - 1
        });
        if(this.state.countdown === 0){
            window.location = '/';
        }
    }

    handleClick(){
        var self = this;
        axios.get('/User/Activation?id=' + query.id)
            .then((results) => {
                if(results.data[0].activationcode === this.state.code){
                    axios.put('/User/Activate?username=' + results.data[0].username)
                        .then((results) => {
                            self.setState({
                                activated: true,
                                reset: false
                            });
                            setInterval(() => {
                                self.decrementCountdown();
                            }, 1000);
                        }, (err) => {
                            console.log(err);
                        });
                }
                else{
                    self.setState({
                        activated: false,
                        reset: false
                    });
                }
            }, (err) => {
                console.log(err);
            });
    }

    render(){
        return (
          <div className={styles.activationDiv}>
              <div className={styles.activationMessage}>
                  Please enter the activation code that was sent to your registered email address.
              </div>
              <div className={styles.activationButtonDiv}>
                <input type="text" value={this.state.code} onChange={this.handleChange}/>
                  <button onClick={this.handleClick}>Submit</button>
                  {this.state.activated ? <div className={styles.confirmationMessage}>Your account has been successfully activated! You will be redirected in <i>{this.state.countdown}</i> seconds.</div> : null}
                  {this.state.activated === false ? <div className={styles.incorrectMessage}>That activation code is incorrect. Try again or <a onClick={this.resetCode}>request a new code</a>.</div> : null}
                  {this.state.reset ? <div className={styles.confirmationMessage}>A new activation code has been sent to your registered email.</div> : null}
              </div>
          </div>
        );
    }
}