import React, {Component} from 'react';
var assetRequire = require.context('../../images/Twitch/', true, /\.(jpg|png)/);
import Cookies from 'universal-cookie';
import styles from '../../Stylesheets/Twitch/TwitchInput.css';

var cookies = new Cookies();

export default class TwitchInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            focused: false,
            hovered: false
        };
        this.mapRecommendations = this.mapRecommendations.bind(this);
        this.handleHovered = this.handleHovered.bind(this);
        this.handleFocused = this.handleFocused.bind(this);
        this.handlePreferred = this.handlePreferred.bind(this);
    }

    mapRecommendations(){
        var self = this;
            return this.props.recommendations.map(function(v, i){
                if(v.toLowerCase().substr(0, self.props.value.length) === self.props.value.toLowerCase()) {
                    return (
                        <div className={styles.recommendation} key={i} onClick={self.props.handleClicked.bind(this, v, self.nameInput)}>
                            <div className={styles.enteredText}>
                                {v.substr(0, self.props.value.length)}
                            </div>
                            <div className={styles.suggestedText}>
                                {v.substr(self.props.value.length, v.length)}
                            </div>
                            <div className={styles.rightContainer}>
                                <span className={styles.preferred} onClick={self.handlePreferred.bind(this, v)}>
                                    <img src={cookies.get('PreferredTwitchUser', {path: '/'}) === v ? assetRequire('./PurpleStar.png') : assetRequire('./PurpleStarOutline.png')}
                                         className={styles.preferredImage}/>
                                </span>
                                <span className={styles.remove} onClick={self.props.handleRemoved.bind(this, v, self.nameInput)}>
                                    &#x2716;
                                </span>
                            </div>
                        </div>
                    );
                }
                else{
                    return null;
                }
            });
    };

    handlePreferred(e) {
        let d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
        if (cookies.get('PreferredTwitchUser') === e) {
            cookies.set('PreferredTwitchUser', '', {path: '/', expires: d})
        }
        else {
            cookies.set('PreferredTwitchUser', e, {path: '/', expires: d});
        }
        this.nameInput.focus();
        this.forceUpdate();
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

    render(){
        return (
            <div className={styles.inputDiv}>
                <input type="text" placeholder="Username" spellCheck="false" className={styles.input} value={this.props.value} onChange={this.props.handleChange} onFocus={this.handleFocused}
                        onBlur={this.handleFocused} ref={(input) => {this.nameInput = input}}/>
                <button className={styles.button} onClick={this.props.handleLookup}>
                    <img src={require('../../images/Twitch/MagnifyingGlass.png')} className={styles.searchImage}/>
                </button>
                <div className={(this.state.hovered || this.state.focused) && (this.props.recommendations.length > 0) ? styles.recommendationDiv : null} onMouseEnter={this.handleHovered} onMouseLeave={this.handleHovered}>
                    {this.state.hovered || this.state.focused ? this.mapRecommendations() : null}
                </div>
            </div>
        );
    }
}