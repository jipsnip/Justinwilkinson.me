import React, {Component} from 'react';
import axios from 'axios';
import LookupContainer from '../../General/LookupContainer';
import style from '../../../Stylesheets/General/Wrapper.css';
import bodyStyles from '../../../Stylesheets/Main/Runescape.css';
import CalculatorTableContainer from "./CalculatorTableContainer";

/**
* Still need to do:
* Add more skills
* Bug Fix: When changing from XP to level make sure the xp and level are reset back within range of 120
**/

export default class CalculatorWrapper extends Component {

    constructor(props){
        super(props);
        this.state = {
            rsn: 'Fat Albert',
            skill: 'Cooking',
            currentXp: 0,
            goalXp: 0,
            currentLevel: 0,
            goalLevel: 0,
            mode: 'exp',
            stats: null,
            items: [],
            sortMode: 'Increasing',
            sortType: 'level',
            emptyInput: true,
            xpPositive: true,
            numberInBounds: true,
            urn: false,
            portable: false,
            outfit: 0,
            avatar: 0,
            totalBonus: 0,
            error: null
        };

        this.handleRSNChange = this.handleRSNChange.bind(this);
        this.handleSkillChange = this.handleSkillChange.bind(this);
        this.handleLookup = this.handleLookup.bind(this);
        this.handleCurrentChange = this.handleCurrentChange.bind(this);
        this.handleGoalChange = this.handleGoalChange.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleBonusXp = this.handleBonusXp.bind(this);
    }


    handleRSNChange(e){
        this.setState({
            rsn:  e
        });
    }

    /**
     * Resets all the bonus/sort states and queries the new items from the database
     * @param e - clicking on a skill button
     */
    handleSkillChange(e) {
        if(!(e === this.state.skill)){
            this.setState({
               skill: e
            });
            if(this.state.stats !== null){
                this.setState({
                   currentXp: this.state.stats[e.toLowerCase()].exp,
                   goalXp: this.calculateXPFromLevel(this.calculateLevelFromXP(this.state.stats[e.toLowerCase()].exp) + 1),
                    currentLevel: this.calculateLevelFromXP(this.state.stats[e.toLowerCase()].exp),
                    goalLevel: this.calculateLevelFromXP(this.state.stats[e.toLowerCase()].exp) + 1
                });
            }
            const self = this;
            axios.get('/items/table?skill=' + e)
                .then(function(items){
                    document.body.className = bodyStyles.expandedRunescapeComponent;
                    /*if(items.data.length >= 16){
                        document.body.className = bodyStyles.runescapeComponent;
                    }
                    else{
                        document.body.className = bodyStyles.expandedRunescapeComponent;
                    }*/
                    self.setState({
                        items: items.data,
                        urn: false,
                        portable: false,
                        avatar: 0,
                        outfit: 0,
                        totalBonus: 0,
                        sortMode: 'Increasing',
                        sortType: 'level'
                    });
                });
        }
    }

    /**
     * Changes from exp to level and updates the current and goal xp
     * @param e - clicking on a mode radio button
     */
    handleModeChange(e) {
        if (!(this.state.mode === e.target.value)) {
            this.setState({
               mode: this.state.mode === 'level' ? 'exp' : 'level'
            });
            if(e.target.value === 'exp'){
                this.setState({
                   currentXp: this.state.stats !== null ? this.state.stats[this.state.skill.toLowerCase()].exp : this.calculateXPFromLevel(this.state.currentLevel),
                   goalXp: this.calculateXPFromLevel(this.state.goalLevel)
                });
            }
        }
    }

    /**
     * Changing the sort type and direction
     * @param e - clicking on a direction for sorting
     */
    handleSort(e){
        if(e.target.type === 'Profit') {
            if (this.state.sortType === 'Profit') {
                if (e.target.name === this.state.sortMode) {
                    this.setState({
                        sortMode: 'Increasing',
                        sortType: 'level'
                    });
                }
                else {
                    this.setState({
                        sortMode: this.state.sortMode === 'Increasing' ? 'Decreasing' : 'Increasing'
                    });
                }
            }
            else {
                this.setState({
                    sortType: 'Profit',
                    sortMode: e.target.name
                });
            }
        }
        else if(e.target.type === 'Units') {
            if(this.state.sortType === 'Units'){
                if(e.target.name === this.state.sortMode){
                    this.setState({
                        sortType: 'level',
                        sortMode: 'Increasing'
                    });
                }
                else{
                    this.setState({
                       sortMode: this.state.sortMode === 'Increasing' ? 'Decreasing' : 'Increasing'
                    });
                }
            }
            else{
                this.setState({
                   sortType: 'Units',
                   sortMode: e.target.name
                });
            }
        }
        else if(e.target.type === 'exp'){
            if(this.state.sortType === 'exp'){
                if(e.target.name === this.state.sortMode){
                    this.setState({
                       sortType: 'level',
                       sortMode: 'Increasing'
                    });
                }
                else{
                    this.setState({
                       sortMode: this.state.sortMode === 'Increasing' ? 'Decreasing' : 'Increasing'
                    });
                }
            }
            else{
                this.setState({
                   sortType: 'exp',
                   sortMode: e.target.name
                });
            }
        }
        else{
            if(this.state.sortType === 'level'){
                if(e.target.name === 'Decreasing'){
                    this.setState({
                        sortMode: this.state.sortMode === 'Decreasing' ? 'Increasing' : 'Decreasing'
                    });
                }
                else{
                    this.setState({
                       sortMode: 'Increasing'
                    });
                }
            }
            else{
                this.setState({
                   sortType: 'level',
                   sortMode: e.target.name
                });
            }
        }
    }

    handleLookup(){
        var self = this;
        axios.get('/player/stats/db?user=' + this.state.rsn.toLowerCase() + '&type=normal')
            .then(function(data) {
                if(data.data.length > 0) {
                    self.setState({
                        stats: data.data[0],
                        currentXp: data.data[0][self.state.skill.toLowerCase()].exp,
                        goalXp: self.calculateXPFromLevel(self.calculateLevelFromXP(data.data[0][self.state.skill.toLowerCase()].exp) + 1),
                        currentLevel: self.calculateLevelFromXP(data.data[0][self.state.skill.toLowerCase()].exp),
                        goalLevel: self.calculateLevelFromXP(data.data[0][self.state.skill.toLowerCase()].exp) + 1,
                        emptyInput: true,
                        numberInBounds: true,
                        xpPositive: true,
                        error: null
                    });
                }
                else{
                    axios.get('/highscores/user/add?rsn=' + self.state.rsn.toLowerCase() + '&type=normal')
                        .then(function(newUser){
                            self.setState({
                                stats: newUser.data,
                                currentXp: newUser.data[self.state.skill.toLowerCase()].exp,
                                goalXp: self.calculateXPFromLevel(self.calculateLevelFromXP(newUser.data[self.state.skill.toLowerCase()].exp) + 1),
                                currentLevel: self.calculateLevelFromXP(newUser.data[self.state.skill.toLowerCase()].exp),
                                goalLevel: self.calculateLevelFromXP(newUser.data[self.state.skill.toLowerCase()].exp) + 1,
                                error: null
                            });
                        })
                        .catch(function(error){
                           console.log(error);
                           self.setState({
                               error: 'User ' + self.state.rsn + ' does not exist.'
                           });
                        });
                }
            })
            .catch(function(error){
                console.log(error);
            });
    }

    handleCurrentChange(e){
        //Make sure the value does not start with a 0
        if(e.target.value[0] === '0'){
            e.target.value = e.target.value.substring(1, e.target.value.length);
        }
        //If they don't have anything in the input then dont update the TableRow values
        if(e.target.value === ''){
            this.setState({
                currentXp: '',
                currentLevel: '',
                emptyInput: false
            });
        }
        if(!this.state.emptyInput && e.target.value !== ''){
            this.setState({
                emptyInput: true
            });
        }
        //Validating input is a numeric character
        if(e.target.value[e.target.value.length - 1] >= 0 && e.target.value[e.target.value.length - 1] <= 9) {
            this.setState({
                currentXp: this.state.mode === 'exp' ? e.target.value : this.calculateXPFromLevel(e.target.value),
                currentLevel: this.state.mode === 'exp' ? this.calculateLevelFromXP(e.target.value) : e.target.value
            });
        }

        //Making sure all xp inputs are below 200m and level is under 120
        if(this.state.mode === 'exp'){
            if(this.state.numberInBounds === true && parseInt(e.target.value) >= 200000000){
                this.setState({
                    numberInBounds: false
                });
            }
            else if(this.state.numberInBounds === false && parseInt(e.target.value) < 200000000){
                this.setState({
                   numberInBounds: true
                });
            }

            if(this.state.xpPositive === true && parseInt(e.target.value) > this.state.goalXp){
                this.setState({
                    xpPositive: false
                });
            }
            else if(this.state.xpPositive === false && parseInt(e.target.value) <= this.state.goalXp){
                this.setState({
                    xpPositive: true
                });
            }
        }
        else{
            if(this.state.numberInBounds === true && parseInt(e.target.value) >= 120){
                this.setState({
                   numberInBounds: false
                });
            }
            else if(this.state.numberInBounds === false && parseInt(e.target.value) < 120){
                this.setState({
                    numberInBounds: true
                });
            }

            if(this.state.xpPositive === true && parseInt(e.target.value) > this.state.goalLevel){
                this.setState({
                    xpPositive: false
                });
            }
            else if(this.state.xpPositive === false && parseInt(e.target.value) <= this.state.goalLevel){
                this.setState({
                    xpPositive: true
                });
            }
        }
    }

    handleGoalChange(e){
        if(e.target.value[0] === '0'){
            e.target.value = e.target.value.substring(1, e.target.value.length);
        }
        if(e.target.value === ''){
            this.setState({
               goalXp: '',
               goalLevel: '',
                emptyInput: false
            });
        }
        if(!this.state.emptyInput && e.target.value !== ''){
            this.setState({
               emptyInput: true
            });
        }

        if(e.target.value[e.target.value.length - 1] >= 0 && e.target.value[e.target.value.length - 1] <= 9) {
            this.setState({
                goalXp: this.state.mode === 'exp' ? e.target.value : this.calculateXPFromLevel(e.target.value),
                goalLevel: this.state.mode === 'exp' ? this.calculateLevelFromXP(e.target.value) : e.target.value
            });
        }
        if(this.state.mode === 'exp'){
            if(this.state.numberInBounds === true && parseInt(e.target.value) > 200000000){
                this.setState({
                    numberInBounds: false
                });
            }
            else if(this.state.numberInBounds === false && parseInt(e.target.value) <= 200000000){
                this.setState({
                    numberInBounds: true
                });
            }

            if(parseInt(e.target.value) < this.state.currentXp){
                this.setState({
                    xpPositive: false
                });
            }
            else if(this.state.xpPositive === false && parseInt(e.target.value) >= this.state.currentXp){
                this.setState({
                    xpPositive: true
                });
            }
        }
        else{
            if(this.state.numberInBounds === true && parseInt(e.target.value) > 120){
                this.setState({
                    numberInBounds: false
                });
            }
            else if(this.state.numberInBounds === false && parseInt(e.target.value) <= 120){
                this.setState({
                    numberInBounds: true
                });
            }

            if(parseInt(e.target.value) < this.state.currentLevel){
                this.setState({
                    xpPositive: false
                });
            }
            else if(this.state.xpPositive === false && parseInt(e.target.value) >= this.state.currentLevel){
                this.setState({
                    xpPositive: true
                });
            }
        }
    }

    handleInputBlur(e){
        if(e.target.value === ''){
            if(e.target.name === 'current'){
                this.setState({
                   currentXp: 1,
                   currentLevel: 1,
                    emptyInput: true
                });
                if(this.state.mode === 'Level'){
                    this.setState({
                       xpPositive: this.state.goalLevel >= 1
                    });
                }
                else{
                    this.setState({
                        xpPositive: this.state.goalXp >= 1
                    });
                }
            }
            else{
                this.setState({
                   goalXp: 1,
                   goalLevel: 1,
                    emptyInput: true
                });
                if(this.state.mode === 'Level'){
                    this.setState({
                       xpPositive: this.state.currentLevel <= 1
                    });
                }
                else{
                    this.setState({
                       xpPositive: this.state.currentXp <= 1
                    });
                }
            }
        }
    }

    calculateLevelFromXP(xp){
            var currentXP = 0;
            for(var level = 1; currentXP < xp; level++){
                currentXP += .25 * (Math.floor(level + 300 * Math.pow(2, level/7)));
            }
            return level - 1 <= 120 ? level - 1 : 120;
    }

    calculateXPFromLevel(currentLevel){
            var currentXP = 0;
            for(var level = 1; level < currentLevel; level++){
                currentXP += Math.floor(level + 300 * Math.pow(2, level/7));
            }
            currentXP = Math.floor(currentXP/4);
            return currentXP === 0 ? 1 : currentXP;
        };

    handleBonusXp(e){

        var value = parseInt(e.target.value);
        var name = e.target.name;

        switch(name){
            case 'avatar':
                this.setState({
                    totalBonus: (this.state.totalBonus - this.state.avatar) + value,
                    avatar: value
                });
                break;
            case 'outfit':
                this.setState({
                    totalBonus:  (this.state.totalBonus - this.state.outfit) + value,
                    outfit: value
                });
                break;
            case 'urn':
                if(this.state.urn === true) {
                    this.setState({
                        totalBonus: (this.state.totalBonus - value),
                        urn: false
                    });
                }
                else {
                    this.setState({
                        totalBonus: (this.state.totalBonus + value),
                        urn: true
                    });
                }
                break;
            case 'portable':
                if(this.state.portable === true) {
                    this.setState({
                        totalBonus: (this.state.totalBonus - value),
                        portable: false
                    });
                }
                else {
                    this.setState({
                        totalBonus: (this.state.totalBonus + value),
                        portable: true
                    });
                }
                break;
        }
    }


    componentDidMount(){
        const self = this;
        axios.get('/items/table?skill=' + this.state.skill)
            .then(function(items){
                self.setState({
                    items: items.data
                });
            });
        this.handleLookup();
    }

    render(){
        return (
                <div className={style.generalWrapper}>
                    <LookupContainer onInputChange={this.handleRSNChange} skillChange={this.handleSkillChange} skills={skills} skillIcons={true} value={this.state.rsn}
                                       skill={this.state.skill} onClick={this.handleLookup} site={'General'} error={this.state.error}/>
                    <CalculatorTableContainer currentXp={this.state.currentXp} goalXp={this.state.goalXp} skill={this.state.skill}
                                                items={this.state.items} handleCurrent={this.handleCurrentChange} handleGoal={this.handleGoalChange}
                                                handleMode={this.handleModeChange} xpPositive={this.state.xpPositive} numberInBounds={this.state.numberInBounds}
                                                mode={this.state.mode} currentLevel={this.state.currentLevel} goalLevel={this.state.goalLevel}
                                                emptyInput={this.state.emptyInput} handleBlur={this.handleInputBlur} handleSort={this.handleSort}
                                                sortMode={this.state.sortMode} sortType={this.state.sortType} urn={this.state.urn} avatar={this.state.avatar}
                                                portable={this.state.portable} outfit={this.state.outfit} totalBonus={this.state.totalBonus} handleBonusXp={this.handleBonusXp}/>
                </div>
        );
    }
}

const skills = [
  'Fletching',
  'Cooking',
    'Smithing',
    'Crafting'
];