const Discord = require('discord.js');
const client = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) }});

client.mongoose = require('./utils/mongoose.js')

require('dotenv').config();

client.commands = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

client.login(process.env.TOKEN);
