const Mongo = require('../utils/Mongo');
const WOKCommands = require('wokcommands');
const path = require('path');

module.exports = {
    once: true,
    async execute(client) {
        client.user.setStatus('dnd');
        client.user.setPresence({activities: [{name: `Find people to connect with over discord!`}]});
    
        console.log(`Logged in as ${client.user.tag}`);
        Mongo.init();

        new WOKCommands(client, {
            commandsDir: path.resolve('', 'commands')
        })
    }
}