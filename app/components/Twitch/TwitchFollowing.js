import React, {Component} from 'react';
import styles from '../../Stylesheets/Twitch/TwitchFollowing.css';
import axios from 'axios';

export default class TwitchFollowing extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            imageUrl: ''
        };
        this.mapFollowing = this.mapFollowing.bind(this);
        this.mapFollowing();
    }

    mapFollowing(){
        var self = this;
        axios.get('/Twitch/User/Id?id=' + this.props.following.to_id + '&Oauth=' + this.props.Oauth).then((response) => {
            self.setState({
               username:  JSON.parse(response.data.body).data[0].display_name,
                imageUrl: JSON.parse(response.data.body).data[0].profile_image_url
            });
        }, (err) => {
            console.log(err);
        });
    }

    render(){
        return (
            <div className={this.props.expanded ? styles.followContainer : styles.minimizedFollowContainer} onClick={this.props.handleClick.bind(this, this.state.username)}>
                {this.state.imageUrl !== '' ? <img src={this.state.imageUrl} className={this.props.expanded ? styles.followImage : styles.minimizedFollowImage}/> : null}
                {this.state.username !== '' ? <span className={styles.followName}>{this.state.username}</span> : null}
            </div>
        );
    }
}