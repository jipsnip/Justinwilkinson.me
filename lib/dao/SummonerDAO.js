var db = require('../../config/database');
var Promise = require('bluebird');

function checkForSummoner(summoner){
    return new Promise(function(resolve, reject){
        db.summoners.find(summoner, function(err, summoner){
            if(err){
                reject(err);
            }
            else{
                resolve(summoner);
            }
        })
    });
}
exports.checkForSummoner = checkForSummoner;

function getSummonerId(summonerObj){
    console.log(summonerObj);
    return new Promise(function(resolve, reject){
        getSummonerDetails(summonerObj).then(function(summoner){
            if(Array.isArray(summoner)){
                summoner = summoner[0];
            }
            resolve(summoner.id);
        }, function(err){
            reject(err);
        });
    });
}
exports.getSummonerId = getSummonerId;

function getSummonerAccountId(summonerObj){
    return new Promise(function(resolve, reject){
        getSummonerDetails(summonerObj).then(function(summoner){
            if(Array.isArray(summoner)){
                summoner = summoner[0];
            }
            resolve(summoner.account_id);
        }, function(err){
            reject(err);
        });
    });
}
exports.getSummonerAccountId = getSummonerAccountId;

function getSummonerLevel(summonerObj){
    return new Promise(function(resolve, reject){
      getSummonerDetails(summonerObj).then(function(summoner){
          if(Array.isArray(summoner)){
              summoner = summoner[0];
          }
         resolve(summoner.summoner_level);
      }, function(err){
          reject(err);
      });
    });
}
exports.getSummonerLevel = getSummonerLevel;

function getSummonerDetails(summonerObj){
    console.log('finding', summonerObj);
    return new Promise(function(resolve, reject){
       db.summoners.find(summonerObj, function(err, summoner){
           if(err){
               reject(err);
           }
           else{
               console.log(summoner);
               resolve(summoner);
           }
       })
    });
}
exports.getSummonerDetails = getSummonerDetails;

function addSummoner(summonerObj){
    console.log('adding summoner', summonerObj);
    return new Promise(function(resolve, reject){
        console.log('summonerObj', summonerObj);
       db.summoners.insert(summonerObj, function(err, success){
          if(err){
              reject(err);
          }
          else{
              resolve();
          }
       });
    });
}
exports.addSummoner = addSummoner;