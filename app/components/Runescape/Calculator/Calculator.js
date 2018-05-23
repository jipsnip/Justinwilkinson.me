import React, {Component} from 'react';
import CalculatorWrapper from '../Calculator/CalculatorWrapper';
import styles from '../../../Stylesheets/Main/Runescape.css';

export default class Calculator extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        document.body.className = styles.expandedRunescapeComponent;
        document.title = 'Calculator';
    }

    componentWillUnmount(){
        document.body.style.backgroundColor = null;
    }

    render(){
        return (
            <div>
               <CalculatorWrapper/>
            </div>
        )
    }
}