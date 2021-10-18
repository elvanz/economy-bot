const { SlashCommand } = require('slash-create');

module.exports = class PingCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'ping',
            description: 'Checks BOT latency',

            guildIDs: process.env.DISCORD_GUILD_ID ? [process.env.DISCORD_GUILD_ID] : undefined
        });
    }

    async run (ctx) {
        const { Client } = require('../../structures/Client');

        await ctx.defer();

        return void ctx.sendFollowUp({ content: `BOT ping is ${Client.ws.ping}ms`});
    }
}