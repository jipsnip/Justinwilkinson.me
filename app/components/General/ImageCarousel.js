import React, {Component} from 'react';
import styles from '../../Stylesheets/General/ImageCarousel.css';
let timer = null;

export default class ImageCarousel extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentIndex: this.props.current || 0
        };

        this.props.rotate ? timer = setInterval(this.handleRightArrowClick.bind(this), 10000) : null;
        this.mapListItems = this.mapListItems.bind(this);
        this.mapSwitchers = this.mapSwitchers.bind(this);
        this.requireImage = this.requireImage.bind(this);
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.handleSwitcherClick = this.handleSwitcherClick.bind(this);
    }

    handleRightArrowClick(){
        this.setState({
            currentIndex: this.state.currentIndex === this.props.images.length - 1 ? 0 : this.state.currentIndex + 1
        });
        clearInterval(timer);
        timer = setInterval(this.handleRightArrowClick.bind(this), 10000);
    }

    handleLeftArrowClick(){
        this.setState({
            currentIndex: this.state.currentIndex === 0 ? this.props.images.length - 1 : this.state.currentIndex - 1
        });
        clearInterval(timer);
        timer = setInterval(this.handleRightArrowClick.bind(this), 10000);
    }

    handleSwitcherClick(e){
        this.setState({
            currentIndex: e
        });
        clearInterval(timer);
        timer = setInterval(this.handleRightArrowClick.bind(this), 10000);
    }

    requireImage(image){
        let requireAsset = require.context('../../images/', true, /\.(png|jpg|svg)/);
        return requireAsset(image);
    }

    mapListItems(){
        var self = this;
        return this.props.images.map(function(image, index){
            return (
                <li key={index} className={self.state.currentIndex === index ? styles.current : null}>
                    <a href={self.props.links ? self.props.links[index] : null}>
                        <img src={self.requireImage(image)} className={self.state.currentIndex === index ? styles.opaque : styles.transparent}/>
                    </a>
                </li>
            );
        });
    }

    mapSwitchers(){
        var self = this;
        return this.props.images.map(function(v, i){
            return (
                <li key={i} onClick={self.handleSwitcherClick.bind(this, i)}>
                    <a className={self.state.currentIndex === i ? styles.activeSwitcher : null}/>
                </li>
            );
        });
    }

    render(){
        return (
            <div className={styles.carouselContainer}>
                <span className={styles.leftArrow} onClick={this.handleLeftArrowClick}/>
                <span className={styles.rightArrow} onClick={this.handleRightArrowClick}/>
                <ol className={styles.carouselContent}>
                    {this.mapListItems()}
                </ol>
                <ol className={styles.runescapeCarouselSwitcher}>
                    {this.mapSwitchers()}
                </ol>
            </div>
        );
    }
}