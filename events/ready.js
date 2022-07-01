const Mongo = require('../utils/Mongo');

module.exports = {
    once: true,
    async execute(client) {
        client.user.setStatus('dnd');
        client.user.setPrescence({activities: [{name: `Find people to connect with over discord!`, type: 'WATCHING'}]});
    
        console.log(`Logged in as ${client.user.tag}`);
        Mongo.init();
    }
}