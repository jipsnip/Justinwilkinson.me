import React, {Component} from 'react';
import MobileNavSubDropdown from './MobileNavSubDropdown';
import styles from '../../Stylesheets/Navigation/NavBar.css';

export default class MobileNavSubDropdownItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            expanded: false
        };

        this.determineClass = this.determineClass.bind(this);
        this.handleExpansion = this.handleExpansion.bind(this);
    }

    handleExpansion(){
        this.setState({
           expanded: !this.state.expanded
        });
    }

    determineClass(field){
        if(field === 'li') {
            if (this.props.site === 'League') {
                return styles.leagueDropdownItem;
            }
            else if (this.props.site === 'Twitch') {
                return styles.twitchDropdownItem;
            }
            else if (this.props.site === 'Activation') {
                return;
            }
            else if(this.props.site === 'Home'){
                return styles.homeDropdownItem;
            }
            else {
                return styles.dropdownItem;
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
        else if(field === 'ul'){
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
    }

    mapSubPages(){
        var self = this;
        return this.props.value[Object.keys(this.props.value)[0]].map((v, i) => {
            return (
                <MobileNavSubDropdownItem site={self.props.site} value={v} key={i}/>
            );
        });
    }

    render(){
        if(typeof(this.props.value) === 'object') {
            return (
              <li className={styles.expandedDropdownItem} onMouseEnter={this.handleExpansion} onMouseLeave={this.handleExpansion}>
                  <a className={this.determineClass('link')}>
                      {Object.keys(this.props.value)[0]}
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
        else {
            return (
                <li className={this.determineClass('li')}>
                    <a href={"/" + this.props.value} className={this.determineClass('link')}>
                        {this.props.value}
                    </a>
                </li>
            );
        }
    }
}