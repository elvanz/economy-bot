const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const { SlashCreator } = require('slash-create');
const { registerEvents } = require('../handlers/events');
const { registerCommands } = require('../handlers/commands');
const { registerSlashCommands } = require('../handlers/slashcommands');

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
        this.dotenv = require('dotenv');

        /**
         *  Collections
         */
        this.commands = new Collection();
        this.aliases = new Collection();
        
        /**
         *  Configs
         */
        this.dotenv.config();
        this.prefix = 'e!';
        this.creator = new SlashCreator({
            applicationID: process.env.CLIENT_ID,
            publicKey: process.env.CLIENT_PUBKEY,
            token: process.env.CLIENT_TOKEN
        });
    }
    commandHandler(client){
        registerCommands(client);
        registerSlashCommands(client);
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
    start(){
        /**
         * Handlers 
         */
        this.commandHandler(this);
        this.eventHandler(this);

        this.login(process.env.CLIENT_TOKEN);
    }
}
module.exports = EconomyBot;
