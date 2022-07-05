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

    callback: async ({ interaction, args }) => {
        const [option, value] = args;
        const validOptions = ['age_range', 'gender'];

        if (!validOptions.includes(option)) return interaction.reply({ephemeral: true, embeds: [embed('error', `Invalid Option. Valid options: ${validOptions.toString()}`)]})
        
        const currentFilter = await SettingsClass.getFilter(interaction.user.id);
        
        if (option == validOptions[0]) {
            if (!isAgeRange(value)) return interaction.reply({ephemeral: true, embeds: [embed('error', 'Invalid age range. Please use this format: "number-number"')]});

            const values = value.split('-');
            if (values.length != 2) return interaction.reply({ephemeral: true, embeds: [embed('error', 'Invalid age range. Please use this format: "number-number"')]});

            if (parseInt(values[0]) < 13) return interaction.reply({ephemeral: true, embeds: [embed('error', 'Invalid filter. Discord ToS does not allow people under the age of 13 to use Discord.')]})

            if (currentFilter.isUnderEighteen == false) {
                if (parseInt(values[0]) < 18) return interaction.reply({ephemeral: true, embeds: [embed('error', 'Invalid filter. Users 18 and over can not match with users that are under the age of 18.')]})

            } else if (currentFilter.isUnderEighteen == true) {
                if (parseInt(values[1]) > 18) return interaction.reply({ephemeral: true, embeds: [embed('error', 'Invalid filter. Users 18 and over can not match with users that are under the age of 18.')]})

            }
            // if (p)
        } else if (option == validOptions[1]) {
            
        }
        /**
         * To-Do:
         * Load Profiles through a function in the 
         */
        
    },
}

function isAgeRange(str) {
    return /^[1-9]?\d|[1-9]$/.test(str);
}