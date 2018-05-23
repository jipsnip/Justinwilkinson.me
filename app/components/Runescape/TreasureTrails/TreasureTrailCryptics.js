import React, {Component} from 'react';
import axios from 'axios';
import styles from '../../../Stylesheets/Runescape/TreasureTrails.css';
import bodyStyles from '../../../Stylesheets/Main/Runescape.css';
import TreasureTrailMainButton from "./TreasureTrailMainButton";
import TreasureTrailFilterBar from "./TreasureTrailFilterBar";
import TreasureTrailCrypticContainer from "./TreasureTrailCrypticContainer";

export default class TreasureTrailCryptics extends Component {

    constructor(props){
        super(props);
        this.state = {
          cryptics: [],
          filter: 'all'
        };

        this.mapCrypticContainers = this.mapCrypticContainers.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    mapCrypticContainers(){
        var self = this;
        var cryptics = this.state.cryptics.map(function(v, i){
            if((self.state.filter === 'all' || self.state.filter === v.crypticsearchkey) || (self.state.filter === '#' && (v.crypticsearchkey >= 0 && v.crypticsearchkey <= 9))) {
                return (
                  <TreasureTrailCrypticContainer key={i} cryptic={v}/>
                );
            }
            else{
                return null;
            }
        });
        cryptics = cryptics.filter((n) => {return n !== null});
        document.body.className = bodyStyles.runescapeComponent;
       /* if(cryptics.length === 1){
            document.body.className = bodyStyles.expandedRunescapeComponent;
        }
        else{
            document.body.className = bodyStyles.runescapeComponent;
        }*/
        return cryptics;
    }

    componentWillMount(){
        document.body.className = bodyStyles.runescapeComponent;
    }

    componentDidMount(){

        history.pushState(null, null, location.href);
        document.title = 'Cryptics';
        window.onpopstate = function(e){
            e.preventDefault();
            location.reload();
        };

        var self = this;
        axios.get('/treasuretrail/cryptics')
            .then(function(cryptics){
                self.setState({
                   cryptics: cryptics.data
                });
            });
    }

    handleFilter(e){
        this.setState({
            filter: e.target.value
        });
    }

    render(){
        return (
                <div className={styles.infoContainer}>
                    <TreasureTrailFilterBar onFilter={this.handleFilter} filterType={'Cryptic'}/>
                    {this.mapCrypticContainers()}
                </div>
        );
    }
}