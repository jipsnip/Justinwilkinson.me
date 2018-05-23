import Highscore from '../Runescape/Highscores/Highscore';
import Calculator from '../Runescape/Calculator/Calculator';
import TreasureTrail from '../Runescape/TreasureTrails/TreasureTrail';
import AdventureLog from '../Runescape/AdventureLog/AdventureLog';
import LeagueMain from '../League/LeagueMain';
import TwitchMain from '../Twitch/TwitchMain';
import Activation from '../General/Activation';
import Home from '../Home/Home';

const routes = [
    {path: '/Highscores', component: Highscore},
    {path: '/Calculator', component: Calculator},
    {path: '/Adventure Log', component: AdventureLog},
    {path: '/Coordinates', component: TreasureTrail},
    {path: '/Anagrams', component: TreasureTrail},
    {path: '/Cryptics', component: TreasureTrail},
    {path: '/League of Legends', component: LeagueMain},
    {path: '/Twitch', component: TwitchMain},
    {path: '/Activation', component: Activation},
    {path: '/About', component: Home},
    {path: '/', component: Calculator},
];

export default routes;