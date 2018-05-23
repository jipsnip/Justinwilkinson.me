import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/AdventureLog.css';
import AdventureLogEntry from "./AdventureLogEntry";

export default class AdventureLogTableContainer extends Component {

    constructor(props){
        super(props);
        this.mapAdventureLogEntries = this.mapAdventureLogEntries.bind(this);
    }

    mapAdventureLogEntries(){
        return this.props.advLog.map(function(v, i){
           return (
               <AdventureLogEntry value={v} number={i} key={i}/>
           );
        });
    }

    render(){
        return (
            <div className={this.props.advLog.length !== 0 ? styles.infoContainer : null}>
                {this.mapAdventureLogEntries()}
            </div>
        );
    }
}