import React, {Component} from 'react';
import styles from '../../../Stylesheets/Main/Runescape.css';
import HighscoreWrapper from "./HighscoreWrapper";

export default class Highscore extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        document.body.className = styles.runescapeComponent;
        document.title = 'Highscores';
    }

    componentWillUnmount(){
        document.body.style.backgroundColor = null;
    }

    render(){
        return (
            <div>
                <HighscoreWrapper/>
            </div>
        )
    }
}