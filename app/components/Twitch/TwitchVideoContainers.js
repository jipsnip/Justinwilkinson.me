import React, {Component} from 'react';
import styles from '../../Stylesheets/Twitch/TwitchVideoContainers.css';
import TwitchStream from "./TwitchStream";

export default class TwitchVideoContainers extends Component {

    constructor(props){
        super(props);
        this.state = {
            streams: []
        };

        this.mapStreams = this.mapStreams.bind(this);
        this.removeStream = this.removeStream.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.username !== '' && this.props.username !== nextProps.username && nextProps.expanded === this.props.expanded) {
            if (!this.state.streams.includes(nextProps.username)) {
                if (this.state.streams.length === 0) {
                    this.setState({
                        streams: [nextProps.username]
                    });
                }
                else {
                    this.setState({
                        streams: this.state.streams.concat([nextProps.username])
                    });
                }
            }
        }
    }

    removeStream(e){
        var arr = this.state.streams;
        arr[arr.indexOf(e)] = '';
        this.setState({
            streams: arr
        });
    }

    mapStreams(){
        var self = this;
        return this.state.streams.map(function(v, i){
            if(v !== '') {
                return (
                    <TwitchStream key={i} stream={v} expanded={self.props.expanded} view={self.props.view}
                                  removeStream={self.removeStream}/>
                );
            }
            else{
                return null;
            }
        });
    }

    render(){

        return (
            <div className={styles.videosContainer}>
                {this.state.streams.length !== 0 ? this.mapStreams() : null}
            </div>
        );
    }
}