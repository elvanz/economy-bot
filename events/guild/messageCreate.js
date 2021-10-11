module.exports = (client, message) => {
    if (message.author.bot || !message.guild) return;
    if (message.mentions.has(client.user.id) && !message.mentions.everyone) {
        return message.channel.send({content: `My prefix is ${client.prefix}`});
    }
    //Verify message starting with prefix
    const verify = message.content.toLowerCase().startsWith(client.prefix);
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);

    const cmd = args.shift().toLowerCase();
    let command = client.getCommand(cmd);
    if (!command) command = client.getAliases(cmd);
    if (command && verify) return command.run(client, message, args).catch(console.error);
}