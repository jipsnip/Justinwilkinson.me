const Discord = require('discord.js');
var reserved = ['!commands', '!add', '!remove', '!edit', '!disable', '!enable', '!set'];
const client = new Discord.Client();
var botDAO = require('./lib/dao/DiscordBotDAO');
const token = 'redacted';

client.on('ready', () => {
    console.log('Client is now ready.');
});

client.on('message', (message) => {
    if(message.content === 'ping'){
        message.channel.send('pong');
    }
    else if(!message.author.bot){
        if(message.content.charAt(0) === '!'){
            if(reserved.includes(message.content.split(' ')[0])){
                handleReserved(message.channel.guild.name, message.channel, message.content);
            }
            else{
                getCommand(message.channel.guild.name, message.channel, message.content);
            }
        }
    }
});

client.on('messageReactionAdd', (message) => {
   console.log(message);
});

/**
 * Determines which reserved command was called and deals with it accordingly.
 * @param channel - Channel message was sent in
 * @param guild - Guild associated with command
 * @param message - Message sent
 */
function handleReserved(guild, channel, message) {
    switch (message.split(' ')[0]) {
        case '!commands':
            getCommands(guild, channel);
            break;
        case '!add':
            addCommand(guild, channel, message);
            break;
        case '!remove':
            removeCommand(guild, channel, message);
            break;
        case '!disable':
            disableCommand(guild, channel, message);
            break;
        case '!enable':
            enableCommand(guild, channel, message);
            break;
        case '!edit':
            editCommand(guild, channel, message);
            break;
    }
}

function getCommands(guild, channel){
    botDAO.getAllCommands(guild).then((results) => {
        if(results.length === 0){
            channel.send('The channel does not have any commands.');
        }
        else{
            var returnObj = [];
            results.forEach((result) => {
               returnObj.push(result.command);
            });
            channel.send(returnObj.join(', '));
        }
    }, (err) => {
        console.log(err);
    })
}

function addCommand(guild, channel, message){
    var text = message.split(' ');
    text.splice(0, 2);
    text = text.join(' ');
    botDAO.addCommand(guild, message.split(' ')[1], text).then((results) => {
        if(Object.keys(results).includes('error')){
            channel.send(results.error);
        }
        else{
            channel.send('Command successfully added.');
        }
    }, (err) => {
        console.log(err);
    });
}

function removeCommand(guild, channel, message){
    botDAO.removeCommand(guild, message.split(' ')[1]).then((results) => {
        if(Object.keys(results).includes('error')){
            channel.send(results.error);
        }
        else{
            channel.send('Command successfully removed.');
        }
    }, (err) => {
        console.log(err);
    });
}

function disableCommand(guild, channel, message){
    botDAO.disableCommand(guild, message.split(' ')[1]).then((results) => {
       if(Object.keys(results).includes('error')){
           channel.send(results.error);
       }
       else{
           channel.send('Command successfully disabled.');
       }
    }, (err) => {
        console.log(err);
    });
}

function enableCommand(guild, channel, message){
    botDAO.enableCommand(guild, message.split(' ')[1]).then((results) => {
        if(Object.keys(results).includes('error')){
            channel.send(results.error);
        }
        else{
            channel.send('Command successfully enabled.');
        }
    }, (err) => {
        console.log(err);
    });
}

function editCommand(guild, channel, message){
    var text = message.split(' ');
    text.splice(0, 2);
    text = text.join(' ');
    botDAO.editCommand(guild, message.split(' ')[1], text).then((results) => {
        if(Object.keys(results).includes('error')){
            channel.send(results.error);
        }
        else{
            channel.send('Command successfully edited.');
        }
    }, (err) => {
        console.log(err);
    });
}

function getCommand(guild, channel, message){
    botDAO.getCommand(guild, message.split(' ')[0]).then((results) => {
        if(Object.keys(results).includes('error')){
            channel.send(results.error);
        }
        else{
            channel.send(results[0].text);
        }
    }, (err) => {
       console.log(err);
    });
}

client.login(token);

