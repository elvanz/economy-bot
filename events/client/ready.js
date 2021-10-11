const { generateDocs } = require('../../handlers/docs');
module.exports = client => {
    console.log(`Logged in as ${client.user.tag}`);
    generateDocs(client.commands);
    client.user.setPresence({
        status: 'online',
        activities: [
            {
                name: 'your heart',
                type: 'PLAYING'
            }
        ]
    });
}