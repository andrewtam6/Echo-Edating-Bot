const { MessageEmbed } = require('discord.js');
module.exports = {
    embed: (type, text) => {
        if (type === 'success') {
            return new MessageEmbed()
            .setDescription('â ' + text)
            .setColor('#77b255')
        } else if (type === 'error') {
            return new MessageEmbed()
            .setDescription('â ' + text)
            .setColor('#ff0000')
        } else if (type === 'info') {
            return new MessageEmbed()
            .setDescription('âšī¸ ' + text)
            .setColor('#42f2ff')
        } else if (type === 'profile') {
            return new MessageEmbed()
            .setDescription('đģ Profile System đģ | ' + text)
            .setColor('#40f749')
            .setFooter({text: 'This will time out in 5 minutes'})
        }
    },
    format: (type, value) => {
        if (type.toLowerCase() === 'gender') {
            return value.toLowerCase();
        } 
    }
}