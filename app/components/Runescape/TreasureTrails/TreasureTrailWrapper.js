import React, {Component} from 'react';
import TreasureTrailMain from './TreasureTrailMain';
import styles from '../../../Stylesheets/General/Wrapper.css';
import TreasureTrailCoordinates from './TreasureTrailCoordinates';
import TreasureTrailAnagrams from './TreasureTrailAnagrams';
import TreasureTrailCryptics from './TreasureTrailCryptics';
import ImageCarousel from "../../General/ImageCarousel";

export default class TreasureTrailWrapper extends Component {

    constructor(props){
        super(props);
        this.state = {
            page: location.href.split('/').length === 4 ? location.href.split('/')[3] : 'Main'
        };
        this.categoryClicked = this.categoryClicked.bind(this);
    }

    categoryClicked(value, e){
        this.setState({
           page: value
        });
    }

    render(){
        return (
                <div className={styles.runescapeWrapperPadded}>
                    {this.state.page === 'Main' ? <TreasureTrailMain onClick={this.categoryClicked}/> : null}
                    {this.state.page === 'Coordinates' ? <TreasureTrailCoordinates/> : null}
                    {this.state.page === 'Anagrams' ? <TreasureTrailAnagrams/> : null}
                    {this.state.page === 'Cryptics' ? <TreasureTrailCryptics/> : null}
                </div>
        );
    }
}