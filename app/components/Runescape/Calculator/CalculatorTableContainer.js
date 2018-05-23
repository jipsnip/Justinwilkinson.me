import React, {Component} from 'react';
import CalculatorTableRows from './CalculatorTableRows';
import CalculatorXPContainer from './CalculatorXPContainer';
import styles from '../../../Stylesheets/Runescape/CalculatorRows.css';

export default class CalculatorTableContainer extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
          <div className={styles.calculatorTableContainer}>
              <CalculatorXPContainer currentXp={this.props.currentXp} goalXp={this.props.goalXp} handleCurrent={this.props.handleCurrent}
                                     handleGoal={this.props.handleGoal} skill={this.props.skill} handleMode={this.props.handleMode}
                                     handleXp={this.props.handleBonusXp} urn={this.props.urn} avatar={this.props.avatar} outfit={this.props.outfit}
                                     portable={this.props.portable} xpPositive={this.props.xpPositive} numberInBounds={this.props.numberInBounds}
                                     mode={this.props.mode} currentLevel={this.props.currentLevel} goalLevel={this.props.goalLevel} handleBlur={this.props.handleBlur}/>
              <CalculatorTableRows items={this.props.items} xpPositive={this.props.xpPositive} currentXp={this.props.currentXp} goalXp={this.props.goalXp}
                                    bonusXp={this.props.totalBonus} numberInBounds={this.props.numberInBounds} emptyInput={this.props.emptyInput}
                                    handleSort={this.props.handleSort} sortType={this.props.sortType} sortMode={this.props.sortMode} currentLevel={this.props.currentLevel}/>
          </div>
        );
    }

}