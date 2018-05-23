import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/SkillButtons.css';

export default class SkillButtons extends Component {

    constructor(props){
        super(props);
        this.mapSkillButtons = this.mapSkillButtons.bind(this);
    }

    mapSkillButtons(){
        var self = this;
        return this.props.skills.map(function(skill){
            return <a key={skill} className={self.props.skill === skill ? styles.selectedSkillButton : styles.skillButton}
                      onClick={self.props.skillChange.bind(this, skill)}>
                <img src={require('../../../images/' + skill + '-icon.png')}/>
            </a>;
        });
    }

    render(){
        return (
            <div className={styles.skillButtonContainer}>
                {this.mapSkillButtons()}
            </div>
        )
    }
}