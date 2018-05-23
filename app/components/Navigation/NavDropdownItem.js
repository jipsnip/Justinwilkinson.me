import React, {Component} from 'react';
import styles from '../../Stylesheets/Navigation/NavBar.css';
import NavSubDropdown from "./NavSubDropdown";

export default class NavDropdownItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            hovered: false
        };

        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseIn = this.handleMouseIn.bind(this);
        this.determineLink = this.determineLink.bind(this);
        this.determineClass = this.determineClass.bind(this);
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

    determineClass(element){
        if(element === 'span') {
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

    determineLink(){
        if(typeof(this.props.value) === 'object'){
            return (
                <a className={this.determineClass('a')}>
                    {Object.keys(this.props.value)[0]}
                    <span className={this.determineClass('span')}/>
                </a>
            );
        }
        else{
            return (
                <a href={'/' + this.props.value} className={this.determineClass('a')}>
                    {this.props.value}
                </a>
            )
        }
    }


    render(){
        return (
            <li onMouseEnter={this.handleMouseIn} onMouseLeave={this.handleMouseOut} className={typeof(this.props.value) === 'object' ? styles.expandedDropdownItem : styles.dropdownItem}>
                {this.determineLink()}
                {this.state.hovered && typeof(this.props.value) === 'object' ? <NavSubDropdown value={this.props.value} site={this.props.site}/> : null}
            </li>
        );
    }
}