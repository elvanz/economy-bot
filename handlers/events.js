module.exports.registerEvents = (client) => {
    const loadDir = (dir) => {
        const eventFiles = client.fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`../events/${dir}/${file}`);
            let eventName = file.split(".")[0];
            console.log(`Registering event: ${eventName}`);
            client.on(eventName, event.bind(null, client));
        }
    }
    ["client", "guild"].forEach(e => loadDir(e));
}