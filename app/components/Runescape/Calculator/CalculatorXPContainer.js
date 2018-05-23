import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/CalculatorRows.css';

export default class CalculatorXPContainer extends Component {

    constructor(props){
        super(props);
        this.populateDecoratedUrns = this.populateDecoratedUrns.bind(this);
        this.populatePortables = this.populatePortables.bind(this);
        this.calculateLevelFromXP = this.calculateLevelFromXP.bind(this);
        this.calculateXPFromLevel = this.calculateXPFromLevel.bind(this);
    }

    calculateXPFromLevel(level){

    }

    calculateLevelFromXP(xp){

    }

    populateDecoratedUrns(){
        switch(this.props.skill.toLowerCase()){
            case 'cooking':
            case 'smithing':
            case 'divination':
            case 'farming':
            case 'fishing':
            case 'hunter':
            case 'mining':
            case 'runecrafting':
            case 'woodcutting':
                return (
                    <div>
                        Decorated Urn
                        <input type="checkbox" name="urn" value="20" checked={this.props.urn} onClick={this.props.handleXp}/>
                    </div>
                );
        }
        return null;
    }

    populatePortables(){
        switch(this.props.skill.toLowerCase()){
            case 'firemaking':
            case 'crafting':
            case 'fletching':
            case 'smithing':
            case 'herblore':
                return (
                    <div>
                        Portable
                        <input type="checkbox" name="portable" value="10" checked={this.props.portable} onClick={this.props.handleXp}/>
                    </div>
                );
            case 'cooking':
                return (
                    <div>
                        Portable
                        <input type="checkbox" name="portable" value="21" checked={this.props.portable} onChange={this.props.handleXp}/>
                    </div>
                );

        }
        return null;
    }

    render(){
        return (
            <div className={styles.calculatorXpContainer}>
                <img src={require('../../../images/' + this.props.skill + '-icon.png')} className={styles.skillImage}/>
                    <span>{this.props.skill.toUpperCase()}</span>
                <form className={styles.skillBonusForm}>
                    <div>
                        Avatar Bonus
                        <select name="avatar" value={this.props.avatar} onChange={this.props.handleXp}>
                            <option value="0">0</option>
                            <option value="3">3%</option>
                            <option value="6">6%</option>
                        </select>
                    </div>
                <div>
                    Skill Outfit Peices
                    <select name="outfit" value={this.props.outfit} onChange={this.props.handleXp}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="6">5</option>
                    </select>
                </div>
                    <div className={styles.mobileBreakpoint}/>
                    {this.populateDecoratedUrns()}
                    {this.populatePortables()}
                </form>
                    <span className={styles.XpRightContainer}>
					    <form action="">
						    XP
						    <input type="radio" name="selected" value="exp" defaultChecked="checked" onClick={this.props.handleMode}/>
						    Level
						    <input type="radio" name="selected" value="level" onClick={this.props.handleMode}/>
                            <div className={styles.mobileBreakpoint}/>
						    Current:
						    <input type="text" name="current" maxLength="9" value={this.props.mode === 'exp' ? this.props.currentXp : this.props.currentLevel} onChange={this.props.handleCurrent}
                                   className={this.props.xpPositive === true && this.props.numberInBounds ? styles.XpEntryField : styles.XpDisabledField} onBlur={this.props.handleBlur}/>
						    Goal:
						    <input type="text" name="goal" maxLength="9" value={this.props.mode === 'exp' ? this.props.goalXp : this.props.goalLevel} onChange={this.props.handleGoal}
                                   className={this.props.xpPositive === true && this.props.numberInBounds ? styles.XpEntryField : styles.XpDisabledField} onBlur={this.props.handleBlur}/>
					    </form>
				    </span>
            </div>
            );
    }

}