const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const { registerEvents } = require('../handlers/events');
const { registerCommands } = require('../handlers/commands');

class EconomyBot extends Client {
    constructor(){
        super({
            intents: 
            [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS
            ], 
            partials: ["MESSAGE", "CHANNEL", "REACTION"]
        });
        /*
            Dependencies
        */
        this.path = require('path'); 
        this.fs = require('fs');
        
        /**
         *  Collections
         */
        this.commands = new Collection();
        this.aliases = new Collection();
        
        /**
         *  Configs
         */
        this.prefix = 'e!';
    }
    commandHandler(client){
        registerCommands(client);
    }
    eventHandler(client){
        registerEvents(client);
    }
    getCommand(cmd){
        return this.commands.has(cmd) ? this.commands.get(cmd) : false;
    }
    getAliases(cmd){
        return this.commands.get(this.aliases.get(cmd));
    }
    embed(data){
        return new MessageEmbed(data);
    }
    start(token){
        /**
         * Handlers 
         */
        this.commandHandler(this);
        this.eventHandler(this);

        this.login(token);
    }
}
module.exports = EconomyBot;
