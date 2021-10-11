module.exports = {
    name: 'ping',
    aliases: ['pong'],
    description: 'Checks BOT Websocket Ping',
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[]} args
     */
    run: async (client, message, args) => {
        const embed = client.embed({description: `${Math.round(client.ws.ping)}ms`, color: 0x0099ff});

        message.channel.send({embeds: [embed]}).then(message.delete());
    }
}