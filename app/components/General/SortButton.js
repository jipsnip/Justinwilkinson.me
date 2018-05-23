import React, {Component} from 'react';
import styles from '../../Stylesheets/General/SortButton.css';

export default class SortButton extends Component {

    constructor(props){
        super(props);

        this.determineClass = this.determineClass.bind(this);
    }

    determineClass(){
        if(this.props.sortMode === 'increasing'){
            return styles.increasingSort;
        }
        else if(this.props.sortMode === 'decreasing'){
            return styles.decreasingSort;
        }
        else{
            return styles.neutralSort;
        }
    }

    render(){
        return (
            <div className={styles.sortButton}>
                <a name='Increasing' type={this.props.sortType} className={this.props.sortMode === 'Increasing' && this.props.currentType === this.props.sortType ? styles.increasingSort: styles.neutralSortTop} onClick={this.props.handleSort}/>
                <a name='Decreasing' type={this.props.sortType} className={this.props.sortMode === 'Decreasing' && this.props.currentType === this.props.sortType ? styles.decreasingSort : styles.neutralSortBottom} onClick={this.props.handleSort}/>
            </div>
        );
    }
}