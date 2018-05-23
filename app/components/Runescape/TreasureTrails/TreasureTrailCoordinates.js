import React, {Component} from 'react';
import axios from 'axios';
import TreasureTrailCoordinateContainer from './TreasureTrailCoordinateContainer';
import TreasureTrailFilterBar from './TreasureTrailFilterBar';
import TreasureTrailMainButton from './TreasureTrailMainButton';
import styles from '../../../Stylesheets/Runescape/TreasureTrails.css';
import bodyStyles from '../../../Stylesheets/Main/Runescape.css';

export default class TreasureTrailCoordinates extends Component {

    constructor(props){
        super(props);
        this.state = {
            coordinates: [],
            filter: 'all'
        };

        this.mapCoordinateContainers = this.mapCoordinateContainers.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    componentWillMount(){
        document.body.className = bodyStyles.runescapeComponent;
    }

    componentDidMount(){
        var self = this;

        history.pushState(null, null, location.href);
        document.title = 'Coordinates';
        window.onpopstate = function(e){
          e.preventDefault();
          location.reload();
        };

        axios.get('/treasuretrail/coordinates')
            .then(function(coordinates){
                self.setState({
                   coordinates: coordinates.data
                });
            });
    }

    mapCoordinateContainers(){
        var self = this;
        var coordinates = this.state.coordinates.map(function(v, i){
            if(self.state.filter === 'all' || self.state.filter === v.coordinatesearchkey) {
                return <TreasureTrailCoordinateContainer coordinate={v} key={i}/>
            }
            else{
                return null;
            }
        });
        coordinates = coordinates.filter((n) => {return n !== null});
        document.body.className = bodyStyles.runescapeComponent;
       /* if(coordinates.length === 1){
            document.body.className = bodyStyles.expandedRunescapeComponent;
        }
        else{
            document.body.className = bodyStyles.runescapeComponent;
        }*/
        return coordinates
    }

    handleFilter(e){
        this.setState({
           filter: e.target.value
        });
    }

    render(){
        return (
                <div className={styles.infoContainer}>
                    <TreasureTrailFilterBar filterType={'Coordinate'} onFilter={this.handleFilter}/>
                    {this.mapCoordinateContainers()}
                </div>
        );
    }

}