import React, {Component} from 'react';
import SortButton from '../../General/SortButton';
import styles from '../../../Stylesheets/Runescape/CalculatorRows.css';

export default class CalculatorTableRows extends Component {

    constructor(props){
        super(props);
        this.populateRows = this.populateRows.bind(this);
        this.calculateUnitsNeeded = this.calculateUnitsNeeded.bind(this);
        this.calculateProfit = this.calculateProfit.bind(this);
        this.calculateGpXp = this.calculateGpXp.bind(this);
    }

    populateMainRow(){
        return (
            <div className={styles.calculatorMainRow}>
                <div className={styles.nameRow}>
                    Name
                </div>
                <div className={styles.levelRow}>
                    <div>
                        Level
                    </div> <SortButton sortType={'level'} currentType={this.props.sortType} sortMode={this.props.sortMode} handleSort={this.props.handleSort}/>
                </div>
                <div className={styles.expRow}>
                    <div>
                        Exp
                    </div> <SortButton sortType={'exp'} currentType={this.props.sortType} sortMode={this.props.sortMode} handleSort={this.props.handleSort}/>
                </div>
                <div className={styles.buyRow}>
                    Buy
                </div>
                <div className={styles.sellRow}>
                    Sell
                </div>
                <div className={styles.costRow}>
                    Cost
                </div>
                <div className={styles.gpxpRow}>
                    gp/xp
                </div>
                <div className={styles.profitRow}>
                    <div>
                        Profit
                    </div> <SortButton sortType={'Profit'} currentType={this.props.sortType} sortMode={this.props.sortMode} handleSort={this.props.handleSort}/>
                </div>
                <div className={styles.mobileProfitRow}>
                    <div>
                        Profit
                    </div> <SortButton sortType={'Profit'} currentType={this.props.sortType} sortMode={this.props.sortMode} handleSort={this.props.handleSort}/>
                </div>
                <div className={styles.unitsRow}>
                    <div>
                        Units
                    </div> <SortButton sortType={'Units'} currentType={this.props.sortType} sortMode={this.props.sortMode} handleSort={this.props.handleSort}/>
                </div>
            </div>
        )
    }

    populateRows(){
        const self = this;
        if(this.props.items.length > 0) {
            var items = this.props.items;
            if(this.props.sortType !== null){
                items = this.sortItems(items);
            }
            return items.map(function (item) {
                return (
                    <div key={item.name} className={self.props.currentLevel < item.level ? styles.grayedOutItem : styles.itemRow}>
                        <div className={styles.nameRow}>
                            {item.name}
                        </div>
                        <div className={styles.levelRow}>
                            {item.level}
                        </div>
                        <div className={styles.expRow}>
                            {item.xp}
                        </div>
                        <div className={styles.buyRow}>
                            {item.buy === null ? '0' : item.buy}
                        </div>
                        <div className={styles.sellRow}>
                            {item.sell === null ? '0' : item.sell}
                        </div>
                        <div className={styles.costRow}>
                            {
                                item.cost === null ?
                                <span className={styles.blueNumber}>
                                    0
                                </span>
                                    :
                                <span className={item.cost >= 0 ? styles.greenNumber : styles.redNumber}>
                                    {item.cost === null ? '0' : item.cost}
                                </span>
                            }
                        </div>
                        <div className={styles.gpxpRow}>
                            {self.calculateGpXp(item.cost, item.xp)}
                        </div>
                        <div className={styles.profitRow}>
                            {self.calculateProfit(item.cost, item.xp)}
                        </div>
                        <div className={styles.mobileProfitRow}>
                            {self.calculateProfit(item.cost, item.xp, 'mobile')}
                        </div>
                        <div className={styles.unitsRow}>
                            {self.calculateUnitsNeeded(item.xp)}
                        </div>
                    </div>
                );
            });
        }
        return null;
    }

    sortItems(items){
        if(this.props.sortType === 'Profit'){
            if(this.props.sortMode === 'Increasing'){
                return items.sort((item1, item2) => {
                   if(item1.cost/item1.xp > item2.cost/item2.xp){
                       return 1;
                   }
                   else if(item1.cost/item1.xp === item2.cost/item2.xp){
                       return 0;
                   }
                   else{
                       return -1;
                   }
                });
            }
            else{
                return items.sort((item1, item2) => {
                    if(item1.cost/item1.xp < item2.cost/item2.xp){
                        return 1;
                    }
                    else if(item1.cost/item1.xp === item2.cost/item2.xp){
                        return 0;
                    }
                    else{
                        return -1;
                    }
                });
            }
        }
        else if(this.props.sortType === 'Units') {
            if(this.props.sortMode === 'Increasing'){
                return items.sort((item1, item2) => {
                   if(item1.xp > item2.xp){
                       return 1;
                   }
                   else if(item1.xp === item2.xp){
                       return 0;
                   }
                   else{
                       return -1;
                   }
                });
            }
            else{
                return items.sort((item1, item2) => {
                    if(item1.xp < item2.xp){
                        return 1;
                    }
                    else if(item1.xp === item2.xp){
                        return 0;
                    }
                    else{
                        return -1;
                    }
                });
            }
        }
        else if(this.props.sortType === 'exp'){
            if(this.props.sortMode === 'Increasing'){
                return items.sort((item1, item2) => {
                   if(item1.xp > item2.xp){
                       return 1;
                   }
                   else if(item1.xp === item2.xp){
                       return 0;
                   }
                   else{
                       return -1;
                   }
                });
            }
            else{
                return items.sort((item1, item2) => {
                   if(item1.xp < item2.xp){
                       return 1;
                   }
                   else if(item1.xp === item2.xp){
                       return 0;
                   }
                   else{
                       return -1;
                   }
                });
            }
        }
        else{
            if(this.props.sortMode === 'Increasing'){
                return items.sort((item1, item2) => {
                   if(item1.level > item2.level){
                       return 1;
                   }
                   else if(item1.level === item2.level){
                       return 0;
                   }
                   else{
                       return -1;
                   }
                });
            }
            else{
                return items.sort((item1, item2) => {
                    if(item1.level < item2.level){
                        return 1;
                    }
                    else if(item1.level === item2.level){
                        return 0;
                    }
                    else{
                        return -1;
                    }
                });
            }
        }
    }

    calculateUnitsNeeded(itemXp){
        if(this.props.goalXp !== 0) {
            return Math.ceil((this.props.goalXp - this.props.currentXp) / (itemXp * (1 + this.props.bonusXp/100))).toLocaleString();
        }
        return 0;
    }

    calculateProfit(cost, xp, type){
        if(this.props.goalXp !== 0) {
            if(type !== 'mobile') {
                let profit = (+(Math.round((cost * Math.ceil((this.props.goalXp - this.props.currentXp) / (xp * (1 + this.props.bonusXp / 100)))) + 'e+2') + 'e-2'));
                if (profit < 0 || profit > 0) {
                    return (
                        <span className={cost > 0 ? styles.greenNumber : styles.redNumber}>
                        {profit.toLocaleString()}
                    </span>
                    );
                }
                else {
                    return (
                        <span className={styles.blueNumber}>
                      {profit.toLocaleString()}
                  </span>
                    );
                }
            }
            else{
                let profit = (+(Math.round((cost * Math.ceil((this.props.goalXp - this.props.currentXp) / (xp * (1 + this.props.bonusXp / 100)))) + 'e+2') + 'e-2'));
                if (profit < 0 || profit > 0) {
                    if(profit / 1000000000 <= -1 || profit / 1000000000 >= 1){
                        profit = (profit / 1000000000).toFixed(2) + 'b';
                    }
                    else if(profit / 1000000 <= -1 || profit / 1000000 >= 1){
                        profit = (profit / 1000000).toFixed(2) + 'm';
                    }
                    else if(profit / 1000 <= -1 || profit / 1000 >= 1){
                        profit = (profit / 1000).toFixed(2) + 'k';
                    }
                    return (
                        <span className={cost > 0 ? styles.greenNumber : styles.redNumber}>
                            {profit.toLocaleString()}
                        </span>
                    );
                }
                else {
                    return (
                        <span className={styles.blueNumber}>
                      {profit.toLocaleString()}
                  </span>
                    );
                }
            }
        }
        return (
            <span className={styles.blueNumber}>
                0
            </span>
        );
    }

    calculateGpXp(cost, xp){
        var enhancedXp = this.props.bonusXp === 0 ? xp : xp * (1 + (this.props.bonusXp/100));
        if(cost < 0 || cost > 0) {
            return (
                <span className={cost >= 0 ? styles.greenNumber : styles.redNumber}>
                    {+(Math.round((cost / enhancedXp) + 'e+2') + 'e-2')}
                </span>
            );
        }
        else{
            return (
              <span className={styles.blueNumber}>
                  0.00
              </span>
            );
        }
    }

    shouldComponentUpdate(nextProps){
        return (nextProps.xpPositive && nextProps.numberInBounds && nextProps.emptyInput);
    }

    render(){
        return (
            <div className={styles.calculatorTableRowsContainer}>
                {this.populateMainRow()}
                {this.populateRows()}
            </div>
        );
    }

}