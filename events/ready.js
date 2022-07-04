const Mongo = require('../utils/Mongo');
const WOKCommands = require('wokcommands');
const path = require('path');
require('dotenv').config();

module.exports = {
    once: true,
    async execute(client) {
        client.user.setStatus('dnd');
        client.user.setPresence({activities: [{name: `Find people to connect with over discord!`}]});
    
        console.log(`Logged in as ${client.user.tag}\nCurrent version: ${process.env.VERSION}`);
        Mongo.init();

        new WOKCommands(client, {
            commandsDir: path.resolve('', 'commands'),
            testServers: ['824439264833306666']
        })
    }
}