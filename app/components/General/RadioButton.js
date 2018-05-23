import React, {Component} from 'react';
import styles from '../../Stylesheets/General/RadioButton.css';


export default class RadioButton extends Component{
    constructor(props){
        super(props);
        this.generateInput = this.generateInput.bind(this);
    }

    generateInput(){
        var self = this;
        return this.props.label.map(function(v, i){
           return (
               <div className={styles.RadioDiv} key={i}>
                    <input type="radio" key={i} id={v} value={v} name="selected" defaultChecked={self.props.selected === v}/>
                    <label htmlFor={v} key={"key" + i}>{v}</label>
               </div>
           )
        });
    }


    render(){
            return (
                <form className={styles.RadioForm}>
                    {this.generateInput()}
                </form>
            )
    }

}