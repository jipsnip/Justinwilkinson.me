import React, {Component} from 'react';
import styles from '../../../Stylesheets/Runescape/TreasureTrails.css';
import ModalImage from "../../General/ModalImage";

export default class TreasureTrailCrypticContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalImage: false
        };

        this.determineIcon = this.determineIcon.bind(this);
        this.handleImageClicked = this.handleImageClicked.bind(this);
        this.handleImageClosed = this.handleImageClosed.bind(this);
    }

    handleImageClicked(){
        this.setState({
            modalImage: true
        });
    }

    handleImageClosed(){
        this.setState({
            modalImage: false
        });
    }

    determineIcon(){
        if(this.props.cryptic.key === true && this.props.cryptic.puzzle === false){
            return (
              <div>
                  <img src={require('../../../images/TreasureTrail/Key.png')}/>
              </div>
            );
        }
        else if(this.props.cryptic.key === false && this.props.cryptic.puzzle === true){
            return (
              <div>
                  <img src={require('../../../images/TreasureTrail/SmallPuzzleBox.png')}/>
              </div>
            );
        }
        else{
            return null;
        }
    }

    render(){
        return (
            <div className={styles.crypticContainer}>
                <div className={styles.crypticContainerHeader}>
                    <div className={styles.crypticIcons}>
                        {this.determineIcon()}
                    </div>
                </div>
                <div className={styles.crypticContainerMain}>
                    <div className={styles.crypticImageContainer}>
                        <img src={require('../../../images/TreasureTrail/Coordinate/0537n3115eThumb.png')} onClick={this.handleImageClicked} className={styles.crypticImage}/>
                        {this.state.modalImage ? <ModalImage image={'./TreasureTrail/Coordinate/0537n3115e.png'} onClose={this.handleImageClosed}/> : null}
                    </div>
                    <div className={styles.crypticInfo}>
                        <div className={styles.crypticDescription}>
                            {this.props.cryptic.riddle}
                        </div>
                        <div className={styles.crypticSolution}>
                            {this.props.cryptic.solution}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}