const { MessageEmbed } = require("discord.js");
const { primary_color } = require('../config.json');
const { embed } = require("../utils/util");

module.exports = {
    category: 'Main Functions',
    description: 'Starts a swiping session',
    aliases: ['s'],

    slash: true,
    testOnly: true,

    callback: ({ interaction }) => {
        
        /**
         * To-Do:
         * Load Profiles through a function in the 
         */

        interaction.deferReply();
        interaction.user.send({embeds: [embed('')]})
        
    },
}