var express = require('express');
var Runescape = require('./runescape');
var League = require('./league');
var Twitch = require('./Twitch');
var User = require('./User');
var router = express.Router();


/*-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=
RUNESCAPE
-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=*/

/*ITEMS*/
router.get('/skill/items', Runescape.getItemDetailsFromSkill);
router.get('/items/table', Runescape.getTableInformationFromSkill);

/*STATS*/
router.get('/player/stats/api', Runescape.getPlayerStatsFromAPI);
router.get('/player/stats/db', Runescape.getPlayerStatsFromDB);

//router.get('/highscores/user/update', Runescape.updateUserStats);
router.get('/highscores/user/add', Runescape.getAndAddUserStats);

/*ADVENTURE'S LOG*/
router.get('/player/adventlog', Runescape.getUserAdventureLog);

/*GAINZ*/
router.get('/player/gainz', Runescape.getUserGainz);

/*TREASURE TRAILS*/
router.get('/treasuretrail/coordinates', Runescape.getCoordinateInfo);
router.get('/treasuretrail/anagrams', Runescape.getAnagramInfo);
router.get('/treasuretrail/cryptics', Runescape.getCrypticInfo);

/*-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=
LEAGUE
-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=*/

/*Champions*/
//router.get('/league/champion/freechampions', League.getFreeChampionIds);
router.get('/league/summoner/id', League.getSummonerId);
router.get('/league/summoner/accountid', League.getSummonerAccountId);
//router.get('/league/champion/championIds', League.getChampionIds);
router.get('/league/summoner/matches/history', League.getSummonerMatches);
//router.get('/league/summoner/matches/ranked', League.getSummonerRankedMatches);
router.get('/league/summoner/mastery', League.getSummonerChampionMastery);

/*Match Details*/
router.get('/league/match/info', League.getMatchDetails);
router.get('/league/match/current/id', League.getSummonerCurrentMatchId);

router.get('/league/summoner/ranking', League.getSummonerRankings);

/*-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=
TWITCH
-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=*/
router.get('/Twitch/Followings', Twitch.retrieveUserFollowings);
router.get('/Twitch/User/Id', Twitch.retrieveUserInfoById);
router.get('/Twitch/User', Twitch.retrieveUserInfo);
router.post('/Twitch/Refresh', Twitch.handleTwitchAuthRefresh);
router.all('/Twitch/Authorization', Twitch.handleTwitchLogin);

/*-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=
USER
-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=-==-=*/
router.get('/User/Status', User.getUser);
router.get('/User/Activation', User.getActivationCode);
router.get('/User/Password', User.checkPassword);

router.put('/User/Activate', User.activateAccount);
router.put('/User/Reset', User.resetActivationCode);

router.post('/User/Signup', User.addNewUser);

router.delete('User/Remove', User.removeUser);

module.exports = router;