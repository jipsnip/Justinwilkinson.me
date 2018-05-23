var Promise = require('bluebird');
var db = require('../../config/database');

/**
 * Returns all the coordinates in the TreasureTrail database.
 */

function getAllCoordinates(){
    return new Promise(function(resolve, reject){
        db.rs3coordinates.find(
            {
            },{}, function(err, coords){
                if(err){
                    reject(err);
                }
                else{
                    resolve(coords);
                }
            });
    });
}
exports.getAllCoordinates = getAllCoordinates;

function getAllAnagrams(){
    return new Promise(function(resolve, reject){
        db.rs3anagrams.find({

        }, {}, function(err, anagrams){
           if(err){
               reject(err);
           }
           else {
               resolve(anagrams);
           }
        });
    });
}
exports.getAllAnagrams = getAllAnagrams;

function getAllCryptics(){
    return new Promise(function(resolve, reject){
        db.rs3cryptics.find({
        }, {}, function(err, cryptics){
           if(err){
               reject(err);
           }
           else {
               resolve(cryptics);
           }
        });
    });
}
exports.getAllCryptics = getAllCryptics;
