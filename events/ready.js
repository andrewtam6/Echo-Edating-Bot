const Mongo = require('../utils/Mongo');

module.exports = {
    once: true,
    async execute(client) {
        client.user.setStatus('dnd');
        client.user.setPresence({activities: [{name: `Find people to connect with over discord!`}]});
    
        console.log(`Logged in as ${client.user.tag}`);
        Mongo.init();
    }
}