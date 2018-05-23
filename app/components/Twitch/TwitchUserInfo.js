import React, {Component} from 'react';
import axios from 'axios';
import styles from '../../Stylesheets/Twitch/TwitchUserInfo.css';

export default class TwitchUserInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            imageUrl: '',
            views: null
        };

        this.lookupUserInfo = this.lookupUserInfo.bind(this);
        this.lookupUserInfo();
    }

    lookupUserInfo(){
        var self = this;
        axios.get('/Twitch/User?Oauth=' + this.props.Oauth + '&user=' + this.props.username).then((response) => {
            self.setState({
                username: JSON.parse(response.data).data[0].display_name,
                imageUrl: JSON.parse(response.data).data[0].profile_image_url,
                views: JSON.parse(response.data).data[0].view_count
            });
            self.props.setId(JSON.parse(response.data).data[0].id);
        }, (err) => {
            console.log(err);
        });
    }

    render(){
        return (
            <div className={this.props.expanded ? styles.userInfoContainer : styles.minimizedUserInfoContainer}>
                <div className={this.props.expanded ? styles.userInfo : styles.minimizedUserInfo}>
                    <img src={this.state.imageUrl} className={this.props.expanded ? styles.userImage : styles.minimizedUserImage}/>
                    <span className={styles.userText}>
                        {this.state.username}
                    </span>
                </div>
            </div>
        );
    }
}