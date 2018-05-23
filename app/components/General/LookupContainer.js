import React, {Component} from 'react';
import LookupButton from "../General/LookupButton";
import TextInput from "../General/TextInput";
import styles from '../../Stylesheets/General/LookupContainer.css';
import RadioButton from "./RadioButton";
import SkillButtons from '../Runescape/General/SkillButtons';
import ErrorMessage from "./ErrorMessage";

/**
 * @props
 * onClick()
 * userType true/false
 * skillIcons true/false
 * onInputChange()
 * value
 * site
 */
export default class LookupContainer extends Component{
    constructor(props) {
        super(props);
    }

    determineClass(type){
        if(type === 'outer'){
            if(this.props.site === 'Runescape'){
                return styles.runescapeInfoContainer
            }
            else{
                return styles.generalInfoContainer
            }
        }
        else if(type === 'inner'){
            if(this.props.site === 'Runescape'){
                return styles.runescapeLookupContainer;
            }
            else{
                return styles.generalLookupContainer;
            }
        }
        else{
            if(this.props.site === 'Runescape'){
                return styles.runescapeLookup
            }
            else{
                return styles.generalLookup
            }
        }
    }

    render(){
        return (
            <div className={this.determineClass('outer')}>
                <div className={this.determineClass()}>
                    <div className={this.determineClass('inner')}>
                        <div className={this.props.skillIcons ? styles.inlineInput : styles.blockInput}>
                            <TextInput value={this.props.value} onInputChange={this.props.onInputChange} site={this.props.site}
                                        onClick={this.props.onClick}/>
                        </div>
                        {this.props.error ? <ErrorMessage error={this.props.error} skillIcons={this.props.skillIcons}/> : null}
                        {this.props.userType ? <RadioButton label={['Normal', 'Ironman']} selected={'Normal'}/> : null}
                        {this.props.skillIcons ? <SkillButtons skills={this.props.skills} skill={this.props.skill} skillChange={this.props.skillChange}/> : null}
                    </div>
                </div>
            </div>
        )
    }
}