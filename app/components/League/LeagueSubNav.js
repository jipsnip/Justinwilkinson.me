import React, {Component} from 'react';
import styles from '../../Stylesheets/League/LeagueSubNav.css';

export default class LeagueSubNav extends Component{

    render(){
        return (
          <nav className={this.props.expanded ? styles.leagueSubNavBar : styles.expandedLeagueSubNavBar}>
              <ul className={styles.leagueSubNavList}>
                  <li className={this.props.selected === 'Match History' ? styles.activeNavItem : styles.inactiveNavItem}>
                      <a onClick={this.props.categoryClicked} name="Match History">
                          Match History
                      </a>
                  </li>
                  <li className={this.props.selected === 'Current Match' ? styles.activeNavItem : styles.inactiveNavItem}>
                      <a onClick={this.props.categoryClicked} name="Current Match">
                          Match Lookup
                      </a>
                  </li>
              </ul>
          </nav>
        );
    }
}