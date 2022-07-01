const { readdirSync } = require('fs');

module.exports = (client, Discord) => {
    const eventFiles = readdirSync('././events').filter(f => f.endsWith('.js'));
    for (const eventFile in eventFiles) {
        const event = require(`./events/${eventFiles[eventFile]}`);
        const eventName = eventFiles[eventFile].split('.')[0];
        
        if (event.once == true) {
            client.once(eventName, (...args) => event.execute(...args, client));
        } else {
            client.on(eventName, (...args) => event.execute(...args, client));
        }

    }
}