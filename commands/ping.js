export default {
    name: "Ping",
    usage: 'n!ping',
    description: 'Checks latency of the bot',
    permissions: 'VIEW_CHANNEL',
    requiredArgs: '',
    hidden: false,
    run(client, message, args) {
        message.reply('Pong!')
    }
}