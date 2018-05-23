import React, {Component} from 'react';
import styles from '../../Stylesheets/Navigation/NavBar.css';
import NavDropdown from './NavDropdown';

export default class NavItem extends Component{
    constructor(props){
        super(props);
        this.state = {
           hovered: false
        };

        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseIn = this.handleMouseIn.bind(this);
    }

    handleMouseOut(){
            this.setState({
                hovered: false
            });
    }

    handleMouseIn(){
        this.setState({
            hovered: true
        });
    }

    handleStyles(field){
        if(field === 'dropdown'){
            if(this.props.site === 'League'){
                if(this.state.hovered === false){
                    return styles.leagueNavExpander;
                }
                else{
                    return styles.hoveredLeagueNavExpander;
                }
            }
            else if(this.props.site === 'Twitch'){
                if(this.state.hovered === false){
                    return styles.twitchNavExpander;
                }
                else{
                    return styles.hoveredTwitchNavExpander;
                }
            }
            else if(this.props.site === 'Activation'){
                return;
            }
            else if(this.props.site === 'Home'){
                if(this.state.hovered === false){
                    return styles.homeNavExpander;
                }
                else{
                    return styles.homeHoveredNavExpander;
                }
            }
            else{
                if(this.state.hovered === false){
                    return styles.navExpander;
                }
                else{
                    return styles.hoveredNavExpander;
                }
            }
        }
        else{
            if(this.props.site === 'League'){
                if(this.props.name === 'League of Legends'){
                    return styles.activeLeagueNavItem;
                }
                else{
                    return styles.leagueNavItem;
                }
            }
            else if(this.props.site === 'Twitch'){
                if(this.props.name === 'Twitch'){
                    return styles.activeTwitchNavItem;
                }
                else{
                    return styles.twitchNavItem;
                }
            }
            else if(this.props.site === 'Activation'){
                return;
            }
            else if(this.props.site === 'Home'){
                return styles.homeNavItem;
            }
            else{
                return styles.navItem;
            }
        }
    }

    render(){
        return (
            <li className={this.handleStyles()} onMouseEnter={this.handleMouseIn} onMouseLeave={this.handleMouseOut}>
                    <a className={this.props.site === 'League' ? styles.leagueDropdownButton : styles.dropdownButton} href={this.props.subpages ? null : '/' + this.props.name}>
                        {this.props.name}
                    </a>
                {this.props.subpages ? <span className={this.handleStyles('dropdown')}/> : null}
                {this.state.hovered && this.props.subpages ? <NavDropdown name={this.props.name} site={this.props.site}/> : null}
            </li>
        );
    }
}
