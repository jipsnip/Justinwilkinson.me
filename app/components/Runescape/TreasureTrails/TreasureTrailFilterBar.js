import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/TreasureTrails.css';

export default class TreasureTrailFilterBar extends Component {

    constructor(props){
        super(props);
        this.populateFilters = this.populateFilters.bind(this);
    }

    populateFilters(){
        if(this.props.filterType === 'Coordinate'){
            return (
              <div>
                  <select name="Coordinate" value={this.props.value} onChange={this.props.onFilter}>
                      <option value="all">all</option>
                      <option value="00">00</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                  </select>
              </div>
            );
        }
        else if(this.props.filterType === 'Anagram'){
            return (
                <div>
                    <select name="Anagram" value={this.props.value} onChange={this.props.onFilter}>
                        <option value="all">all</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="N">N</option>
                        <option value="O">O</option>
                        <option value="P">P</option>
                        <option value="R">R</option>
                        <option value="S">S</option>
                        <option value="T">T</option>
                        <option value="U">U</option>
                        <option value="W">W</option>
                    </select>
                </div>
            );
        }
        else if(this.props.filterType === 'Cryptic'){
            return (
                <div>
                    <select name="Cryptic" value={this.props.value} onChange={this.props.onFilter}>
                        <option value="all">all</option>
                        <option value="#">#</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                        <option value="M">M</option>
                        <option value="N">N</option>
                        <option value="O">O</option>
                        <option value="P">P</option>
                        <option value="R">R</option>
                        <option value="S">S</option>
                        <option value="T">T</option>
                        <option value="W">W</option>
                        <option value="Y">Y</option>
                    </select>
                </div>
            );
        }
        else if(this.props.filterType === 'Rewards'){
            return (
                <div>
                    <select name="Cryptic" value={this.props.value} onChange={this.props.onFilter}>
                        <option value="all">all</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>
            );
        }
    }

    render(){
        return (
            <div className={styles.filterBar}>
                {this.populateFilters()}
            </div>
        );
    }
}