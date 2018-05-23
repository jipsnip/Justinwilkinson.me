import React, {Component} from 'react';
import axios from 'axios';
import bodyStyles from '../../../Stylesheets/Main/Runescape.css';
import styles from '../../../Stylesheets/Runescape/TreasureTrails.css';
import TreasureTrailMainButton from './TreasureTrailMainButton';
import TreasureTrailFilterBar from './TreasureTrailFilterBar';
import TreasureTrailAnagramLabel from './TreasureTrailAnagramLabel';
import TreasureTrailAnagramContainer from './TreasureTrailAnagramContainer';

export default class TreasureTrailAnagrams extends Component {

    constructor(props){
        super(props);
        this.state = {
            anagrams: [],
            filter: 'all'
        };

        this.mapAnagramContainers = this.mapAnagramContainers.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    componentWillMount(){
        document.body.className = bodyStyles.runescapeComponent;
    }

    mapAnagramContainers(){
        var self = this;
        var current = this.state.filter === 'all' ? 'A' : this.state.filter;
        var anagrams = this.state.anagrams.map(function(v, i){
            if(self.state.filter === 'all'){
                if(self.state.anagrams[i].anagramsearchkey !== current || i === 0){
                    current = self.state.anagrams[i].anagramsearchkey;
                    return (
                        <div key={current} className={styles.anagramLabelContainer}>
                            <TreasureTrailAnagramLabel key={current} label={v.anagramsearchkey}/>
                            <TreasureTrailAnagramContainer key={i} anagram={v}/>
                        </div>
                    );
                }
                else{
                    return (
                        <div className={styles.anagramContainer} key={i}>
                            <TreasureTrailAnagramContainer key={i} anagram={v}/>
                        </div>
                    );
                }
            }
            else {
                if (self.state.filter === v.anagramsearchkey) {
                    if (current === v.anagramsearchkey) {
                        current = null;
                        return (
                            <div key={self.state.filter} className={styles.anagramLabelContainer}>
                                <TreasureTrailAnagramLabel key={v.anagramsearchkey} label={v.anagramsearchkey}/>
                                <TreasureTrailAnagramContainer key={i} anagram={v}/>
                            </div>
                        );
                    }
                    else {
                        return (
                            <div className={styles.anagramContainer} key={i}>
                                <TreasureTrailAnagramContainer key={i} anagram={v}/>
                            </div>
                        );
                    }
                }
                else{
                    return null;
                }
            }
        });
       anagrams = anagrams.filter((n) => {return n !== null});
       document.body.className = bodyStyles.runescapeComponent;
        /*if(anagrams.length <= 4){
            document.body.className = bodyStyles.expandedRunescapeComponent;
        }
        else{
            document.body.className = bodyStyles.runescapeComponent;
        }*/
        return anagrams;
    }

    handleFilter(e){
        this.setState({
           filter: e.target.value
        });
    }

    componentDidMount(){
        var self = this;
        axios.get('/treasuretrail/anagrams')
            .then(function(anagrams){
               self.setState({
                  anagrams: anagrams.data
               });
            });
    }

    render(){
            return (
                    <div className={styles.infoContainer}>
                        <TreasureTrailFilterBar filterType={'Anagram'} value={this.state.filter} onFilter={this.handleFilter}/>
                        {this.mapAnagramContainers()}
                    </div>
            );
    }

}