import React, {Component} from 'react';
import TwitchFormatButtons from './TwitchFormatButtons';
import TwitchInput from './TwitchInput';
import TwitchVideoContainers from './TwitchVideoContainers';
import Cookies from 'universal-cookie';
import styles from '../../Stylesheets/Twitch/TwitchMainPanel.css';

var cookies = new Cookies();

export default class TwitchMainPanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            view: 'list'
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        if(e !== this.state.view){
            this.setState({
                view: e
            });
        }
    }

    render(){
        return (
            <div className={!this.props.expanded ? styles.expandedMainPanelDiv : styles.mainPanelDiv}>
                <TwitchFormatButtons handleClick={this.handleClick} view={this.state.view}/>
                <TwitchInput handleChange={this.props.handleChange} handleLookup={this.props.handleLookup} value={this.props.twitchId} handleRemoved={this.props.handleRemove} handleClicked={this.props.handleUserClick}
                             recommendations={this.props.recommendations}/>
                <TwitchVideoContainers view={this.state.view} username={this.props.user} expanded={this.props.expanded}/>
            </div>
        );
    }
}