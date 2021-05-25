export default async function (client, message) {
    // Ignore all bots
    if (message.author.bot) return;

    // Ignore DMs
    if (!message.guild) return;

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0)
        return;

    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = await client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd)
        return;

    // Run the command
    cmd.default.run(client, message, args)
}