var Promise = require('bluebird');
var db = require('../../config/database');

function addCommand(channel, command, text){
    return new Promise((resolve, reject) => {
        console.log('adding command', command, 'with text', text);
        checkForCommand(channel, command).then((results) => {
            console.log('checking for command results', results);
            if (results.length > 0) {
                resolve({error: 'That command already exists.'});
            }
            else {
                db.discordcommands.insert({channel: channel, command: command, text: text}, (err, results) => {
                    console.log('inserting results', results);
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(results);
                    }
                });
            }
        }, (err) => {
            reject(err);
        });
    });
}
exports.addCommand = addCommand;

function removeCommand(channel, command){
    return new Promise((resolve, reject) => {
        checkForCommand(channel, command).then((results) => {
            if(results.length === 0){
                resolve({error: 'That command does not exist.'});
            }
            else{
                db.discordcommands.destroy({channel: channel, command: command}, (err, results) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(results);
                    }
                });
            }
        }, (err) => {
            reject(err);
        });
    });
}
exports.removeCommand = removeCommand;

function disableCommand(channel, command){
    return new Promise((resolve, reject) => {
        checkForCommand(channel, command).then((results) => {
            if(results.length === 0){
                resolve({error: 'That command does not exist.'});
            }
            else{
                if(results[0].active === '0'){
                    resolve({error: 'That command is already disabled.'});
                }
                else{
                    db.discordcommands.update({channel: channel, command: command}, {active: '0'}, (err, results) => {
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(results);
                        }
                    });
                }
            }
        }, (err) => {
            reject(err);
        });
    });
}
exports.disableCommand = disableCommand;

function enableCommand(channel, command){
    return new Promise((resolve, reject) => {
        checkForCommand(channel, command).then((results) => {
            if(results.length === 0){
                resolve({error: 'That command does not exist.'});
            }
            else{
                if(results[0].active === '1'){
                    resolve({error: 'That command is already enabled.'});
                }
                else{
                    db.discordcommands.update({channel: channel, command: command}, {active: '1'}, (err, results) => {
                       if(err){
                           reject(err);
                       }
                       else{
                           resolve(results);
                       }
                    });
                }
            }
        }, (err) => {
            reject(err);
        });
    });
}
exports.enableCommand = enableCommand;

function editCommand(channel, command, text){
    return new Promise((resolve, reject) => {
        checkForCommand(channel, command).then((results) => {
            if(results.length === 0){
                resolve({error: 'That command does not exist.'});
            }
            else{
                db.discordcommands.update({channel: channel, command: command}, {text: text}, (err, results) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(results);
                    }
                });
            }
        }, (err) => {
            reject(err);
        })
    });
}
exports.editCommand = editCommand;

function getAllCommands(channel){
    return new Promise((resolve, reject) => {
        db.discordcommands.find({channel: channel}, {}, (err, results) => {
            if(err){
                reject(err)
            }
            else{
                resolve(results);
            }
        });
    });
}
exports.getAllCommands = getAllCommands;

function getCommand(channel, command){
    return new Promise((resolve, reject) => {
        db.discordcommands.find({channel: channel, command: command, active: '1'}, {}, (err, results) => {
           if(err){
               reject(err);
           }
           else if(results.length === 0){
               resolve({error: 'That command does not exist or is disabled.'});
           }
           else{
               resolve(results);
           }
        });
    });
}
exports.getCommand = getCommand;

function checkForCommand(channel, command){
    return new Promise((resolve, reject) => {
        db.discordcommands.find({channel: channel, command: command}, {}, (err, results) => {
            if(err){
                reject(err);
            }
            else{
                resolve(results);
            }
        });
    });
}