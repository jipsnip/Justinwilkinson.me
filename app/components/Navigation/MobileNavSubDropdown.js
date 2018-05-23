import React, {Component} from 'react';
import styles from '../../Stylesheets/Navigation/NavBar.css';
import MobileNavSubDropdownItem from "./MobileNavSubDropdownItem";

export default class MobileNavSubDropdown extends Component{
    constructor(props){
        super(props);
        this.state = {
            expanded: false
        };

        this.mapSubPages = this.mapSubPages.bind(this);
        this.handleExpansion = this.handleExpansion.bind(this);
        this.determineClass = this.determineClass.bind(this);
    }

    handleExpansion(){
        this.setState({
            expanded: !this.state.expanded
        });
    }

    mapSubPages(){
        var self = this;
        return this.props.subpages.map((v, i) => {
            return (
                <MobileNavSubDropdownItem site={self.props.site} value={v} key={i}/>
            );
        });
    }

    determineClass(field){
        if(field === 'ul'){
            switch(this.props.site){
                case 'Twitch':
                    return styles.twitchSubDropdown;
                case 'League':
                    return styles.leagueSubDropdown;
                case 'Activation':
                    return;
                case 'Home':
                    return styles.homeSubDropdown;
                default:
                    return styles.subDropdown;
            }
        }
        else if(field === 'link'){
            switch(this.props.site){
                case 'Twitch':
                    return styles.twitchNavLink;
                case 'League':
                    return styles.leagueNavLink;
                case 'Activation':
                    return;
                case 'Home':
                    return styles.homeNavLink;
                default:
                    return styles.navLink;
            }
        }
        else if(field === 'span') {
            if (this.props.site === 'Twitch') {
                return this.state.expanded ? styles.twitchHoveredDropdownExpander : styles.twitchDropdownExpander;
            }
            else if(this.props.site === 'Activation'){
                return;
            }
            else if(this.props.site === 'League'){
                return this.state.expanded ? styles.leagueHoveredDropdownExpander : styles.leagueDropdownExpander;
            }
            else if(this.props.site === 'Home'){
                return this.state.expanded ? styles.homeHoveredDropdownExpander : styles.homeDropdownExpander;
            }
            else {
                return this.state.expanded ? styles.hoveredDropdownExpander : styles.dropdownExpander;
            }
        }
    }

    render(){
        return (
            <li className={styles.expandedDropdownItem} onMouseEnter={this.handleExpansion} onMouseLeave={this.handleExpansion}>
                <a className={this.determineClass('link')}>
                    {this.props.value}
                    <span className={this.determineClass('span')}/>
                </a>
                {this.state.expanded ?
                    <ul className={this.determineClass('ul')}>
                        {this.mapSubPages()}
                    </ul>
                    : null}
            </li>
        );
    }
}