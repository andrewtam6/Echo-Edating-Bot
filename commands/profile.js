const { MessageEmbed } = require("discord.js");
const { primary_color } = require('../config.json');
const ProfileClass = require("../utils/classes/Profile");
const { embed } = require("../utils/util");

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

    callback: async ({ interaction, args }) => {

        const validSubcommands = ['view', 'edit', 'create'];
        const [subcommand] = args;

        if (subcommand.toLowerCase() == "help" || !validSubcommands.includes(subcommand)) {
            const helpEmbed = new MessageEmbed()
                .setColor(primary_color)
                .setTitle('ℹ️ Help Embed ℹ️')
                .setTimestamp()
                .setDescription('This is the help embed for the sessions subcommands!')
                .addFields(
                    {name: '♦️ /profile create', value: "Starts the profile creation process in your DMs. Make sure to have dms on!"},
                    {name: '♦️ /profile view', value: "Allows you to view your own profile."},
                    {name: '♦️ /profile edit', value: "Allows you to edit your own profile."},
                )
            interaction.reply({embeds: [helpEmbed], content: `<@${interaction.user.id}>`})
        } else if (subcommand.toLowerCase() == "create") {
            interaction.deferReply({ ephemeral: true });
            const questions = ['What is your gender?', 'Please input your date of birth in mm/dd/yyyy format.', 'Please input an image url to the image you want on your profile.', 'Please input a quick description of yourself. This will be monitored.']
            const responses = [];
            let i = 0;

            /**
             *  Editable Things:
             *  A date of birth (WILL BE LOGGED EVERY EDIT) 
             *  Gender
             *  A main profile image
             *  A Bio
             *  
             *  Future Additions(that can be added through a different system):
             *     - Interests
             *     - Stats from video games such as Valorant, MC, etc    
             * 
             *  
             */
            
            if (await ProfileClass.hasProfile(interaction.user.id) == true) return interaction.user.send({embeds: [embed('error', 'You already have a profile!')]});
            
            const msg = await interaction.user.send({embeds: [embed('profile', 'Starting Profile Creation...')]}).catch(err => { interaction.reply({embeds: [embed('error', 'Error dming you on discord. Do you have dms on?')]}); return; });
            const filter = (m) => { return m.author.id === interaction.user.id };



            const collector = await msg.channel.createMessageCollector({
                filter,
                time: 60e3
            });


            collector.on('collect', async (message) => {
                /**
                 * To-do:
                 *  - Pass bio's through some sort of AI to ensure they aren't unsafe
                 *  - 
                 */


                if (i < questions.length - 1) { 
                    responses.push(message);
                    interaction.user.send({embeds: [embed('profile', questions[i + 1])]});
                    i++;
                } 
            });

            collector.on('end', () => {
                

                interaction.editReply({embeds: [embed('success', 'Successfully created a profile!')]});
            });


        }
        
    },
}