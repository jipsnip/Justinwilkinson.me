var constants = require('../config/constants');
var LEAGUE_KEY = constants.League_api_key;
var request = require('request');
var ChampionDAO = require('../lib/dao/ChampionDAO');
var SummonerDAO = require('../lib/dao/SummonerDAO');
var fs = require('fs');

var regions = {
  'NA': 'NA1',
    'EUW': 'EUW1',
    'EUNE': 'EUN1',
    'JP': 'JP1',
    'KR': 'KR',
    'LAS': 'LA2',
    'TR': 'TR1',
    'BR': 'BR1'
};

/*function getFreeChampionIds(req, res){
    var platform = req.query.platform;
    request.get('https://' + platform + '.api.riotgames.com/lol/platform/v3/champions?freeToPlay=true&api_key=' + LEAGUE_KEY, function(err, data){
        if(err){
            res.status(500).send(err);
        }
        else{
            console.log(JSON.parse(data.body).champions);
            var champions = JSON.parse(data.body).champions;
            var ids = champions.map(function(champion){
                return champion.id;
            });
            res.json(ids);
        }
    })
}
exports.getFreeChampionIds = getFreeChampionIds;*/

function getSummonerId(req, res){
    var name = req.query.summoner;
    var platform = regions[req.query.platform];
    request.get('https://' + platform + '.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + name + '?api_key=' + LEAGUE_KEY, function(err, summoner){
        if(err){
            res.status(err.status || 500).send(err);
        }
        else{
            res.json(JSON.parse(summoner.body));
        }
    });
}
exports.getSummonerId = getSummonerId;

function getSummonerChampionMastery(req, res){
    var summoner = req.query.summoner;
    var platform = regions[req.query.platform];
    request.get('https://' + platform + '.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/' + summoner + '?api_key=' + LEAGUE_KEY, function(err, mastery){
        if(err){
            res.status(err.status || 500).send(err);
        }
        else{
            res.json(JSON.parse(mastery.body));
        }
    });
}
exports.getSummonerChampionMastery = getSummonerChampionMastery;

/*function addSummonerToDB(summoner){
    return new Promise(function(resolve, reject) {
        request.get('https://' + summoner.platform + '.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summoner.name + '?api_key=' + LEAGUE_KEY, function (err, summonerInfo) {
            if (err) {
                reject(err);
            }
            else {
                summonerInfo = JSON.parse(summonerInfo.body);
                summonerInfo.platform = summoner.platform;
                summonerInfo.name = summonerInfo.name.toLowerCase();
                SummonerDAO.addSummoner(summonerInfo).then(function() {
                    resolve();
                }, function (err) {
                    reject(err);
                });
            }
        });
    });
}*/

function getSummonerAccountId(req, res){
    var summoner = req.query.summoner;
    var platform = regions[req.query.platform];
    request.get('https://' + platform + '.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summoner + '?api_key=' + LEAGUE_KEY, function(err, summoner){
        if(err){
            res.status(err.status || 500).send(err);
        }
        else {
            res.json(JSON.parse(summoner.body).accountId);
        }
    });
}
exports.getSummonerAccountId = getSummonerAccountId;

function getSummonerMatches(req, res){
    var id = req.query.id;
    var platform = regions[req.query.platform];
    var beginIndex = req.query.beginIndex;
    var endIndex = beginIndex + 10;
            request.get('https://' + platform + '.api.riotgames.com/lol/match/v3/matchlists/by-account/' + id + '?endIndex=19&api_key=' + LEAGUE_KEY, function (err, matches) {
                if(err){
                    res.status(err.status || 500).send(err);
                }
                else {
                    res.json(JSON.parse(matches.body));
                }
            });
}
exports.getSummonerMatches = getSummonerMatches;

function getSummonerCurrentMatchId(req, res){
    var summoner = req.query.summoner;
    var platform = regions[req.query.platform];
    request.get('https://' + platform + '.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/' + summoner + '?api_key=' + LEAGUE_KEY, function(err, curMatch){
       if(err){
           res.status(err.status || 500).send(err);
       }
       else{
           res.json(JSON.parse(curMatch.body));
       }
    });
}
exports.getSummonerCurrentMatchId = getSummonerCurrentMatchId;

function getMatchDetails(req, res){
    var matchId = req.query.matchId;
    var platform = regions[req.query.platform];
    request.get('https://' + platform + '.api.riotgames.com/lol/match/v3/matches/' + matchId + '?api_key=' + LEAGUE_KEY, function(err, match){
       if(err){
           res.status(err.status || 500).send(err);
       }
       else{
           /*console.log(match.headers);
           console.log('\n\n\n\n\n\n');*/
           res.json(JSON.parse(match.body));
       }
    });
}
exports.getMatchDetails = getMatchDetails;

function getSummonerRankings(req, res){
    var summoner = req.query.summoner;
    var platform = regions[req.query.platform];
    request.get('https://' + platform + '.api.riotgames.com/lol/league/v3/positions/by-summoner/' + summoner + '?api_key=' + LEAGUE_KEY, function(err, rankings){
        if(err){
            res.status(err.status || 500).send(err);
        }
        else{
            res.json(JSON.parse(rankings.body));
        }
    });
}
exports.getSummonerRankings = getSummonerRankings;

/*function getSummonerRankedMatches(req, res){
    var summoner = req.query.summoner;
    var platform = req.query.platform;
    request.get('https://jipsnips-project.herokuapp.com/league/summoner/accountid', {qs: {summoner: summoner, platform: platform}}, function(err, id){
       id = id.body;
       request.get('https://' + platform + '.api.riotgames.com/lol/match/v3/matchlists/by-account/' + id + '?api_key=' + LEAGUE_KEY, function(err, matches){
           if(err){
               console.log(err);
               res.status(err.status || 500).send(err);
           }
           else {
               console.log(JSON.parse(matches.body));
               //res.json(JSON.parse(matches.body));
           }
       });
    });
}
exports.getSummonerRankedMatches = getSummonerRankedMatches;*/

/*function getChampionIds(req, res){
    request.get('https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=' + LEAGUE_KEY, function(err, champions){
        if(err){
            res.status(err.status || 500).send(err);
        }
        else {
            champions = JSON.parse(champions.body);
            var championObject = [];
            Object.keys(champions.data).forEach(function (key) {
                championObject.push(champions.data[key].id);
            });
            res.json(championObject);
        }
    });
}
exports.getChampionIds = getChampionIds;*/



