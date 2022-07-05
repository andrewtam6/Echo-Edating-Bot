const { MessageEmbed } = require("discord.js");
const { primary_color } = require('../config.json');
const ProfileClass = require("../utils/classes/Profile");
const SettingsClass = require("../utils/classes/Settings");
const { embed, format } = require("../utils/util");

module.exports = {
    category: 'Main Functions',
    description: 'Allows you to manage profile-related things',
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

    callback: async ({ interaction, args, client }) => {

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
            const questions = ['What is your gender? Please input "Male", "Female," or "Other".', 'How old are you? Ex: 18', 'What image would you like to use for your profile. Be sure to use a url.', 'What would you like your bio to be?', 'What country do you live in?', 'What province/state do you live in?']
            const responses = [];

            let i = 0;

            /**
             *  Editable Things:
             *  
             *  Future Additions(that can be added through a different system):
             *     - Interests
             *     - Stats from video games such as Valorant, MC, etc    
             *     - Location
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
                time: 300e3
            });

            // Makes the message show the first question
            msg.edit({embeds: [embed('profile', questions[0])]})


            collector.on('collect', async (message) => {
                // Collector logic

                // Attachments break everything
                if (!message.attachments.length > 0) {
                    const check = await ProfileClass.checkData(i, message.content);
                    if (check != true) return interaction.user.send({embeds: [embed('error', `Invalid input. Valid inputs: ${check.validInputs.toString()}`)]}) 
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
                        
                } else {
                    interaction.user.send({embeds: [embed('error', 'You must not add attachments to your messages. Please instead use image urls for images!')]})
                } 
               
            });

            collector.on('end', async () => {  
                if ((i + 1) == questions.length) {
                    if (parseInt(responses[1]) < 18) {
                        SettingsClass.saveInitialSettings(interaction.user.id, true);
                    } else {
                        SettingsClass.saveInitialSettings(interaction.user.id, false);
                    }
                    
                    ProfileClass.create(interaction.user.id, format('gender', responses[0]), responses[1], responses[2], responses[3], interaction.user.tag, responses[5], responses[4]);
                    return interaction.editReply({ephemeral: true, embeds: [embed('success', 'Successfully created a profile!')]});
                }
                return interaction.editReply({ephemeral: true, embeds: [embed('error', 'Profile creation timed out!')]});
            });


        } else if (subcommand.toLowerCase() == "view") {
            if (!await ProfileClass.hasProfile(interaction.user.id)) return interaction.reply({ephemeral: true, embeds: [embed('error', 'You do not have a profile.')]})

            const profile = await ProfileClass.getProfile(interaction.user.id);

            const embedT = new MessageEmbed()
                .setColor(primary_color)
                .setAuthor({name: 'Echo Edating', iconURL: client.user.displayAvatarURL()})
                .setTitle(`${interaction.user.username}'s Profile`)
                .setDescription(`**Bio:** ${profile.bio}`)
                .setImage(profile.mainProfileImage.toString())
                .setTimestamp()
                .addFields(
                    {name: 'Age', value: profile.age, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true}, 
                    {name: 'Gender', value: profile.gender, inline: true},
                    {name: 'Province', value: profile.province, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true}, 
                    {name: 'Country', value: await ProfileClass.getCountryByCode(profile.country), inline: true},
                )

                .setFooter({text: 'Profile provided by Echo Edating', iconURL: client.user.displayAvatarURL()})


            interaction.reply({ephemeral: true, embeds: [embedT]})
        }
        
    },
}

