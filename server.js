var express = require('express');
var app = express();
var html = require('html');
var request = require('request');
var router = require('./routes');
var responseTime = require('response-time');
var path = require('path');

app.use('/', router);

app.use(express.static('build'));
app.use(express.static('public'));


/*app.all('/', function (req, res) {
    res.render('public/index.html');
});

app.all('/Runescape/Calculator', function (req, res){
	res.sendFile(__dirname + '/public/RSCalc.html');
});
app.all('/Runescape/Highscores', function(req, res){
	res.sendFile(__dirname + '/public/Highscores.html');
});

app.all('/Runescape/AdventureLog', function(req, res){
   res.sendFile(__dirname + '/public/Adventurelog.html');
});*/

app.all('*', function(req, res){
   res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!')
});

