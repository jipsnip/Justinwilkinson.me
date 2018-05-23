import React, {Component} from 'react';
import AdventureLogWrapper from './AdventureLogWrapper';
import styles from '../../../Stylesheets/Main/Runescape.css';

export default class AdventureLog extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        document.body.className = styles.runescapeComponent;
    }

    render(){
        return (
          <div>
              <AdventureLogWrapper/>
          </div>
        );
    }
}