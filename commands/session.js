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
        const validSubcommands = ['help', 'start', 'settings'];
        const [subcommand] = args;

        if (subcommand.toLowerCase() == "help" || !validSubcommands.contains(subcommand)) {
            const helpEmbed = new MessageEmbed()
                .setColor(primary_color)
                .setTitle('Sessions | Help Embed')
                .setDescription('This is the help embed for the sessions subcommands! To utilize these, type /session <subcommand>')
                .addFields(
                    {name: 'start', value: "Starts a session by dming you an embed to show you profiles to swipe on!"},
                    {name: 'settings', value: "Allows you to adjust what profiles you see by things such as location, games played, and age."},

                )
            interaction.reply({embeds: [helpEmbed], content: `<@${interaction.user.id}>`})
        } 
        
        interaction.reply('Test!');
    },
}