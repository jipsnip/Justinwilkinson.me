import React, {Component} from 'react';
import styles from '../../Stylesheets/League/LeagueTextInput.css';
import Cookies from 'universal-cookie';
const assetRequire = require.context('../../images/League/', true, /\.(jpg|png)/);
const cookies = new Cookies();

export default class LeagueTextInput extends Component{

    constructor(props){
        super(props);
        this.state = {
            focused: false,
            hovered: false
        };

        this.handlePreferred = this.handlePreferred.bind(this);
        this.handleHovered = this.handleHovered.bind(this);
        this.handleFocusChange = this.handleFocusChange.bind(this);
        this.mapRecommendations = this.mapRecommendations.bind(this);
    }

    mapRecommendations(){
        var self = this;
        return this.props.recommendations.map(function(v, i){
            return (
                <div key={i} className={styles.recommendation} onClick={self.props.handleRecommended.bind(this, v, self.nameInput)}>
                    <span className={styles.enteredText}>
                        {v.substr(0, self.props.summoner.length)}
                    </span>
                    <span className={styles.suggestedText}>
                        {v.substr(self.props.summoner.length, v.length)}
                    </span>
                    <div className={styles.rightContainer}>
                    <span className={styles.preferContainer} onClick={self.handlePreferred.bind(this, v)}>
                        <img src={cookies.get('prefSummoner', {path: '/'}) === v ? assetRequire('./GoldStar.png') : assetRequire('./WhiteStar.png')}/>
                    </span>
                    <span className={styles.removeText} onClick={self.props.removeOption.bind(this, v, self.nameInput)}>
                        Remove
                    </span>
                    </div>
                </div>
            );
        });
    }

    handleFocusChange(){
        this.setState({
            focused: !this.state.focused
        });
    }

    handleHovered(){
        this.setState({
            hovered: !this.state.hovered
        });
    }

    handlePreferred(e) {
        if (cookies.get('prefSummoner') === e) {
            cookies.set('prefSummoner', '', {path: '/'})
        }
        else {
            cookies.set('prefSummoner', e, {path: '/'});
        }
        window.event.stopPropagation();
        this.nameInput.focus();
        this.forceUpdate();
    }

    render(){
        return(
          <div className={styles.inputContainer}>
                <div className={styles.inputDiv}>
                  <input type="text" placeholder="Summoner Name" value={this.props.summoner} onChange={this.props.textChange} onKeyPress={this.props.enterKey} onFocus={this.handleFocusChange}
                         onBlur={this.handleFocusChange} ref={(input) => { this.nameInput = input;}}/>
                  <button onClick={this.props.buttonClicked}>Lookup</button>
                    <div className={(this.state.focused || this.state.hovered) && this.props.recommendations.length > 0 ? styles.recommendationDiv : null} onMouseEnter={this.handleHovered} onMouseLeave={this.handleHovered}>
                        {this.state.focused || this.state.hovered ? this.mapRecommendations() : null}
                    </div>
                  </div>
                  <div className={styles.errorMessage}>{this.props.error}</div>
                  <ul className={styles.regionList}>
                      <li className={[styles.leftmostRegion, this.props.region === 'NA' ? styles.activeRegion : styles.region].join(' ')} onClick={this.props.regionClicked.bind(this, 'NA')}>NA</li>
                      <li className={this.props.region === 'EUW' ? styles.activeRegion : styles.region} onClick={this.props.regionClicked.bind(this, 'EUW')}>EUW</li>
                      <li className={this.props.region === 'EUNE' ? styles.activeRegion : styles.region} onClick={this.props.regionClicked.bind(this, 'EUNE')}>EUNE</li>
                      <li className={this.props.region === 'BR' ? styles.activeRegion : styles.region} onClick={this.props.regionClicked.bind(this, 'BR')}>BR</li>
                      <li className={this.props.region === 'TR' ? styles.activeRegion : styles.region} onClick={this.props.regionClicked.bind(this, 'TR')}>TR</li>
                      <li className={this.props.region === 'LAS' ? styles.activeRegion : styles.region} onClick={this.props.regionClicked.bind(this, 'LAS')}>LAS</li>
                      <li className={this.props.region === 'JP' ? styles.activeRegion : styles.region} onClick={this.props.regionClicked.bind(this, 'JP')}>JP</li>
                      <li className={[styles.rightmostRegion, this.props.region === 'KR' ? styles.activeRegion : styles.region].join(' ')} onClick={this.props.regionClicked.bind(this, 'KR')}>KR</li>
                  </ul>
          </div>
        );
    }
}