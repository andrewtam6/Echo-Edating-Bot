const { MessageEmbed } = require('discord.js');
module.exports = {
    embed: (type, text) => {
        if (type === 'success') {
            return new MessageEmbed()
            .setDescription('✅ ' + text)
            .setColor('#77b255')
        } else if (type === 'error') {
            return new MessageEmbed()
            .setDescription('❌ ' + text)
            .setColor('#ff0000')
        } else if (type === 'info') {
            return new MessageEmbed()
            .setDescription('ℹ️ ' + text)
            .setColor('#42f2ff')
        } else if (type === 'profile') {
            return new MessageEmbed()
            .setDescription('💻 Profile System 💻 | ' + text)
            .setColor('#40f749')
            .setFooter({text: 'This will time out in 1 minute'})
        }
    }
}