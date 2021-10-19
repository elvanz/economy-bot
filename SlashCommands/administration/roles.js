const { SlashCommand, ApplicationCommandPermissionType, CommandOptionType } = require('slash-create');

module.exports = class RolesCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'roles',
            description: 'Roles management for moderators and admins',
            // Whether to enable this command for everyone by default
            defaultPermission: false,
            // Permissions are mapped by guild ID like this
            permissions: {
                '<guild_id>': [ //Change the <guild_id> to your Server ID
                {
                    type: ApplicationCommandPermissionType.ROLE,
                    id: '<role_id>', //Moderator role id
                    permission: true
                } //Add as many roles as you want here 
                ]
            },
            options: [{
                type: CommandOptionType.SUB_COMMAND,
                name: 'add',
                description: 'Add a role to a user',
                options: [{
                    type: CommandOptionType.USER,
                    name: 'user',
                    description: 'Select the user you want to add role',
                    required: true
                  }, {
                    type: CommandOptionType.ROLE,
                    name: 'role',
                    description: 'Select the role you want to add',
                    required: true
                  }]
                },
                {
                    type: CommandOptionType.SUB_COMMAND,
                    name: 'remove',
                    description: 'Remove a role to a user',
                    options: [{
                        type: CommandOptionType.USER,
                        name: 'user',
                        description: 'Select the user you want to remove role',
                        required: true
                    }, {
                        type: CommandOptionType.ROLE,
                        name: 'role',
                        description: 'Select the role you want to remove',
                        required: true
                    }]
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [process.env.DISCORD_GUILD_ID] : undefined
        });
    }

    async run (ctx) {
        const { client } = require('../../index');

        await ctx.defer();

        const guild = client.guilds.cache.get(ctx.guild.id);
        const addUserId = ctx.options.add.options.user;
        const addRoleId = ctx.options.add.options.role;
        const removeUserId = ctx.options.remove.options.user;
        const removeRoleId = ctx.options.remove.options.role;
        const User = addUserId ? guild.members.cache.get(addUserId) : guild.members.cache.get(removeUserId);
        const Role = addRoleId ? guild.roles.cache.get(addRoleId) : guild.roles.cache.get(removeRoleId);

        ctx.options.add ? User.roles.add(Role) : User.roles.remove(Role);
        await ctx.send({content : `${Role.toString()} added to ${User.username}`});
    }
}