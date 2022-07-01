const Discord = require('discord.js');
const client = new Discord.Client({ intents: new Discord.Intents(32767) });

require('dotenv').config();

client.commands = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

client.login(process.env.TOKEN);
