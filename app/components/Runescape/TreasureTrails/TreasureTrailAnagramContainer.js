import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/TreasureTrails.css';

export default class TreasureTrailAnagramContainer extends Component {
    render(){
        return (
            <div>
                <div className={styles.anagramAnagram}>
                    {this.props.anagram.anagram}
                </div>
                <div className={styles.anagramSolution}>
                    {this.props.anagram.solution}
                </div>
                <div className={styles.anagramLocationContainer}>
                    <div className={styles.anagramLocation}>
                        {this.props.anagram.location}
                    </div>
                    <div className={styles.anagramChallenge}>
                        {
                            this.props.anagram.challenge === 'Puzzle Box' ?
                            <img src={require('../../../images/TreasureTrail/PuzzleBox.png')} className={styles.anagramImage}/> :
                            <div>{this.props.anagram.challenge}</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}