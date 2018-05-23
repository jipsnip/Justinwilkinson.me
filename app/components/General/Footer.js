import React, {Component} from 'react';
import styles from '../../Stylesheets/General/Footer.css';
const rsSites = [
    'Highscores',
    'Calculator',
    'Coordinates',
    'Anagrams',
    'Cryptics',
    'Adventure%20Log'
];

export default class Footer extends Component {

    constructor(props){
        super(props);
        this.determineContent = this.determineContent.bind(this);
    }

    determineContent(){
        if(this.props.site === 'Runescape'){
            return (
                <footer className={styles.rsFooterMain}>
                    <div className={styles.rsFooterDiv}>
                        <div className={styles.rsFooterCopyright}>
                            Graphics are copyright <a href="https://Runescape.com/community">Jagex Ltd.</a>&nbsp;
                            allowed under Section 8 of their <a href="https://www.jagex.com/terms">Terms & Conditions</a>
                            &nbsp;for non-commercial use. <a href="mailto:justinwilkinsontech@gmail.com">Contact Me.</a>
                        </div>
                        <div className={styles.rsFooterSocial}>
                            <a href="https://www.linkedin.com/in/justinwilkinson/">
                                <img src={require('../../images/LinkedIn.png')} className={styles.rsSocialImage}/>
                            </a>
                        </div>
                    </div>
                </footer>
            );
        }
        else if(this.props.site === 'League'){
            return (
                <footer className={styles.leagueFooterMain}>
                    <div className={styles.leagueFooterDiv}>
                        <div className={styles.leagueFooterCopyright}>
                            This website isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot
                            Games or anyone officially involved in producing or managing League of Legends. League of
                            Legends and Riot Games are trademarks or registered trademarks of <a href="https://leagueoflegends.com">Riot Games</a>, Inc. League of
                            Legends © Riot Games, Inc.
                        </div>
                        <div className={styles.leagueContact}>
                            <a href="mailto:justinwilkinsontech@gmail.com">Contact Me</a>
                        </div>
                        <div className={styles.leagueFooterSocial}>
                            <a href="https://www.linkedin.com/in/justinwilkinson">
                                <i className={["fa fa-linkedin", styles.linkedIn].join(' ')}/>
                            </a>
                        </div>
                    </div>
                </footer>
            );
        }
        else if(this.props.site === 'Twitch'){
            return (
                <footer className={styles.twitchFooterMain}>
                    <div className={styles.twitchFooterDiv}>
                        <div className={styles.twitchContact}>
                            <a href="mailto:justinwilkinsontech@gmail.com">Contact Me</a>
                        </div>
                        <div className={styles.twitchFooterSocial}>
                            <a href="https://github.com/jipsnip">
                                <i className={['fa fa-github', styles.twitchGitHub].join(' ')}/>
                            </a>
                            <a href="https://linkedin.com/in/justinwilkinson">
                                <i className={['fa fa-linkedin', styles.twitchLinkedIn].join(' ')}/>
                            </a>
                        </div>
                    </div>
                </footer>
            )
        }
    }

    render(){
        return (
            <span>
                {this.determineContent()}
            </span>
        );
    }
}