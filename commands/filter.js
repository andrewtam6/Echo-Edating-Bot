const { MessageEmbed } = require("discord.js");
const { primary_color } = require('../config.json')

module.exports = {
    category: 'Filter',
    description: 'Sets your filters',
    aliases: ['f'],

    options: [
        {
            name: 'option',
            description: 'The option you wish to edit',
            required: true,
            type: 'STRING'
        },
        {
            name: 'value',
            description: 'The value you wish to edit',
            required: true,
            type: 'STRING'
        }
    ],

    slash: true,
    testOnly: true,

    callback: ({ interaction, args }) => {
        const [option, value] = args;
        const validOptions = ['edit'];
        /**
         * To-Do:
         * Load Profiles through a function in the 
         */
        
    },
}