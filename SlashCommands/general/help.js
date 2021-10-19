const { SlashCommand } = require('slash-create');

module.exports = class HelpCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'help',
            description: 'View all availabe commands',

            guildIDs: process.env.DISCORD_GUILD_ID ? [process.env.DISCORD_GUILD_ID] : undefined
        });
    }

    async run (ctx) {
        const { Client } = require('../../index');

        await ctx.defer();

        const embed = Client.embed({title: 'Help Command', description: 'All available commands that I have'})

        return ctx.send({embeds: [embed]});
    }
}