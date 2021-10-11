module.exports = {
    name: 'help',
    aliases: ['hlp', 'bantu'],
    description: 'View all available commands',
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[]} args
     */
    run: async (client, message, args) => {
        const embed = client.embed({
            color: 0x0099ff,
            author: {
                name: 'Available Commands',
                icon_url: client.user.displayAvatarURL()
            },
            fields: [
                {
                    name: 'help',
                    value: 'View all available commands'
                },
                {
                    name: 'ping',
                    value: 'Checks BOT Websocket Ping'
                }
            ],
            footer: {
                text: `My prefix in this server is ${client.prefix}`
            }
        });

        message.channel.send({embeds: [embed]}).then(message.delete());
    }
}