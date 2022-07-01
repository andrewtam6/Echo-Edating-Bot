module.exports = {
    category: 'Main Functions',
    description: 'Starts a session',
    slash: true,
    testOnly: true,

    callback: ({ message, interaction }) => {
        interaction.reply('Test!');
    },
}