const { MessageEmbed } = require("discord.js");
const { primary_color } = require('../config.json')

module.exports = {
    category: 'Main Functions',
    description: 'Starts a session',
    aliases: ['s'],

    options: [
        {
            name: 'subcommand',
            description: 'The subcommand in which you would like to use',
            required: true,
            type: 'STRING'
        }
    ],

    slash: true,
    testOnly: true,

    callback: ({ interaction, args }) => {

        const validSubcommands = ['view', 'edit', 'create'];
        const [subcommand] = args;

        if (subcommand.toLowerCase() == "help" || !validSubcommands.includes(subcommand)) {
            const helpEmbed = new MessageEmbed()
                .setColor(primary_color)
                .setTitle('ℹ️ Help Embed ℹ️')
                .setDescription('This is the help embed for the sessions subcommands!')
                .addFields(
                    {name: '♦️ /profile create', value: "Starts the profile creation process in your DMs. Make sure to have dms on!"},
                    {name: '♦️ /profile view', value: "Allows you to view your own profile."},
                    {name: '♦️ /profile edit', value: "Allows you to edit your own profile."},
                )
            interaction.reply({embeds: [helpEmbed], content: `<@${interaction.user.id}>`})
        } else if (subcommand.toLowerCase() == "create") {
            /**
             * Requires you to collect:
             *  An email,
             *  
             *  Editable Things:
             *  A date of birth (WILL BE LOGGED EVERY EDIT) 
             *  A main profile image
             *  A Bio
             *  
             *  
             */
            interaction.user.send().catch(err => interaction.reply(''))


        }
        
    },
}