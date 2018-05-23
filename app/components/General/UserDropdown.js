import React, {Component} from 'react';
import styles from '../../Stylesheets/General/UserDropdown.css';

export default class UserDropdown extends Component{

    constructor(props){
        super(props);
        this.state = {
            expanded: false
        };

        this.handleExpansion = this.handleExpansion.bind(this);
        this.determineClass = this.determineClass.bind(this);
    }

    handleExpansion(){
        this.setState({
            expanded: !this.state.expanded
        });
    }

    determineClass(field){
        if(field === 'DropdownContainer'){
            switch(this.props.site){
                case 'Twitch': return styles.twitchUserDropdownContainer;
                case 'League': return styles.leagueUserDropdownContainer;
                default: return styles.userDropdownContainer;
            }
        }
        else if(field === 'UsernameDiv'){
            if(this.state.expanded){
                switch(this.props.site){
                    case 'Twitch': return styles.twitchExpandedUsernameDiv;
                    case 'League': return styles.leagueExpandedUsernameDiv;
                    default: return styles.expandedUsernameDiv;
                }
            }
            else{
                switch(this.props.site){
                    case 'Twitch': return styles.twitchUsernameDiv;
                    case 'League': return styles.leagueUsernameDiv;
                    default: return styles.usernameDiv;
                }
            }
        }
        else if(field === 'Dropdown'){
            if(this.state.expanded){
                switch(this.props.site){
                    case 'Twitch': return styles.twitchExpandedDropdown;
                    case 'League': return styles.leagueExpandedDropdown;
                    default: return styles.expandedDropdown;
                }
            }
            else{
                switch(this.props.site){
                    case 'Twitch': return styles.twitchDropdown;
                    case 'League': return styles.leagueDropdown;
                    default: return styles.dropdown;
                }
            }
        }
        else{
            switch(this.props.site){
                case 'Twitch': return styles.twitchOptionList;
                case 'League': return styles.leagueOptionList;
                default: return styles.optionList;
            }
        }
    }

    render(){
        return (
            <div onMouseEnter={this.handleExpansion} onMouseLeave={this.handleExpansion} className={this.determineClass('DropdownContainer')}>
                <div className={this.determineClass('UsernameDiv')}>
                    {this.props.username}
                    <span className={this.determineClass('Dropdown')}/>
                </div>
                {this.state.expanded ?
                <ul className={this.determineClass('Options')}>
                    <li onClick={this.props.handleLogout}>Logout</li>
                </ul>
                    : null}
            </div>
        );
    }

}