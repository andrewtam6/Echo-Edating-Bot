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
            interaction.reply({ephemeral: true, embeds: [helpEmbed], content: `<@${interaction.user.id}>`})
        } else if (subcommand.toLowerCase() == "create") {
            const questions = ['What is your gender?', 'How old are you?', 'What image would you like to use for your profile. Be sure to use a url.', 'What would you like your bio to be?']
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
            
            // Confirms the user does not already have a profile
            if (await ProfileClass.hasProfile(interaction.user.id) == true) return interaction.reply({ephemeral: true, embeds: [embed('error', 'You already have a profile!')]});
            
            // To ensure the interaction doesn't time out.
            interaction.deferReply({ ephemeral: true });


            // Message collector
            const msg = await interaction.user.send({embeds: [embed('profile', 'Starting Profile Creation...')]}).catch(err => { interaction.reply({embeds: [embed('error', 'Error dming you on discord. Do you have dms on?')]}); return; });
            const filter = (m) => { return m.author.id === interaction.user.id };
            const collector = await msg.channel.createMessageCollector({
                filter,
                time: 60e3
            });

            // Makes the message show the first question
            msg.edit({embeds: [embed('profile', questions[0])]})


            collector.on('collect', async (message) => {
                // Collector logic


                if (!message.attachments.length > 0) {
                    if (i == 2 && !isImage(message)) {
                        interaction.user.send({embeds: [embed('error', 'You must input a valid image url.')]})
                    } else {
                        if (i == 1 && isNaN(parseInt(message))) {
                            interaction.user.send({embeds: [embed('error', 'You must input a valid age.')]})
                        } else {
                            if (i < questions.length - 1) { 
                                responses.push(message.content);
                                msg.edit({embeds: [embed('profile', questions[i + 1])]});
                                i++;
                            } else {
                                responses.push(message.content);
                                collector.stop();
                                i == 0;
                                msg.edit({embeds: [embed('profile', 'You have answered the questions and your profile has successfully been created!')]})
                            }
                        }
                    }
                } else {
                    interaction.user.send({embeds: [embed('error', 'You must not add attachments to your messages. Please instead use image urls for images!')]})
                } 
               
            });

            collector.on('end', () => {
                ProfileClass.create(interaction.user.id, responses[0], responses[1], responses[2], responses[3]);



                interaction.editReply({embeds: [embed('success', 'Successfully created a profile!')]});
            });


        } else if (subcommand.toLowerCase() == "view") {
            if (!ProfileClass.hasProfile(interaction.user.id)) return interaction.reply({embeds: [embed('error', 'You do not have a profile.')]})

            const profile = ProfileClass.getProfile(interaction.user.id);

            const embed = new MessageEmbed()
                .setColor(primary_color)
                .setTitle(`Your Profile`)
                .setDescription('This is your profile!')
                .setThumbnail(profile.mainProfileImage)
                .setTimestamp()
                .addFields(
                    {name: 'Age', value: profile.age},
                    {name: 'Bio', value: profile.bio}
                )
        }
        
    },
}

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}