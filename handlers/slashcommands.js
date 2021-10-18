const { GatewayServer } = require("slash-create");

module.exports.registerSlashCommands = (client) => {
    client.creator
                .withServer(
                    new GatewayServer(
                        (handler) => client.ws.on('INTERACTION_CREATE', handler)
                    )
                )
                .registerCommandsIn(client.path.resolve(__dirname, `../SlashCommands`))
                .syncCommands();
}