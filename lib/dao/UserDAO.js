var Promise = require('bluebird');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var db = require('../../config/database');

function addNewUser(username, password, email){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            db.users.insert({username: username, password: hash, email: email}, function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    var actLink = crypto.randomBytes(8).toString('hex');
                    var code = crypto.randomBytes(4).toString('hex');
                    db.activation.insert({username: username, activationlink: actLink, activationcode: code}, (err, results) => {
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(results);
                        }
                    });
                }
            });
        });
    });
}
exports.addNewUser = addNewUser;

function getUser(username){
    return new Promise((resolve, reject) => {
        db.users.find({username: username}, {}, (err, results) => {
            if(err){
                reject(err);
            }
            else{
                resolve(results);
            }
        });
    });
}
exports.getUser = getUser;

function getActivationCode(id){
    return new Promise((resolve, reject) => {
        db.activation.find({activationlink: id, activated: 0}, {}, (err, results) => {
           if(err){
               reject(err);
           }
           else{
               resolve(results);
           }
        });
    });
}
exports.getActivationCode = getActivationCode;

function activateAccount(username){
    return new Promise((resolve, reject) => {
        db.users.update({username: username}, {active: 1}, (err, results) => {
           if(err){
               reject(err);
           }
           else{
               db.activation.update({username: username}, {activated: 1}, (err, results) => {
                  if(err){
                      reject(err);
                  }
                  else{
                      resolve(results);
                  }
               });
           }
        });
    });
}
exports.activateAccount = activateAccount;

function confirmPassword(username, password){
    return new Promise((resolve, reject) => {
            db.users.find({username: username, active: 1}, {}, (err, results) => {
               if(err){
                   reject(err);
               }
               else if(results.length === 0){
                   resolve(false);
               }
               else{
                   bcrypt.compare(password, results[0].password, (err, res) => {
                       if(err){
                           reject(err);
                       }
                       else{
                           resolve(res);
                       }
                   });
               }
            });
        });
}
exports.confirmPassword = confirmPassword;

function resetActivationCode(link){
    return new Promise((resolve, reject) => {
        db.activation.update({activationlink: link}, {activationcode: crypto.randomBytes(4).toString('hex')}, (err, results) => {
            if(err){
                reject(err);
            }
            else{
                resolve(results);
            }
        });
    });
}
exports.resetActivationCode = resetActivationCode;