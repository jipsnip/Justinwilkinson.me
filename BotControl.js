var tmi = require('tmi.js');
var reserved = ['!info', '!help', '!commands', '!add', '!remove', '!edit', '!disable', '!enable', '!leave', '!join', '!set', '!shoutout'];
var permissions = ['public', 'mod', 'subscriber', 'broadcaster'];
var BotDAO = require('./lib/dao/TwitchBotDAO');

const info = 'This is a bot built in Node.JS using the tmi.js package. To see the basic commands type !help.';
const help = 'Basic commands: !info, !leave, !add, !remove, !enable, !disable, !edit, !set, !commands. To see their usages go to JustinWilkinson.me/TwitchBot';

var options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: 'redacted',
        password: 'redacted'
    },
    channels: []
};

/**
 * On startup look for all channels in the channels list that are active. Then tell the bot to join all those channels.
 */
BotDAO.getAllChannels(1).then((result) => {

    var channels = [];
    result.forEach((v) => {
        channels.push(v.channelname);
    });
    options.channels = channels;

    var client = new tmi.client(options);
    client.connect();

    client.on('connected', (address, port) => {
        console.log('Connected to: ' + address + ' on port: ' + port);
    });

    /**
     * On receiving a ping from the server send back a response to avoid being timed out.
     */
    client.on('ping', () => {
        client.ping().then(() => {
            console.log('Sent back PONG');
        }, (err) => {
            console.log(err);
        });
    });

    /**
     * Run when a channel the bot is in receives a new message.
     * @param channel - Channel the message was sent in
     * @param userstate - User information for the person that sent it
     * @param message - Actual message that was sent
     * @param self - Boolean telling if it was the bot that sent the message
     *
     * Determines if the message was a command, if not return immediately, else determine if it is
     * a reserved command or if it should be looked up.
     */
    client.on('chat', (channel, userstate, message, self) => {
        if (self) {
            return;
        }
        console.log('channel', channel);
        console.log('userstate', userstate);
        console.log('message', message);
        if (message.charAt(0) !== '!') {
            console.log('was not a command');
            return;
        }
        else {
            if (reserved.includes(message.split(' ')[0])) {
                handleReserved(channel, userstate, message);
            }
            else {
                lookupCommand(channel, userstate, message);
            }
        }
    });


    /**
     * Determines which reserved command was called and deals with it accordingly.
     * @param channel - Channel message was sent in
     * @param userstate - User info for the messager
     * @param message - Message sent
     */
    function handleReserved(channel, userstate, message) {
        switch (message.split(' ')[0]) {
            case '!info':
                getInfo(channel, userstate);
                break;
            case '!help':
                getHelp(channel, userstate);
                break;
            case '!commands':
                getCommands(channel, userstate);
                break;
            case '!add':
                addCommand(channel, userstate, message);
                break;
            case '!remove':
                removeCommand(channel, userstate, message);
                break;
            case '!disable':
                disableCommand(channel, userstate, message);
                break;
            case '!enable':
                enableCommand(channel, userstate, message);
                break;
            case '!edit':
                editCommand(channel, userstate, message);
                break;
            case '!set':
                editPermissions(channel, userstate, message);
                break;
            case '!leave':
                removeBot(channel, userstate);
                break;
            case '!join':
                addBot(channel, userstate);
                break;
            case '!shoutout':
                shoutoutUser(channel, userstate, message);
                break;
        }
    }

    /**
     * Function run when a user issues a comand that is not reserved.
     * @param channel - Channel message was sent in
     * @param userstate - User info for messager
     * @param message - Actual message
     *
     * Looks up the commands for provided channel and displays the response.
     */
    function lookupCommand(channel, userstate, message) {
        BotDAO.getCommand(channel, message.split(' ')[0]).then((result) => {
            if (result.length === 1) {
                if (Object.keys(result[0]).includes('error')) {
                    client.action(channel, '@' + userstate.username + ' ' + result[0].error).then((done) => {
                        console.log('message sent successfully.');
                    }, (err) => {
                        console.log(err);
                    });
                }
                else {
                    console.log(result[0]);
                    client.action(channel, '@' + userstate.username + ' ' + result[0].message).then((done) => {
                        console.log('message sent successfully');
                    }, (err) => {
                        console.log(err);
                    });
                }
            }
            else {
                client.action(channel, '@' + userstate.username + ' That command does not exist.').then((result) => {
                    console.log('message sent successfully.');
                }, (err) => {
                    console.log(err);
                });
            }
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * Makes the bot leave the channel in which the command is run.
     * @param channel - Channel in which the command is run
     * @param userstate - User who issued the command
     *
     * Checks to make sure the person issuing the command is a Moderator or the Broadcaster.
     * If they have permissions make the bot part from the room.
     */
    function removeBot(channel, userstate) {
        if (userstate.mod || (userstate.badges !== null && userstate.badges.broadcaster === '1')) {
            BotDAO.removeChannel(channel).then((result) => {
                if (Object.keys(result[0]).includes('error')) {
                    client.action(channel, result[0].error).then((result) => {
                        console.log('message sent successfully.');
                    }, (err) => {
                        console.log(err);
                    });
                }
                else {
                    client.part(channel).then((result) => {
                        console.log('Successfully parted from ' + channel);
                        client.action(channel, '@' + userstate.username + ' The bot has successfully left the channel.').then((result) => {
                            console.log('message sent successfully.');
                        }, (err) => {
                            console.log(err);
                        });
                    }, (err) => {
                        console.log(err);
                    });
                }
            }, (err) => {
                console.log(err);
            });
        }
    }

    /**
     * Function that is run when a user types !join only in the BOTS chatroom.
     * @param channel - channel in which !join is run
     * @param userstate - user who ran !join
     *
     * If the command is not run in the configured bot chatroom then return immediately.
     * If the command is run in the bots chat then join the userstate.username's chat and display a message confirming the joining.
     */
    function addBot(channel, userstate) {
        if (channel === '#' + options.identity.username) {
            BotDAO.addChannel('#' + userstate.username).then((result) => {
                if (Object.keys(result[0]).includes('error')) {
                    client.action('#' + options.identity.username, '@' + userstate.username + ' ' + result[0].error).then((result) => {
                        console.log('message sent successfully.');
                    }, (err) => {
                        console.log(err);
                    });
                }
                else {
                    client.join('#' + userstate.username).then((result) => {
                        console.log('successfully joined #' + userstate.username);
                        client.action('#' + options.identity.username, '@' + userstate.username + ' The bot has successfully joined your channel.');
                    }, (err) => {
                        console.log(err);
                    });
                }
            }, (err) => {
                console.log(err);
            });
        }
    }

    /**
     * Function that is run with the !edit command which changes the message associated with a command.
     * @param channel - Channel in which !edit is run
     * @param userstate - User who called !edit
     * @param message - Message includes command to be edited and the edited message
     *
     * Makes sure the person using the command is a Moderator or the Broadcaster.
     * It then looks up the command and alters the message.
     * It then displays a message of Failure/Success.
     */
    function editCommand(channel, userstate, message) {
        if (!userstate.mod && !Object.keys(userstate.badges).includes('broadcaster')) {
            return;
        }
        var command = message.split(' ')[1];
        command = command.charAt(0) === '!' ? command : '!' + command;
        var text = message.substring((message.split(' ')[0].length + message.split(' ')[1].length + 2));

        BotDAO.editCommand(channel, command, text).then((result) => {
            if (Object.keys(result[0]).includes('error')) {
                client.action(channel, '@' + userstate.username + ' ' + result[0].error).then((result) => {
                    console.log('message sent successfully.');
                }, (err) => {
                    console.log(err);
                });
            }
            else {
                client.action(channel, '@' + userstate.username + ' The command \'' + command + '\' has been updated to say \'' + text + '\'.').then((result) => {
                    console.log('message sent successfully.');
                }, (err) => {
                    console.log(err);
                });
            }
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * Function that is run with the !set command which changes the permissions associated with a command.
     * @param channel - Channel in which !set is run
     * @param userstate - User who called !set
     * @param message - Message includes command to be edited and the updated permissions
     *
     * Makes sure the person using the command is a Moderator or the Broadcaster.
     * Makes sure the permission being passed in is a valid permission.
     * Looks up the command and alters the permission.
     * Displays a message of Failure/Success.
     */
    function editPermissions(channel, userstate, message) {
        if (!userstate.mod && !Object.keys(userstate.badges).includes('broadcaster')) {
            return;
        }
        var command = message.split(' ')[1];
        command = command.charAt(0) === '!' ? command : '!' + command;
        var permission = message.split(' ')[2].toLowerCase();
        if (permissions.indexOf(permission) < 0) {
            client.action(channel, '@' + userstate.username + ' That permission level is not valid. Valid permission levels are public, subscriber, mod, and broadcaster.').then((result) => {
                console.log('message sent successfully.');
            }, (err) => {
                console.log(err);
            });
        }
        else {
            BotDAO.editPermissions(channel, command, permission).then((result) => {
                if (Object.keys(result[0]).includes('error')) {
                    client.action(channel, '@' + userstate.username + ' ' + result[0].error).then((result) => {
                        console.log('message sent successfully.');
                    }, (err) => {
                        console.log(err);
                    });
                }
                else {
                    client.action(channel, '@' + userstate.username + ' Permissions for the command \'' + command + '\' successfully changed to \'' + permission + '\'.').then((result) => {
                        console.log('message sent successfully.');
                    }, (err) => {
                        console.log(err);
                    });
                }
            }, (err) => {
                console.log(err);
            });
        }
    }

    /**
     * Function that is run with the !disable command which disables a command.
     * @param channel - Channel in which !disable is run
     * @param userstate - User who ran the !disable command
     * @param message - Message that contains the command to be disabled
     *
     * Checks that the person using the command is a Moderator or the Broadcaster.
     * Looks up the command and alters the active field.
     * Displays a Failure/Success message.
     */
    function disableCommand(channel, userstate, message) {
        if (!userstate.mod && !Object.keys(userstate.badges).includes('broadcaster')) {
            return;
        }
        var command = message.split(' ')[1];
        command = command.charAt(0) === '!' ? command : '!' + command;
        BotDAO.disableCommand(channel, command).then((result) => {
            if (Object.keys(result[0]).includes('error')) {
                client.action(channel, '@' + userstate.username + ' ' + result[0].error).then((result) => {
                    console.log('message sent successfully.');
                }, (err) => {
                    console.log(err);
                });
            }
            else {
                client.action(channel, '@' + userstate.username + ' The command \'' + command + '\' has been disabled.').then((result) => {
                    console.log('message sent successfully.');
                }, (err) => {
                    console.log(err);
                });
            }
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * Function that is run with the !enable command which enables a command.
     * @param channel - Channel in which !enable is run
     * @param userstate - User who ran the !enable command
     * @param message - Message which contains the command to enable
     *
     * Checks that the user running the command is a Moderator or the Broadcaster.
     * Looks up the command and alters the active field.
     * Displays a Success/Failure message.
     */
    function enableCommand(channel, userstate, message) {
        if (!userstate.mod && !Object.keys(userstate.badges).includes('broadcaster')) {
            return;
        }
        var command = message.split(' ')[1];
        command = command.charAt(0) === '!' ? command : '!' + command;
        BotDAO.enableCommand(channel, command).then((result) => {
            if (Object.keys(result[0]).includes('error')) {
                client.action(channel, '@' + userstate.username + ' ' + result[0].error).then((result) => {
                    console.log('message sent successfully.');
                }, (err) => {
                    console.log(err);
                });
            }
            else {
                client.action(channel, '@' + userstate.username + ' The command \'' + command + '\' has been enabled.').then((result) => {
                    console.log('message sent successfully.');
                }, (err) => {
                    console.log(err);
                });
            }
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * Function that is run with the !add command which adds a new command.
     * @param channel - Channel in which the !add command is run
     * @param userstate - User who ran the !add command
     * @param message - Message which contains the command, permissions, and message of the new command
     *
     * Checks that the user running !add is a Moderator or the Broadcaster.
     * Checks that the permissions value is valid.
     * Adds a new command to the DB.
     * Displays a Failure/Success message.
     */
    function addCommand(channel, userstate, message) {
        if (!userstate.mod && !Object.keys(userstate.badges).includes('broadcaster')) {
            return;
        }
        var command = message.split(' ')[1];
        command = command.charAt(0) === '!' ? command : '!' + command;
        var permission = message.split(' ')[2].toLowerCase();
        if (permissions.indexOf(permission) < 0) {
            client.action(channel, '@' + userstate.username + ' That permission level is not valid. Valid permission levels are public, subscriber, mod, and broadcaster.').then((result) => {
                console.log('message sent successfully.');
            }, (err) => {
                console.log(err);
            });
        }
        else {
            var text = message.substring((message.split(' ')[0].length + message.split(' ')[1].length + message.split(' ')[2].length + 3));
            BotDAO.addCommand(channel, command, 'text', permission, text).then((result) => {
                console.log(result);
                if (Object.keys(result[0]).includes('error')) {
                    client.action(channel, '@' + userstate.username + ' ' + result[0].error).then((result) => {
                        console.log('message sent successfully.');
                    }, (err) => {
                        console.log(err);
                    });
                }
                else {
                    client.action(channel, '@' + userstate.username + ' The command \'' + command + '\' has been added with permission level of \'' + permission +
                        '\' and a message of \'' + text + '\'.').then((result) => {
                        console.log('message sent successfully.');
                    }, (err) => {
                        console.log(err);
                    });
                }
            }, (err) => {
                console.log(err);
            });
        }
    }

    /**
     * Function that is run with the !remove command which removes a command.
     * @param channel - Channel in which the !remove command is run
     * @param userstate - User who ran the !remove command
     * @param message - Message which contains the command to be removed
     *
     * Checks that the user running !remove is a Moderator or the Broadcaster.
     * Removes the command from the DB.
     * Displays a Failure/Success message.
     */
    function removeCommand(channel, userstate, message) {
        if (!userstate.mod && !Object.keys(userstate.badges).includes('broadcaster')) {
            return;
        }
        var command = message.split(' ')[1];
        command = command.charAt(0) === '!' ? command : '!' + command;
        BotDAO.removeCommand(channel, command).then((result) => {
            if (Object.keys(result[0]).includes('error')) {
                client.action(channel, '@' + userstate.username + ' ' + result[0].error).then((result) => {
                    console.log('message sent successfully.');
                }, (err) => {
                    console.log(err);
                });
            }
            else {
                client.action(channel, '@' + userstate.username + ' The command \'' + command + '\' has been removed.').then((result) => {
                    console.log('message sent successfully.');
                }, (err) => {
                    console.log(err);
                });
            }
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * Function run with the !info command which displays a message about the bot.
     * @param channel - Channel in which the !info command is run
     * @param userstate - User who ran the !info command
     *
     * Checks that the user running !info is a Moderator or the Broadcaster.
     * Displays the info message.
     */
    function getInfo(channel, userstate) {
        if (!userstate.mod && !Object.keys(userstate.badges).includes('broadcaster')) {
            return;
        }
        client.action(channel, '@' + userstate.username + ' ' + info).then((result) => {
            console.log('message sent successfully.');
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * Function that is run with the !help command which displays help information.
     * @param channel - Channel in which the !help command is run
     * @param userstate - User who ran the !help command
     *
     * Checks that the user running !help is a Moderator or the Broadcaster.
     * Displays the help information.
     */
    function getHelp(channel, userstate) {
        if (!userstate.mod && !Object.keys(userstate.badges).includes('broadcaster')) {
            return;
        }
        client.action(channel, '@' + userstate.username + ' ' + help).then((result) => {
            console.log('message sent successfully.');
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * Function that is run with the !commands command which displays a list of commands for a channel.
     * @param channel - Channel in which the !commands command is run
     * @param userstate - User who ran the !commands command
     *
     * Checks the DB for all commands and concatenates them together.
     * If the commands exceed a certain character limit then stop concatenating and add a ...
     * Display the information.
     */
    function getCommands(channel, userstate) {
        BotDAO.getCommands(channel).then((result) => {
            if (result.length === 0) {
                client.action(channel, '@' + userstate.username + ' This channel has no commands.').then((result) => {
                    console.log('message sent successfully.');
                }, (err) => {
                    console.log(err);
                });
            }
            else {
                var text = 'Commands: ';
                result.forEach((v) => {
                    if (text.length <= 100) {
                        text += v.command + ', ';
                    }
                });
                text = text.substring(0, text.length - 2);
                if (text.length === 98) {
                    text += '...';
                }
                client.action(channel, '@' + userstate.username + ' ' + text).then((result) => {
                    console.log('message sent successfully.');
                }, (err) => {
                    console.log(err);
                });
            }
        }, (err) => {
            console.log(err);
        });
    }

    function shoutoutUser(channel, userstate, message){
        if (!userstate.mod && !Object.keys(userstate.badges).includes('broadcaster')) {
            return;
        }
        client.action(channel, 'Go check out ' + message.split(' ')[1] + ' over at https://www.twitch.tv/' + message.split(' ')[1] + '.').then((result) => {
            console.log('message sent successfully.');
        }, (err) => {
            console.log(err);
        });
    }

}, (err) => {
    console.log(err);
});
