var Promise = require('bluebird');
var db = require('../../config/database');

function addChannel(channel){
    return new Promise((resolve, reject) => {
        db.channels.find({channelname: channel}, function(err, ch){
            if(err){
                reject(err);
            }
            else{
                if(ch.length === 0){
                    db.channels.insert({channelname: channel}, function(err, inserted){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(inserted);
                        }
                    });
                }
                else if(ch[0].active === '0'){
                    db.channels.update({channelname: channel},{active: 1}, function(err, updated){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(updated);
                        }
                    });
                }
                else{
                    resolve([{error: 'The bot is already active in that channel. If this is an error please use !leave and then !join again.'}]);
                }
            }
        });
    });
}
exports.addChannel = addChannel;

function removeChannel(channel){
    return new Promise((resolve, reject) => {
        db.channels.find({channelname: channel}, function(err, ch){
            if(ch.length === 0){
                resolve([{error: 'The bot is not currently active in that channel.'}]);
            }
            else if(ch[0].active === '0'){
                resolve([{error: 'The bot is not currently active in that channel.'}]);
            }
            else if(ch[0].active === '1'){
                db.channels.update({channelname: channel}, {active: 0}, function(err, updated){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(updated);
                    }
                });
            }
        });
    });
}
exports.removeChannel = removeChannel;

function getAllChannels(active){
    return new Promise((resolve, reject) => {
        if(active !== undefined) {
            db.channels.find({active: active}, function (err, channels) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(channels);
                }
            });
        }
        else{
            db.channels.find(function (err, channels) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(channels);
                }
            });
        }
    });
}
exports.getAllChannels = getAllChannels;

function getCommand(channel, command) {
    return new Promise((resolve, reject) => {
        db.commands.find({channel: channel, command: command}, function (err, comm) {
            if(err){
                reject(err);
            }
            else if(comm.length === 0){
                resolve([{error: 'Command \'' + command + '\' does not exist.'}]);
            }
            else if(comm[0].active === '0'){
                resolve([{error: 'Command \'' + command + '\' is not active.'}]);
            }
            else{
                resolve(comm);
            }
        });
    });
}
exports.getCommand = getCommand;

function getCommands(channel){
    return new Promise((resolve, reject) => {
        db.channels.find({channelname: channel}, function(err, chan){
            if(err){
                reject(err);
            }
            else if(chan.length === 0){
                resolve([{error: 'The channel does not have any commands.'}]);
            }
            else {
                db.commands.find({channel: channel}, function (err, commands) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(commands);
                    }
                });
            }
        });
    });
}
exports.getCommands = getCommands;

function addCommand(channel, command, type, permissions, message){
    return new Promise((resolve, reject) => {
        db.channels.find({channelname: channel}, function(err, chan){
            if(err){
                reject(err);
            }
            else if(chan.length === 0){
                resolve([{error: 'The provided channel doesnt exist.'}]);
            }
            else {
                db.commands.find({channel: channel, command: command}, function (err, comm) {
                    if (err) {
                        reject(err);
                    }
                    else if (comm.length === 1) {
                        resolve([{error: 'That command already exists.'}]);
                    }
                    else {
                        db.commands.insert({
                            channel: channel,
                            command: command,
                            type: type,
                            permissions: permissions,
                            message: message
                        }, function (err, inserted) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve([inserted]);
                            }
                        });
                    }
                });
            }
        });
    });
}
exports.addCommand = addCommand;

function editCommand(channel, command, message) {
    return new Promise((resolve, reject) => {
        db.commands.find({channel: channel, command: command}, function(err, comm){
            if(err){
                reject(err);
            }
            else if(comm.length === 0){
                resolve([{error: 'The command \'' + command + '\' does not exist.'}]);
            }
            else{
                db.commands.update({channel: channel, command: command}, {message: message}, function(err, updated){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve([updated]);
                    }
                });
            }
        });
    });
}
exports.editCommand = editCommand;

function editPermissions(channel, command, permissions){
    return new Promise((resolve, reject) => {
        db.commands.find({channel: channel, command: command}, function(err, comm){
            if(err){
                reject(err);
            }
            else if(comm.length === 0){
                resolve([{error: 'The command \'' + command + '\' does not exist.'}]);
            }
            else if(comm[0].permissions === permissions){
                resolve([{error: 'The command \'' + command + '\' already has that permission level.'}]);
            }
            else{
                db.commands.update({channel: channel, command: command}, {permissions: permissions}, function(err, updated){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve([updated]);
                    }
                });
            }
        });
    });
}
exports.editPermissions = editPermissions;

function disableCommand(channel, command){
    return new Promise((resolve, reject) => {
        db.commands.find({channel: channel, command: command}, function(err, comm){
            if(err){
                reject(err);
            }
            else if(comm.length === 0){
                resolve([{error: 'The command \'' + command + '\' does not exist.'}]);
            }
            else if(comm[0].active === '0'){
                resolve([{error: 'The command \'' + command + '\' is already disabled.'}]);
            }
            else if(comm[0].active === '1'){
                db.commands.update({channel: channel, command: command}, {active: 0}, function(err, updated){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve([updated]);
                    }
                });
            }
        });
    });
}
exports.disableCommand = disableCommand;

function enableCommand(channel, command){
    return new Promise((resolve, reject) => {
        db.commands.find({channel: channel, command: command}, function(err, comm){
            if(err){
                reject(err);
            }
            else if(comm.length === 0){
                resolve([{error: 'The command \'' + command + '\' does not exist.'}]);
            }
            else if(comm[0].active === '1'){
                resolve([{error: 'The command \'' + command + '\' is already enabled.'}])
            }
            else if(comm[0].active === '0'){
                db.commands.update({channel: channel, command: command}, {active: 1}, function(err, updated){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve([updated]);
                    }
                });
            }
        });
    });
}
exports.enableCommand = enableCommand;

function removeCommand(channel, command){
    return new Promise((resolve, reject) => {
        db.commands.find({channel: channel, command: command}, function(err, comm){
            if(err){
                reject(err);
            }
            else if(comm.length === 0){
                resolve([{error: 'The command \'' + command + '\' does not exist.'}]);
            }
            else{
                db.commands.destroy({channel: channel, command: command}, function(err, destroyed){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(destroyed);
                    }
                });
            }
        });
    });
}
exports.removeCommand = removeCommand;

/*addChannel('jipsnip').then((result) => {
   console.log('adding jipsnip result', result);
});
addChannel('mrkmattos').then((result) => {
    console.log('adding mrkmattos result', result);
});
addChannel('definitelynotjipsnip').then((result) => {
    console.log('adding definitelynotjipsnip result', result);
});

addCommand('mrkmattos', 'info', 'text', 'General', 'This is an info message').then((result) => {
    console.log('adding info command to mrkmattos', result);
    addCommand('mrkmattos', 'info', 'text', 'General', 'This is an info message').then((result) => {
        console.log('adding duplicate command to mrkmattos', result);
    });
});

addCommand('jipsnip', 'social', 'text', 'General', 'This is a social media message').then((result) => {
    console.log('adding social command to jipsnip', result);
});

addCommand('jipsnip', 'info', 'text', 'General', 'This is an info message').then((result) => {
    console.log('adding info command to jipsnip', result);
});

setTimeout(() => {
    addChannel('jipsnip').then((result) => {
        console.log('adding jipsnip again result', result);
    });

    removeChannel('mrkmattos').then((result) => {
        console.log('removing mrkmattos result', result);
    });

    getAllChannels().then((result) => {
        console.log('getting all channels', result);
    });

    getAllChannels(1).then((result) => {
        console.log('getting active channels', result);
    });

    addCommand('1234abcd', 'info', 'text', 'General', 'This is an info message').then((result) => {
        console.log('adding command to non-existant channel', result);
    });

    getCommand('jipsnip', 'social').then((result) => {
        console.log('getting jipsnips social command', result);
    });

    getCommand('jipsnip', 'asdflkj').then((result) => {
        console.log('getting non-existant command', result);
    });

    getCommands('jipsnip').then((result) => {
        console.log('getting all of jipsnips commands', result);
    });

    getCommands('asdfd').then((result) => {
        console.log('getting all of non existant user commands', result);
    });

    disableCommand('jipsnip', 'info').then((result) => {
        console.log('disabling info command for jipsnip', result);
        disableCommand('jipsnip', 'info').then((result) => {
            console.log('disabling an already disabled command', result);
            enableCommand('jipsnip', 'info').then((result) => {
                console.log('re enabling the info command', result);
                enableCommand('jipsnip', 'info').then((result) => {
                    console.log('enabling already enabled command', result);
                });
            });

        });
    });

    disableCommand('jipsnip', 'asdfsadgs').then((result) => {
        console.log('disabling a nonexistant command', result);
    });

    enableCommand('jipsnip', 'info').then((result) => {
        console.log('enabling an already enabled command', result);
    });

    enableCommand('jipsnip', 'asdfasdg').then((result) => {
        console.log('enabling a nonexistant command', result);
    });

    editCommand('jipsnip', 'info', 'This is the edited info command.', 'Mod').then((result) => {
        console.log('editing jipsnips info command', result);
    });

    editCommand('jipsnip', 'asdgsadg', 'This is the edited info command.', 'Mod').then((result) => {
        console.log('editing non existant command', result);
    });

    removeCommand('jipsnip', 'social').then((result) => {
        console.log('removing jipsnips social command', result);
    });

    removeCommand('jipsnip', 'adfsdagdsag').then((result) => {
        console.log('removing non existant command', result);
    });

}, 7500);*/