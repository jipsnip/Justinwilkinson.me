import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/TreasureTrails.css';
import ModalImage from "../../General/ModalImage";

export default class TreasureTrailCoordinateContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalImage: false
        };

        this.handleImageClicked = this.handleImageClicked.bind(this);
        this.handleImageClosed = this.handleImageClosed.bind(this);
        this.determineImage = this.determineImage.bind(this);
    }

    handleImageClicked(){
        this.setState({
           modalImage: true
        });
    }

    handleImageClosed(e){
        if(!(e.target.name === 'img')) {
            this.setState({
                modalImage: false
            });
        }
    }

    determineIcon(){
        if(this.props.coordinate.fight === 'Zamorak'){
            return require('../../../images/TreasureTrail/Zamorak_symbol.png');
        }
        else if(this.props.coordinate.fight === 'Saradomin'){
            return require('../../../images/TreasureTrail/Saradomin_symbol.png');
        }
        else if(this.props.coordinate.fight === 'Guthix'){
            return require('../../../images/TreasureTrail/Guthix_symbol.png');
        }
        else{
            return require('../../../images/TreasureTrail/NoFight.png');
        }
    }

    determineImage(){
        let image = null;
        let requireAsset = require.context('../../../images/TreasureTrail/Coordinate/', true, /\.(png)$/);
            try {
                image = requireAsset('./' + this.props.coordinate.thumbimage);
            }
            catch (err) {
                image = requireAsset('./0537n3115eThumb.png');
            }
        return image;
    }

    render(){
        return (
            <div className={styles.coordinateContainer}>
                <div className={styles.coordinateContainerHeader}>
                    <div className={styles.coordinateCoordinates}>
                        <span>{this.props.coordinate.coordinateone + ', ' + this.props.coordinate.directionone}</span>
                        <span style={{display: 'block'}}>{this.props.coordinate.coordinatetwo + ', ' + this.props.coordinate.directiontwo}</span>
                    </div>
                    <div className={styles.coordinateIcons}>
                        <img src={this.determineIcon()}/>
                    </div>
                </div>
                <div className={styles.coordinateContainerMain}>
                    <div className={styles.coordinateImageContainer}>
                        <img src={this.determineImage()} onClick={this.handleImageClicked} className={styles.coordinateImage}/>
                        {this.state.modalImage ? <ModalImage image={'./TreasureTrail/Coordinate/' + this.props.coordinate.image}
                                                             onClose={this.handleImageClosed} onClickOut={this.handleImageClosed}/>
                            : null}
                    </div>
                    <div className={styles.coordinateDescription}>
                        <div className={styles.coordinateDescriptionText}>
                            {this.props.coordinate.description ? this.props.coordinate.description : 'No description'}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}