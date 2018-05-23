import React, {Component} from 'react';
import Pages from '../../../config/Pages';
import styles from '../../Stylesheets/Navigation/NavBar.css';
import NavDropdownItem from "./NavDropdownItem";

export default class NavDropdown extends Component{

    constructor(props){
        super(props);

        this.mapSubPages = this.mapSubPages.bind(this);
        this.determineClass = this.determineClass.bind(this);
    }

    mapSubPages(pages){
        var self = this;
        return pages.pages.subpages[this.props.name].map(function(v, i){
                return (
                        <NavDropdownItem key={i} value={v} site={self.props.site}/>
                );
        });
    }

    determineClass(){
        if(this.props.site === 'League'){
            return styles.leagueDropdown;
        }
        else if(this.props.site === 'Twitch'){
            return styles.twitchDropdown
        }
        else if(this.props.site === 'Activation'){
            return;
        }
        else if(this.props.site === 'Home'){
            return styles.homeDropdown;
        }
        else {
            return styles.generalDropdown;
        }
    }

    render() {
        return (
            <ul className={this.determineClass()}>
                {this.mapSubPages(Pages)}
            </ul>
        )
    }
}
