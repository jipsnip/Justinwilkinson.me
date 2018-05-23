var db = require('../../config/database');
var Promise = require('bluebird');

function addChampionToDB(champObject){
    return new Promise(function(resolve, reject){
        db.champions.insert(champObject, function(err, success){
            if(err){
                reject(err);
            }
            else{
                resolve(success);
            }
        });
    });
}
exports.addChampionToDB = addChampionToDB;