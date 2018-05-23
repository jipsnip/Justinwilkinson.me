import React, {Component} from 'react';
import axios from 'axios';
import LookupContainer from '../../General/LookupContainer';
import HighscoreTableContainer from './HighscoreTableContainer';
import styles from '../../../Stylesheets/General/Wrapper.css';
import ImageCarousel from "../../General/ImageCarousel";

export default class HighscoreWrapper extends Component{
    constructor(props){
        super(props);
        this.state = {
            rsn: 'Fat Albert',
            stats: null,
            username: '',
            overallLevel: '',
            overallXp: '',
            overallRank: '',
            error: null
        };

       this.handleLookup = this.handleLookup.bind(this);
       this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
           rsn:  e
        });
    }

    handleLookup(){
        var self = this;
        axios.get('/player/stats/db?user=' + this.state.rsn.toLowerCase() + '&type=normal')
            .then(function(data) {
                console.log('highscore data', data);
                if(data.data.length > 0) {
                    self.setState({
                        stats: data.data[0],
                        username: data.data[0].username,
                        overallLevel: data.data[0].overall.level,
                        overallXp: data.data[0].overall.exp,
                        overallRank: data.data[0].overall.rank,
                        error: null
                    });
                }
                else{
                    axios.get('/highscores/user/add?rsn=' + self.state.rsn.toLowerCase() + '&type=normal')
                        .then(function(data){
                            self.setState({
                               stats: data.data,
                                username: data.data.username,
                                overallLevel: data.data.overall.level,
                                overallXp: data.data.overall.exp,
                                overallRank: data.data.overall.rank,
                                error: null
                            });
                        }).catch(function(error){
                            self.setState({
                                error: 'User ' + self.state.rsn + ' does not exist.'
                            });
                        });
                }
            })
            .catch(function(error){
               console.log(error);
            });
    }

    componentDidMount(){
        document.title = 'Highscores';
        this.handleLookup();
    }

    render(){
        return (
            <div>
                <ImageCarousel images={['./Carousel/Carousel1.png', './Carousel/Carousel2.png','./Carousel/Carousel3.png', './Carousel/Carousel4.png','./Carousel/Carousel5.png', './Carousel/Carousel6.png']}
                               links={['http://services.runescape.com/m=news/the-g-nome-project', 'http://services.runescape.com/m=news/a=13/runescape-premier-club-2018', '',
                                   'https://www.runescape.com/info/mobile', 'http://services.runescape.com/m=news/a=13/evil-dave--winter-weekends', 'http://services.runescape.com/m=news/a=13/combat-pets--premier-club']} rotate={true}/>
                <div className={styles.runescapeWrapper}>
                    <LookupContainer userType={true} value={this.state.rsn} onClick={this.handleLookup} onInputChange={this.handleChange} site={'Runescape'} error={this.state.error}/>
                    {this.state.stats ? <HighscoreTableContainer stats={this.state.stats} username={this.state.username} overallLevel={this.state.overallLevel}
                                              overallXp={this.state.overallXp} overallRank={this.state.overallRank}/> : null}
                </div>
            </div>
        );
    }
}