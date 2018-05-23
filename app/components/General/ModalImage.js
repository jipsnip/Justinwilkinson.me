import React, {Component} from 'react';
import styles from '../../Stylesheets/General/ModalImage.css';

export default class ModalImage extends Component {

    constructor(props){
        super(props)
    }

    requireImage(){
        let assetRequire = require.context('../../images/', true, /\.(png|jpg|svg)/);
        return assetRequire(this.props.image);
    }

    render(){
        return (
          <div className={styles.modalDiv} onClick={this.props.onClickOut}>
              <span className={styles.modalClose} onClick={this.props.onClose}>&times;</span>
              <div>
                    <img className={styles.modalImage} name='img' src={this.requireImage()} onClick={this.props.onClickOut}/>
              </div>
          </div>
        );
    }
}