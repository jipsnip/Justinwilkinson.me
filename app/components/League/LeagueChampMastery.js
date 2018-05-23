import React, {Component} from 'react';
import styles from '../../Stylesheets/League/LeagueChampMastery.css';
import axios from 'axios';
var assetRequire = require.context('../../images/League/', true, /\.(png|jpg)/);

export default class LeagueChampMastery extends Component {

    constructor(props){
        super(props);
        this.state = {
            champMastery: []
        };

        this.lookupChampMastery = this.lookupChampMastery.bind(this);
        this.determineBorder = this.determineBorder.bind(this);
        this.lookupChampMastery(this.props.summonerId, this.props.region);
    }

    componentWillReceiveProps(nextProps){
        nextProps.summonerId !== this.props.summonerId ? this.lookupChampMastery(nextProps.summonerId, nextProps.region) : null;
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.summonerId !== this.props.summonerId ||
            nextState.champMastery !== this.state.champMastery
    }

    lookupChampMastery(id, platform){
        var self = this;
        axios.get('/league/summoner/mastery?summoner=' + id + '&platform=' + platform)
            .then(function(mastery){
                self.setState({
                    champMastery: mastery.data
                });
            });
    }

    determineBorder(index){
        switch(this.state.champMastery[index].championLevel){
            case 1: return styles.rank1;
            case 2: return styles.rank2;
            case 3: return styles.rank3;
            case 4: return styles.rank4;
            case 5: return styles.rank5;
            case 6: return styles.rank6;
            case 7: return styles.rank7;
        }
    }

    render(){
        return (
            <div>
                {this.state.champMastery.length > 0 ?
                    <div className={styles.masteryContainer}>
                        <div className={this.determineBorder(0)}>
                            <img src={assetRequire('./ChampionImages/' + this.state.champMastery[0].championId + '.png')} className={styles.masteryImage}/>
                        </div>
                        <div className={this.determineBorder(1)}>
                            <img src={assetRequire('./ChampionImages/' + this.state.champMastery[1].championId + '.png')} className={styles.masteryImage}/>
                        </div>
                        <div className={this.determineBorder(2)}>
                            <img src={assetRequire('./ChampionImages/' + this.state.champMastery[2].championId + '.png')} className={styles.masteryImage}/>
                        </div>
                    </div>
                    : null}
            </div>
        );
    }
}