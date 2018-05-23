var runescapeapi = require('runescape-api');
var Promise = require('bluebird');
var VALID_PLAYER_TYPES = ['normal', 'ironman', 'hardcore', 'ultimate'];
var ItemDAO = require('../lib/dao/ItemDAO');
var HighscoresDAO = require('../lib/dao/HighscoresDAO');
var TreasureTrailDAO = require('../lib/dao/TreasureTrailDAO');
var request = require('request');
var constants = require('../config/constants');

/**
 *
 * @param req - request from the /skill/items endpoint passing in the skill
 * @param res
 */
function getItemDetailsFromSkill(req, res) {
    var skill = req.query.skill.toLowerCase();
    var items = [];
    ItemDAO.findItemBySkill(skill).then(function (skillItems) {
        var allPromises = skillItems.map(function(data){
            var info = {
                name: data.item_name,
                level: data._level,
                xp: data.item_xp
            };

            var promises = [
                ItemDAO.findItemPriceById(data.item_id),
                ItemDAO.findItemPriceById(data.material_id)
            ];

            return Promise.all(promises).then(function (itemDetails) {
                var finishedProductPrice = itemDetails[0];
                var rawProductPrice = itemDetails[1];
                info.sell = finishedProductPrice;
                info.buy = rawProductPrice;
                items.push(info);
            });
        });
        return Promise.all(allPromises);
    }).then(function () {
        res.json(items);
    });
}
exports.getItemDetailsFromSkill = getItemDetailsFromSkill;

/**
 *
 * @param req - request from the /items/table endpoint passing in the skill
 * @param res - responds with the name, level, xp, buy, sell, cost, and gpxp of the items of the given skill from the DB
 */
function getTableInformationFromSkill(req, res){
    var skill = req.query.skill.toLowerCase();
    ItemDAO.findItemBySkill(skill).then(function(skillItems){
        var items = [];
        skillItems.forEach(function(item){
            var name = item.item_name;
            name = name.charAt(0).toUpperCase() + name.slice(1);
            var data = {
                name: name,
                level: item._level,
                xp: item.item_xp,
                buy: item.item_buy,
                sell: item.item_price,
                cost: item.item_cost,
                gpxp: item.item_gpxp
            };
            items.push(data);
        });
        res.json(items);
    });
}
exports.getTableInformationFromSkill = getTableInformationFromSkill;

/**
 *
 * @param req - request from /player/stats/api endpoint passing in rsn and player type
 * @param res - response.json the provided users stats from the RS API
 */
function getPlayerStatsFromAPI(req, res) {
    var rsn = req.query.rsn;
    var playerType = req.query.type;
    var typeIsValid = VALID_PLAYER_TYPES.indexOf((playerType || 'normal').toLowerCase()) >= 0;
    if (!rsn) {
        res.json({message: 'you need to supply a rsn in your query'});
    }
    else if (!typeIsValid) {
        res.json({message: 'the player type you supplied is invalid'})
    }
    else {
        var rsn = req.query.rsn.toLowerCase();
        var type = req.query.type;
        runescapeapi.rs.hiscores.player(rsn, type).then(
            function (info) {
                console.log('info', info);
                res.json(info);
            },
            function onError(err) {
                console.log('error', error);
                res.status(404).json(err);
            }
        )
    }
}
exports.getPlayerStatsFromAPI = getPlayerStatsFromAPI;

/**
 *
 * @param req - request from /player/stats/db endpoint passing in user and type
 * @param res - response.json the provided users cached stats from the DB
 */
function getPlayerStatsFromDB(req, res){
    var user = req.query.user;
    var type = req.query.type;
    user = user.toLowerCase();
    HighscoresDAO.findUser(user, type).then(function(player){
        res.json(player);
    }, function(err){
        res.status(500).send(err);
    });
}
exports.getPlayerStatsFromDB = getPlayerStatsFromDB;

/**
 * Gets the users stats from the api and then caches them in the database
 * @param req - request from /highscores/user/add endpoint passing in user and type
 * @param res
 */
function getAndAddUserStats(req, res){
    var user = req.query.rsn;
    var type = req.query.type;
    console.log('getting and adding user stats');
        HighscoresDAO.getUserStatsFromAPI(user, type).then(function(player) {
            var updateObj = {};
            updateObj = player.skills;
            updateObj.username = user;
            updateObj.user_type = type;
            updateObj.daily_gainz = {};
            updateObj.yesterdays_gainz = {};
            updateObj.weekly_gainz = {};
            constants.skills.forEach(function(skill){
                updateObj.daily_gainz[skill] = {exp: 0, rank: 0};
                updateObj.yesterdays_gainz[skill] = {exp: 0, rank: 0};
                updateObj.weekly_gainz[skill] = {exp: 0, rank: 0};
            });
            updateObj.weekly_gainz.date = new Date();
            HighscoresDAO.initiateUser(updateObj).then(function(success){
               res.json(success);
            }, function (err){
                console.log('error initiating user');
                res.status(500).send(err);
            });
        }, function(err){
            console.log('error getting stats from api');
            res.status(500).send(err);
        });
}
exports.getAndAddUserStats = getAndAddUserStats;

/**
 *
 * @param req - request from the /player/adventlog endpoint passing in the user
 * @param res - responds with the adventure log information of the provided user
 */
function getUserAdventureLog(req, res){
    var user = req.query.user;
    request.get('https://apps.runescape.com/runemetrics/profile/profile?user=' + user +  '&activities=20', function(error, response){
        if(error){
            res.status(500).send(error);
        }
        else{
            if(JSON.parse(response.body).activities) {
                res.json(JSON.parse(response.body).activities);
            }
            else{
                res.json(JSON.parse(response.body));
            }
        }
    });
}
exports.getUserAdventureLog = getUserAdventureLog;


/**
 *
 * @param req - request from the /player/gainz endpoing passing in the user
 * @param res - responds with the daily, yesterday, and weekly gainz of the provided user
 */
function getUserGainz(req, res){
    var user = req.query.user;
    HighscoresDAO.getUserGainz(user).then(function(gainz){
        res.json(gainz);
    }, function(err){
        res.status(500).send(err);
    });
}
exports.getUserGainz = getUserGainz;

/**
 *
 * @param req - request from the /treasuretrail/coordinates endpoint
 * @param res
 */
function getCoordinateInfo(req, res){
    TreasureTrailDAO.getAllCoordinates().then(function(coordinates){
        res.json(coordinates);
    }, function(err){
        res.status(500).send(err);
    });
}
exports.getCoordinateInfo = getCoordinateInfo;

/**
 *
 * @param req - request from the /treasuretrail/anagrams endpoint
 * @param res
 */
function getAnagramInfo(req, res){
    TreasureTrailDAO.getAllAnagrams().then(function(anagrams){
       res.json(anagrams);
    }, function(err){
        res.status(500).send(err);
    });
}
exports.getAnagramInfo = getAnagramInfo;

/**
 *
 * @param req - request from the /treasuretrail/cryptics endpoint
 * @param res
 */
function getCrypticInfo(req, res){
    TreasureTrailDAO.getAllCryptics().then(function(cryptics){
       res.json(cryptics);
    }, function(err){
        res.status(500).send(err);
    });
}
exports.getCrypticInfo = getCrypticInfo;
