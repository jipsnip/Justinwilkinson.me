import React, {Component} from 'react';
import axios from 'axios';
import LookupContainer from '../../General/LookupContainer';
import AdventureLogTableContainer from './AdventureLogTableContainer';
import styles from '../../../Stylesheets/General/Wrapper.css';
import ImageCarousel from "../../General/ImageCarousel";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class AdventureLogWrapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            rsn: 'Fat Albert',
            advLog: [],
            error: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleInputChange(e){
        this.setState({
           rsn: e
        });
    }

    handleClick(){
        var self = this;
        axios.get('/player/adventlog?user=' + this.state.rsn)
            .then(function(player){
                if(!player.data.error) {
                    self.setState({
                        advLog: player.data,
                        error: null
                    });
                }
                else if(player.data.error === 'PROFILE_PRIVATE'){
                    self.setState({
                        error: 'User ' + self.state.rsn + '\'s profile is private.'
                    });
                }
                else{
                    self.setState({
                       error: 'User ' + self.state.rsn + ' does not exist.'
                    });
                }
            });
    }

    componentDidMount() {
        document.title = 'Adventure Log';
    }


    render(){
        return (
            <div>
                <ImageCarousel images={['./Carousel/Carousel1.png', './Carousel/Carousel2.png','./Carousel/Carousel3.png', './Carousel/Carousel4.png','./Carousel/Carousel5.png', './Carousel/Carousel6.png']}
                               links={['http://services.runescape.com/m=news/the-g-nome-project', 'http://services.runescape.com/m=news/a=13/runescape-premier-club-2018', '',
                                       'https://www.runescape.com/info/mobile', 'http://services.runescape.com/m=news/a=13/evil-dave--winter-weekends', 'http://services.runescape.com/m=news/a=13/combat-pets--premier-club']} rotate={true}/>
                <div className={styles.runescapeWrapper}>
                    <LookupContainer onInputChange={this.handleInputChange} onClick={this.handleClick} value={this.state.rsn} site={'Runescape'} error={this.state.error}/>
                    <AdventureLogTableContainer advLog={this.state.advLog}/>
                </div>
            </div>
        );
    }
}