import React, {Component} from 'react';
import styles from '../../Stylesheets/Navigation/NavBar.css';
import MobileNavSubDropdown from "./MobileNavSubDropdown";

export default class MobileNavDropdown extends Component{
    constructor(props){
        super(props);
        this.state = {
            expanded: false
        };

        this.determineClass = this.determineClass.bind(this);
        this.mapSites = this.mapSites.bind(this);
        this.handleExpansion = this.handleExpansion.bind(this);
    }

    determineClass(field){
        if(field === 'trigram'){
            switch(this.props.site) {
                case 'Twitch':
                    return styles.twitchTrigram;
                case 'League':
                    return styles.leagueTrigram;
                case 'Activation':
                    return;
                case 'Home':
                    return styles.homeTrigram;
                default:
                    return styles.generalTrigram;
            }
        }
        else if(field === 'ul'){
            switch(this.props.site){
                case 'Twitch':
                    return styles.twitchDropdown;
                case 'League':
                    return styles.leagueDropdown;
                case 'Activation':
                    return;
                case 'Home':
                    return styles.homeDropdown;
                default:
                    return styles.generalDropdown;
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
                return this.state.hovered ? styles.twitchHoveredDropdownExpander : styles.twitchDropdownExpander;
            }
            else if(this.props.site === 'Activation'){
                return;
            }
            else if(this.props.site === 'Home'){
                return this.state.hovered ? styles.homeHoveredDropdownExpander : styles.homeDropdownExpander;
            }
            else {
                return this.state.hovered ? styles.hoveredDropdownExpander : styles.dropdownExpander;
            }
        }
    }

    handleExpansion(){
        this.setState({
           expanded: !this.state.expanded
        });
    }

    mapSites(){
        var self = this;
        return this.props.pages.pages.name.map((v, i) => {
            if(self.props.pages.pages.subpages[v] !== undefined){
                return (
                  <MobileNavSubDropdown site={self.props.site} key={i} value={v} subpages={self.props.pages.pages.subpages[v]}/>
                );
            }
            else {
                return (
                    <li key={i} className={styles.dropdownItem}>
                        <a  href={"/" + v} className={self.determineClass('link')}>{v}</a>
                    </li>
                );
            }
        });
    }

    render(){
        return (
            <div className={styles.mobileNavContainer} onMouseEnter={this.handleExpansion} onMouseLeave={this.handleExpansion}>
                <div className={this.determineClass('trigram')}>
                    &#9776;
                </div>
                {this.state.expanded ?
                    <ul className={this.determineClass('ul')}>
                    {this.mapSites()}
                    </ul>
                    : null}
            </div>
        );
    }
}