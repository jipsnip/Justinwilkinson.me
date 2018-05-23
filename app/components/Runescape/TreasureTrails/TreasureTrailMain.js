import React, {Component} from 'react';
import bodyStyles from '../../../Stylesheets/Main/Runescape.css';
import styles from '../../../Stylesheets/Runescape/TreasureTrails.css';

export default class TreasureTrailMain extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        document.body.className = bodyStyles.expandedRunescapeComponent;
    }

    componentDidMount(){
        document.title = 'Treasure Trail';
    }

    render(){
        return (
            <div className={styles.infoContainer}>
                <div className={styles.treasureTrailCategory}>
                    Clue Types
                </div>
                <div className={styles.treasureTrailMain}>
                    <div className={styles.treasureTrailOption} onClick={this.props.onClick.bind(this, 'Coordinate')} key={'Coordinate'}>
                        <div className={styles.treasureTrailOptionText}>
                            Coordinate
                        </div>
                    </div>
                    <div className={styles.treasureTrailOption} onClick={this.props.onClick.bind(this, 'Anagram')} key={'Anagram'}>
                        <div className={styles.treasureTrailOptionText}>
                            Anagram
                        </div>
                    </div>
                    <div className={styles.treasureTrailOption} onClick={this.props.onClick.bind(this, 'Cryptic')} key={'Cryptic'}>
                        <div className={styles.treasureTrailOptionText}>
                            Cryptic
                        </div>
                    </div>
                    {/*<div className={styles.treasureTrailOption} onClick={this.props.onClick.bind(this, 'Map')} key={'Map'}>
                        <div className={styles.treasureTrailOptionText}>
                            Map
                        </div>
                    </div>*/}
                </div>
            </div>
        );
    }
}