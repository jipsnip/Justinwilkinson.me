import React, {Component} from 'react';
const qs = require('query-string');
import styles from '../../../Stylesheets/Main/Runescape.css';
import TreasureTrailWrapper from './TreasureTrailWrapper';

export default class TreasureTrail extends Component {

    componentWillMount(){
        document.body.className = styles.runescapeComponent;
    }

    componentWillUnmount(){
        document.body.style.backgroundColor = null;
    }

    render() {
        const query = qs.parse(this.props.location);
        return (
            <div>
                <TreasureTrailWrapper query={query}/>
            </div>
        );
    }
}