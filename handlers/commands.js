module.exports.registerCommands = (client) => {
    const loadDir = (dir) => {
        const commands = client.fs.readdirSync(`./commands/${dir}`).filter((file) => file.endsWith('.js'));
        for (const file of commands) {
            const pull = require(`../commands/${dir}/${file}`);
            if (pull.name) client.commands.set(pull.name, pull);
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => {
                client.aliases.set(alias, pull.name);
            });
        }
    }
    ["general", "administration", "music"].forEach(e => loadDir(e));
}