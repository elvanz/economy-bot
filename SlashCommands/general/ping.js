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
        const { client } = require('../../index');

        await ctx.defer();

        return void ctx.sendFollowUp({ content: `BOT ping is ${client.ws.ping}ms`});
    }
}