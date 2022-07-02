const { MessageEmbed } = require("discord.js");
const { primary_color } = require('../config.json')

module.exports = {
    category: 'Main Functions',
    description: 'Starts a swiping session',
    aliases: ['s'],

    options: [
    ],

    slash: true,
    testOnly: true,

    callback: ({ interaction }) => {

        /**
         * To-Do:
         * Load Profiles through a function in the 
         */
        
    },
}