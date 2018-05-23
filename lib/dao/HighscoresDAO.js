const runescapeapi = require('runescape-api');
const Promise = require('bluebird');
var db = require('../../config/database');
const DAO = require('./DAO');

/**
 *  Returns all rows in the Highscores DB corresponding to the user and type
 * @param user
 * @param type
 */
function findUser(user, type){
    return new Promise(function(resolve, reject){
       DAO.find(
           'highscores',
           {
           username: user,
           user_type: type
           }, function(err, player){
               if(err){
                    reject(err);
                }
                else{
                    resolve(player);
                }
        });
    });
}
exports.findUser = findUser;

/**
 * Inserts the provided user into the highscores DB
 * @param user
 * @param type
 * @param player - Object containing all of the players skills
 */
function addUserToDB(user, type, player){
    return new Promise(function(resolve){
        var skills = player.skills;
        skills.username = user;
        skills.user_type = type;
       DAO.insert('highscores' ,skills);
       resolve();
    });
}
exports.addUserToDB = addUserToDB;

/**
 * updates the provided users stats in the database
 * @param user
 * @param player
 */
function updateUserStats(user, player){
    return new Promise(function(resolve, reject){
       var skills = player.skills;
        DAO.update(
            'highscores',
            {
                username: user
            }, skills, function(err, success){
                if(err){
                    reject(err);
                }
                else{
                    resolve(success);
                }
            });
        });
}
exports.updateUserStats = updateUserStats;

/**
 * Returns all entries in the highscores DB
 */
function getAllUsers(){
    return new Promise(function(resolve, reject){
        DAO.find(
            'highscores',
            {},
            function(err, players){
                if(err){
                    reject(err);
                }
                else{
                    resolve(players);
                }
            });
        });
}
exports.getAllUsers = getAllUsers;

/**
 * Returns provided user's daily, yesterday, and weekly gainz
 * @param user
 */
function getUserGainz(user){
    return new Promise(function(resolve, reject){
        let returnObj = {};
       DAO.find(
           'highscores',
           {
                username: user
            }, function(err, player){
                if(err){
                    reject(err);
                }
                else{
                    returnObj.yesterdays_gainz = player[0].yesterdays_gainz;
                    returnObj.daily_gainz = player[0].daily_gainz;
                    returnObj.weekly_gainz = player[0].weekly_gainz;
                    resolve(returnObj);
                }
           });
    });
}
exports.getUserGainz = getUserGainz;

/**
 * Inserts into the database on userObject.username the users gainz
 * @param userObject - object containing the 3 types of gainz and a username
 */
function initiateUser(userObject){
    return new Promise(function(resolve, reject){
       db.highscores.insert(userObject, function(err, success){
          if(err){
              reject(err);
          }
          else{
              resolve(success);
          }
       });
    });
}
exports.initiateUser = initiateUser;

/**
 * Returns a users row in the highscores DB
 * @param user
 */
function getUserStats(user){
    return new Promise(function(resolve, reject){
       DAO.find(
           'highscores',
           {
                username: user
            }, function(err, player){
                if(err){
                    reject(player);
                }
                else{
                    resolve(parseStats(player));
                }
           });
    });
}
exports.getUserStats = getUserStats;

/**
 * Parses the other data from an object and just leaves the data on the stats
 * @param user
 * @returns {{}}
 */
function parseStats(user){
    var invalid = ['daily_gainz', 'weekly_gainz', 'yesterdays_gainz'];
    if(Array.isArray(user)){
        user = user[0];
    }
    var returnObj = {};
    Object.keys(user).forEach(function(key){
        if(invalid.indexOf(key) < 0){
            returnObj[key] = user[key];
        }
    });
    return returnObj;
}

/**
 *  passes in the users username and type into the API and returns that information
 * @param user
 * @param type
 */
function getUserStatsFromAPI(user, type){
    return new Promise(function(resolve, reject){
        runescapeapi.rs.hiscores.player(user, type).then(function(player){
            resolve(player);
        }, function(err){
            reject(err);
        });
    });
}
exports.getUserStatsFromAPI = getUserStatsFromAPI;

function updateUserGainz(userObject){
    return new Promise(function(resolve, reject){
       DAO.update(
           'highscores',
        {
           username: userObject.username
       }, userObject.gainz, function(err, data){
           if(err){
               reject(err);
           }
           else{
               resolve(data);
           }
        })
    });
}
exports.updateUserGainz = updateUserGainz;
