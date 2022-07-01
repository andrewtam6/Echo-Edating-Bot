const Discord = require('discord.js');
const client = new Discord.Client({ intents: new Discord.Intents(32767) });

require('dotenv').config();
require(`./handlers/event_handler`)(client, Discord)

client.commands = new Discord.Collection();

client.login(process.env.TOKEN);
