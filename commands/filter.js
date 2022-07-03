const { RoomRecordingContext } = require('twilio/lib/rest/video/v1/room/recording');
const SettingsClass = require('../utils/classes/Settings');
const { embed } = require('../utils/util');

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
        const validOptions = ['age_range', 'gender'];

        if (!validOptions.contains(option)) return interaction.reply({embeds: [embed('error', `Invalid Option. Valid options: ${validOptions.toString()}`)]})
        if (option == 'age_range') {

        } else if (option == 'gender') {
            
        }
        /**
         * To-Do:
         * Load Profiles through a function in the 
         */
        
    },
}

function containsNumber(str) {
    return /[0-9]/.test(str);
}