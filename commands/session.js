const { MessageEmbed } = require("discord.js");
const { primary_color } = require('../config.json')

module.exports = {
    category: 'Main Functions',
    description: 'Starts a session',
    aliases: ['s'],

    minArgs: 1,
    expectedArgs: '<subcommand>',

    slash: true,
    testOnly: true,

    callback: ({ interaction, args }) => {
        const [subcommand] = args;

        if (subcommand.toLowerCase() == "help") {
            const helpEmbed = new MessageEmbed()
                .setColor(primary_color)
        } 
        
        interaction.reply('Test!');
    },
}