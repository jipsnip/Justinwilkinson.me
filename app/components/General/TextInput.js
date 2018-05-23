import React, {Component} from 'react';
import styles from '../../Stylesheets/General/TextInput.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

var assetRequire = require.context('../../images/', true, /\.(jpg|png)/);

export default class TextInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            focused: false,
            hovered: false,
            recommendations: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleHovered = this.handleHovered.bind(this);
        this.handleFocused = this.handleFocused.bind(this);
        this.handleLookup = this.handleLookup.bind(this);
        this.handleRemoval = this.handleRemoval.bind(this);
        this.handlePreferred = this.handlePreferred.bind(this);
        this.handleRecommended = this.handleRecommended.bind(this);
        this.handleUserClicked = this.handleUserClicked.bind(this);
    }

    componentWillMount(){
        this.handleRecommended(this.props.value);
    }

    handleChange(e){
        this.props.onInputChange(e.target.value);
        this.handleRecommended(e.target.value);
    }

    handleRecommended(value){
        var termArray = [];
        if(cookies.get('runescapeUsers', {path: '/'}) !== undefined) {
            cookies.get('runescapeUsers', {path: '/'}).forEach(function(term){
                if(term.toLowerCase().substr(0, value.length) === value.toLowerCase()){
                    termArray.push(term);
                }
            });
        }
        this.setState({
            recommendations: termArray
        });
    }

    handleHovered(){
        this.setState({
            hovered: !this.state.hovered
        });
    }

    handleFocused(){
        this.setState({
            focused: !this.state.focused
        });
    }

    handleRemoval(e){
            let d = new Date();
            d.setTime(d.getTime() + (365*24*60*60*1000));
            var cook = cookies.get('runescapeUsers', {path: '/'});
            cook.splice(cookies.get('runescapeUsers', {path: '/'}).indexOf(e), 1);
            cookies.set('runescapeUsers', cook, {path: '/', expires: d});
            this.setState({
                recommendations: cook
            });
            this.nameInput.focus();
            this.forceUpdate();
        }

    handlePreferred(e){
        if (cookies.get('prefRSN') === e) {
            cookies.set('prefRSN', '', {path: '/'})
        }
        else {
            cookies.set('prefRSN', e, {path: '/'});
        }
        window.event.stopPropagation();
        this.nameInput.focus();
        this.forceUpdate();
    }

    determineClass(value){
        if(value === 'input') {
            return this.props.site === 'Runescape' ? styles.runescapeTextInput : styles.generalTextInput;
        }
        else if(value === 'recommendations'){
            return this.props.site === 'Runescape' ? styles.recommendationDiv : styles.calculatorDiv;
        }
    }

    handleUserClicked(e, target){
        if(target.target.nodeName !== 'IMG' && target.target.nodeName !== 'SPAN') {
            this.nameInput.focus();
            this.props.onInputChange(e);
            this.handleRecommended(e);
        }
    }

    handleClick(){
        this.handleLookup();
        this.props.onClick();
    }

    handleLookup(){
        if(cookies.get('runescapeUsers') === undefined){
            let d = new Date();
            d.setTime(d.getTime() + (365*24*60*60*1000));
            var arr = [this.props.value.toLowerCase()];
            cookies.set('runescapeUsers', arr, {path: '/', expires: d});
        }
        else if(cookies.get('runescapeUsers', {path: '/'}).join(',').toLowerCase().split(',').indexOf(this.props.value.toLowerCase()) < 0) {
            let d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
            var cook = cookies.get('runescapeUsers');
            cook.push(this.props.value.toLowerCase());
            cookies.set('runescapeUsers', cook, {path: '/', expires: d});
        }
    }

    mapRecommendations(){
        var self = this;
        return this.state.recommendations.map(function(v, i){
            return (
                <div key={i} className={styles.recommendation} onClick={self.handleUserClicked.bind(this, v)}>
                    <div className={self.props.site === 'Runescape' ? styles.enteredText : styles.calculatorEnteredText}>
                        {v.substr(0, self.props.value.length)}
                    </div>
                    <div className={styles.suggestedText}>
                        {v.substr(self.props.value.length, v.length)}
                    </div>
                    <div className={styles.rightContainer}>
                    <span className={styles.preferContainer} onClick={self.handlePreferred.bind(this, v)}>
                        <img src={cookies.get('prefRSN', {path: '/'}) === v ? assetRequire('./BlueStar.png') : assetRequire('./WhiteStar.png')}/>
                    </span>
                        <span className={styles.removeText} onClick={self.handleRemoval.bind(this, v)}>
                        Remove
                    </span>
                    </div>
                </div>
            );
        });
    }

    render(){
        const value = this.props.value;
        return (
                <div style={{position: 'relative'}}>
                    <input type="text" value={value} placeholder="Runescape Name" className={this.determineClass('input')} onChange={this.handleChange} onFocus={this.handleFocused}
                            onBlur={this.handleFocused} ref={(input) => {this.nameInput = input;}}/>
                    <button className={this.props.site === 'Runescape' ? styles.runescapeButton : styles.genericButton} onClick={this.handleClick}>Lookup</button>
                    <div className={(this.state.focused || this.state.hovered) && this.state.recommendations.length > 0 ? this.determineClass('recommendations') : null} onMouseEnter={this.handleHovered} onMouseLeave={this.handleHovered}>
                        {(this.state.focused || this.state.hovered) && this.state.recommendations.length > 0 ? this.mapRecommendations() : null}
                    </div>
                </div>
        );
    }
}
