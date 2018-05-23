var argv = require('yargs').argv;
var request = require('request');
var HighscoreDAO = require('../dao/HighscoresDAO');
var runescape = require('../../routes/runescape');


/**
 * updates the gainz and highscores of the users in the DB
 */
function updateUsersGainzValues(){
    HighscoreDAO.getAllUsers().then(function(players){
        var usernames = [];
        players.forEach(function(player){
           usernames.push(player.username);
        });
       usernames.forEach(function(user){
          HighscoreDAO.getUserStats(user).then(function(oldStats){
              request.get('https://jipsnips-project.herokuapp.com/player/stats/api', {qs:{rsn: oldStats.username, type: oldStats.user_type}}, function(err, response, body){
                  var newStats = JSON.parse(body).skills;
                  updateUsersStats(user, JSON.parse(body));
                  var daily_gainz = {};
                  Object.keys(newStats).forEach(function(key){
                      daily_gainz[key] = {};
                      daily_gainz[key].exp = newStats[key].exp - oldStats[key].exp;
                      daily_gainz[key].rank = -1 * (newStats[key].rank - oldStats[key].rank);
                  });
                  HighscoreDAO.getUserGainz(user).then(function(userGainz){
                      updateGainzByType('daily', daily_gainz, user);
                      updateGainzByType('yesterdays', userGainz.daily_gainz, user);
                        var gainzUpdateObj = {};
                        gainzUpdateObj.gainz = {};
                        gainzUpdateObj.username = user;
                        if((Date.parse(new Date()) - Date.parse(userGainz.weekly_gainz.date))/(1000*60*60*24) >= 6.75){
                            gainzUpdateObj.gainz = userGainz.daily_gainz;
                            gainzUpdateObj.gainz.date = new Date();
                            updateGainzByType('weekly', gainzUpdateObj.gainz, user);
                        }
                        else{
                            gainzUpdateObj.gainz.date = userGainz.weekly_gainz.date;
                            Object.keys(userGainz.daily_gainz).forEach(function(key){
                                    gainzUpdateObj.gainz[key] = {};
                                    gainzUpdateObj.gainz[key].exp = userGainz.daily_gainz[key].exp + userGainz.weekly_gainz[key].exp;
                                    gainzUpdateObj.gainz[key].rank = userGainz.daily_gainz[key].rank + userGainz.weekly_gainz[key].rank;
                            });
                            updateGainzByType('weekly', gainzUpdateObj.gainz, user);
                        }
                  });
              });
          });
       });
    });
}
exports.updateUsersGainzValues = updateUsersGainzValues;

function updateGainzByType(type, gainz, user){
    var updateObject = {};
    updateObject.username = user;
    updateObject.gainz = {};
    switch(type){
        case 'daily': updateObject.gainz.daily_gainz = gainz; break;
        case 'yesterdays': updateObject.gainz.yesterdays_gainz = gainz; break;
        case 'weekly': updateObject.gainz.weekly_gainz = gainz; break;
    }
    HighscoreDAO.updateUserGainz(updateObject).then(function(success){
        console.log(success);
    });
}

function updateUsersStats(user, player){
    console.log(user, player);
    HighscoreDAO.updateUserStats(user, player).then(function(){
       console.log("updated user", user);
    });
}

function resetGainz(){
    HighscoreDAO.getAllUsers().then(function(users){
       var usernames = [];
       users.forEach(function(user){
          usernames.push(user.username);
       });
        usernames.forEach(function(user){
            var userObject = {};
            userObject.username = user;
            userObject.gainz = {};
            userObject.gainz.weekly_gainz = {};
            HighscoreDAO.getUserStats(user).then(function(stats){
               Object.keys(stats).forEach(function(key){
                  if(key !== 'username' && key !== 'user_type'){
                      userObject.gainz.weekly_gainz[key] = {exp: 0, rank: 0};
                  }
               });
               userObject.gainz.weekly_gainz.date = new Date();
               HighscoreDAO.updateUserGainz(userObject).then(function(success){
                  console.log(success);
               });
            });
        });
    });
}

updateUsersGainzValues();
//resetGainz();