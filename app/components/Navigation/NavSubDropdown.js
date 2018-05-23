import React, {Component} from 'react';
import styles from '../../Stylesheets/Navigation/NavBar.css';

export default class NavSubDropdown extends Component {

    constructor(props){
        super(props);

        this.mapDropdownItems = this.mapDropdownItems.bind(this);
        this.determineClass = this.determineClass.bind(this);
    }

    determineClass(element){
        if(element === 'li'){
            if(this.props.site === 'League'){
                return styles.leagueDropdownItem;
            }
            else if(this.props.site === 'Twitch'){
                return styles.twitchDropdownItem;
            }
            else if(this.props.site === 'Activation'){
                return;
            }
            else if(this.props.site === 'Home'){
                return styles.homeDropdownItem;
            }
            else{
                return styles.dropdownItem;
            }
        }
        else if(element === 'ul'){
            if(this.props.site === 'League'){
                return styles.leagueSubDropdown;
            }
            else if(this.props.site === 'Twitch'){
                return styles.twitchSubDropdown;
            }
            else if(this.props.site === 'Activation'){
                return;
            }
            else if(this.props.site === 'Home'){
                return styles.homeSubDropdown;
            }
            else{
                return styles.subDropdown;
            }
        }
        else{
            if(this.props.site === 'League'){
                return styles.leagueNavLink;
            }
            else if(this.props.site === 'Twitch'){
                return styles.twitchNavLink;
            }
            else if(this.props.site === 'Activation'){
                return;
            }
            else if(this.props.site === 'Home'){
                return styles.homeNavLink;
            }
            else{
                return styles.navLink;
            }
        }
    }


    mapDropdownItems(){
        var self = this;
        return this.props.value[Object.keys(this.props.value)[0]].map(function(v, i){
            return (
              <li className={self.determineClass('li')} key={i}>
                  <a href={'/' + v} className={self.determineClass('a')}>
                      {v}
                  </a>
              </li>
            );
        });
    }

    render(){
        return(
            <ul className={this.determineClass('ul')}>
                {this.mapDropdownItems()}
            </ul>
        );
    }
}