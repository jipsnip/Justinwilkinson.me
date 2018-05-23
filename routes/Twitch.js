var request = require('request');
var Promise = require('bluebird');
var TWITCH_CLIENT_ID = 'redacted';
var TWITCH_CLIENT_SECRET = 'redacted';
var redirect_uri = 'http://www.justinwilkinson.me/Twitch/Authorization';

function handleTwitchLogin(req, res){
    if(req.query.code) {
        request.post('https://api.twitch.tv/kraken/oauth2/token?client_id=' + TWITCH_CLIENT_ID + '&client_secret=' + TWITCH_CLIENT_SECRET + '&code=' + req.query.code + '&grant_type=authorization_code&redirect_uri=http://www.justinwilkinson.me/Twitch/Authorization', function(err, done){
            if(Object.keys(JSON.parse(done.body)).includes('access_token')) {
                res.cookie('TwitchOAUTH', JSON.parse(done.body).access_token, {maxAge: 900000});
                res.cookie('TwitchRefresh', JSON.parse(done.body).refresh_token, {maxAge: 900000});
                res.redirect('http://www.justinwilkinson.me/Twitch');
            }
            else{
                res.redirect('http://www.justinwilkinson.me/Twitch');
            }
        });
    }
    else{
        res.redirect('http://www.justinwilkinson.me/Twitch');
    }
}
exports.handleTwitchLogin = handleTwitchLogin;

function handleTwitchAuthRefresh(req, res){
        request.post('https://api.twitch.tv/kraken/oauth2/token?grant_type=refresh_token&refresh_token=' + req.query.refresh_token + '&client_id=' + TWITCH_CLIENT_ID +'&client_secret=' + TWITCH_CLIENT_SECRET, function(err, done){
            if(err){
                res.status(500).send(err);
            }
            else{
                res.json(done);
            }
        });
}
exports.handleTwitchAuthRefresh = handleTwitchAuthRefresh;

function retrieveUserInfo(req, res){
    var Oauth = req.query.Oauth;
    var user = req.query.user;
    request.get('https://api.twitch.tv/helix/users?client_id=' + TWITCH_CLIENT_ID + '&login=' + user, {
        headers: {
            Authorization: 'Bearer ' + Oauth
        }
    }, (err, response) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json(response.body);
        }
    });
}
exports.retrieveUserInfo = retrieveUserInfo;

function retrieveUserInfoById(req, res){
    var Oauth = req.query.Oauth;
    var id = req.query.id;
    request.get('https://api.twitch.tv/helix/users?id=' + id, {
        headers: {
            Authorization: 'Bearer ' + Oauth
        }
    }, (err, response) =>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json(response);
        }
    });
}
exports.retrieveUserInfoById = retrieveUserInfoById;

function retrieveUserFollowings(req, res){
    var Oauth = req.query.Oauth;
    var id = req.query.id;
    request.get('https://api.twitch.tv/helix/users/follows?from_id=' + id, {
        headers: {
            Authorization: 'Bearer ' + Oauth
        }
    }, (err, response) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json(response.body);
        }
    });
}
exports.retrieveUserFollowings = retrieveUserFollowings;
