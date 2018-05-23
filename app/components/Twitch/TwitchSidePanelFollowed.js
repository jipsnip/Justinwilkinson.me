import React, {Component} from 'react';
import axios from 'axios';
import styles from '../../Stylesheets/Twitch/TwitchSidePanel.css';
import TwitchFollowing from "./TwitchFollowing";

export default class TwitchSidePanelFollowed extends Component {

    constructor(props){
        super(props);
        this.state = {
            followed: []
        };

        this.retrieveFollowed = this.retrieveFollowed.bind(this);
        this.mapFollowed = this.mapFollowed.bind(this);
        this.props.id !== null && this.state.followed.length === 0 ? this.retrieveFollowed(this.props.id) : null
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.id !== this.props.id){
            this.retrieveFollowed(nextProps.id);
        }
    }

    retrieveFollowed(){
        var self = this;
        axios.get('/Twitch/Followings?id=' + this.props.id + '&Oauth=' + this.props.Oauth).then((result) => {
            self.setState({
                followed: JSON.parse(result.data).data
            });
        }, (err) => {
            console.log(err);
        });
    }

    mapFollowed(){
        return this.state.followed.map((v, i) => {
            if(i < 10){
                return <TwitchFollowing following={v} Oauth={this.props.Oauth} expanded={this.props.expanded} key={i} handleClick={this.props.handleClick}/>
            }
        });
    }

    render(){
        return (
            <div className={this.props.expanded ? styles.followedContainer : styles.minimizedFollowedContainer}>
                {this.props.id !== null ? <div className={this.props.expanded ? styles.followingLabel : styles.minimizedFollowingLabel}>Following</div> : null}
                {this.props.id !== null && !this.props.expanded ? <span className={styles.followerIconContainer}><i className={["fa fa-heart", styles.followerIcon].join(' ')}/></span> : null}
                {this.props.id !== null && this.state.followed.length !== 0 ? this.mapFollowed() : null}
            </div>
        );
    }

}