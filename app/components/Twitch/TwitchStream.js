import React, {Component} from 'react';
import styles from '../../Stylesheets/Twitch/TwitchVideoContainers.css';

export default class TwitchStream extends Component {

    constructor(props){
        super(props);
        this.state = {
            minimized: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.determineClass = this.determineClass.bind(this);
    }

    handleClick(){
        this.setState({
            minimized: !this.state.minimized
        });
    }

    determineClass(element){
        if(this.state.minimized){
            if(this.props.view === 'list'){
                if(!this.props.expanded){
                    if(element === 'container'){
                        return styles.minimizedExpandedStreamContainer;
                    }
                    else if(element === 'videoCont'){
                        return styles.expandedVideoContainer;
                    }
                    else if(element === 'chatCont'){
                        return styles.expandedChatContainer;
                    }
                    else if(element === 'chat'){
                        return styles.expandedChat;
                    }
                    else if(element === 'video'){
                        return styles.expandedVideo;
                    }
                }
                else{
                    if(element === 'container'){
                        return styles.minimizedStreamContainer;
                    }
                    else if(element === 'videoCont'){
                        return styles.videoContainer;
                    }
                    else if(element === 'chatCont'){
                        return styles.chatContainer;
                    }
                    else if(element === 'chat'){
                        return styles.chat;
                    }
                    else if(element === 'video'){
                        return styles.video;
                    }
                }
            }
            else{
                if(!this.props.expanded){
                    if(element === 'container'){
                        return styles.minimizedExpandedGridStreamContainer;
                    }
                    else if(element === 'videoCont'){
                        return styles.expandedGridVideoContainer;
                    }
                    else if(element === 'chatCont'){
                        return styles.expandedGridChatContainer;
                    }
                    else if(element === 'chat'){
                        return styles.gridExpandedChat;
                    }
                    else if(element === 'video'){
                        return styles.expandedGridVideo;
                    }
                }
                else{
                    if(element === 'container'){
                        return styles.minimizedGridStreamContainer;
                    }
                    else if(element === 'videoCont'){
                        return styles.gridVideoContainer;
                    }
                    else if(element === 'chatCont'){
                        return styles.gridChatContainer;
                    }
                    else if(element === 'chat'){
                        return styles.gridChat;
                    }
                    else if(element === 'video'){
                        return styles.gridVideo;
                    }
                }
            }
        }
        else{
            if(this.props.view === 'list'){
                if(!this.props.expanded){
                    if(element === 'container'){
                        return styles.expandedStreamContainer;
                    }
                    else if(element === 'videoCont'){
                        return styles.expandedVideoContainer;
                    }
                    else if(element === 'chatCont'){
                        return styles.expandedChatContainer;
                    }
                    else if(element === 'chat'){
                        return styles.expandedChat;
                    }
                    else if(element === 'video'){
                        return styles.expandedVideo;
                    }
                }
                else{
                    if(element === 'container'){
                        return styles.streamContainer;
                    }
                    else if(element === 'videoCont'){
                        return styles.videoContainer;
                    }
                    else if(element === 'chatCont'){
                        return styles.chatContainer;
                    }
                    else if(element === 'chat'){
                        return styles.chat;
                    }
                    else if(element === 'video'){
                        return styles.video;
                    }
                }
            }
            else{
                if(!this.props.expanded){
                    if(element === 'container'){
                        return styles.expandedGridStreamContainer;
                    }
                    else if(element === 'videoCont'){
                        return styles.expandedGridVideoContainer;
                    }
                    else if(element === 'chatCont'){
                        return styles.expandedGridChatContainer;
                    }
                    else if(element === 'chat'){
                        return styles.gridExpandedChat;
                    }
                    else if(element === 'video'){
                        return styles.expandedGridVideo;
                    }
                }
                else{
                    if(element === 'container'){
                        return styles.gridStreamContainer;
                    }
                    else if(element === 'videoCont'){
                        return styles.gridVideoContainer;
                    }
                    else if(element === 'chatCont'){
                        return styles.gridChatContainer;
                    }
                    else if(element === 'chat'){
                        return styles.gridChat;
                    }
                    else if(element === 'video'){
                        return styles.gridVideo;
                    }
                }
            }
        }
    }

    render(){
        return (
            <div className={this.determineClass('container')}>
                <div className={styles.videoHeader}>
                    <span className={styles.streamName}>
                        {this.props.stream}
                    </span>
                    <span className={styles.remove} onClick={this.props.removeStream.bind(this, this.props.stream)}>
                        &#x2716;
                    </span>
                    <img src={this.state.minimized ? require('../../images/Twitch/Plus.png') : require('../../images/Twitch/Minus.png')} className={styles.expander}
                         onClick={this.handleClick}/>
                </div>
                <div className={this.determineClass('videoCont')}>
                    <iframe src={"https://player.twitch.tv/?channel=" + this.props.stream + "&autoplay=false"} frameBorder="0" allowFullScreen="true" scrolling="no" height="700" width="1245"
                            className={this.determineClass('video')}/>
                </div>
                <div className={this.determineClass('chatCont')}>
                    <iframe src={"https://www.twitch.tv/" + this.props.stream + "/chat?popout="} frameBorder="0" scrolling="no" height="700" width="362"
                            className={this.determineClass('chat')}/>
                </div>
            </div>
        );
    }
}