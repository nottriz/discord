import { MessageEmbed } from "discord.js";

export default {
    name: 'userinfo',
    usage: 'n!userinfo [@user-mention / user_id]',
    description: 'Shows information about a user account.',
    permissions: 'MANAGE_GUILD',
    requiredArgs: '[user]',
    hidden: false,
    run(client, message, args) {
        message.delete({ timeout: 1000 });

        if (message.author.id !== client.config.botOwnerId && this.permissions.indexOf(message.member.permissions) < 0) return message.reply(`You must have one of the following permissions to use this command: \`${this.permissions}\``).then(m => m.delete({ timeout: 1000 * 10 }))

        const embed = new MessageEmbed()
            .setFooter(`Request by ${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
            .setTimestamp()
            .setColor(message.member.displayHexColor)

        let perms, roles = [];

        if (!args[0]) {

            roles = message.member.roles.cache.map(r => r.name);
            perms = message.member.permissions.toArray();

            const currentUser = {
                memArr: [
                    `• Nickname: \`\`\`${message.member.nickname ? message.member.nickname : 'None'}\`\`\``,
                    `• Roles: \`\`\`${roles.length > 1 ? roles.sort().join('\n') : roles[0] || 'None'}\`\`\``,
                    `• Permissions: \`\`\`${perms.sort().join('\n')}\`\`\``,
                    `• Joined: \`\`\`${message.member.joinedAt}\`\`\``,
                    `• Activity: \`\`\`${message.member.presence.activities[0] ? message.member.presence.activities[0].name : 'None'}\`\`\``
                ],
                userArr: [
                    `• ID: \`\`\`${message.author.id}\`\`\``,
                    `• Username: \`\`\`${message.author.tag}\`\`\``,
                    `• Created: \`\`\`${message.author.createdAt}\`\`\``,
                    `• Status: \`\`\`${message.member.presence.status ? message.member.presence.status : 'None'}\`\`\``
                ]
            }

            embed.setThumbnail(message.author.displayAvatarURL())
            embed.addField('❯ Member Details', currentUser.memArr.join('\n'))
            embed.addField('❯ User Details', currentUser.userArr.join('\n'))
            return message.channel.send(embed)
        } else {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            roles = member.roles.cache.map(r => r.name);
            perms = member.permissions.toArray();

            const chosenUser = {
                memArr: [
                    `• Nickname: \`\`\`${member.nickname ? member.nickname : 'None'}\`\`\``,
                    `• Roles: \`\`\`${roles.length > 1 ? roles.sort().join('\n') : roles[0] || 'None'}\`\`\``,
                    `• Permissions: \`\`\`${perms.sort().join('\n')}\`\`\``,
                    `• Join \`\`\`${member.joinedAt || '-'}\`\`\``,
                    `• Activity: \`\`\`${member.presence && member.presence.activities[0] ? member.presence.activities[0].name : 'None'}\`\`\``
                ],
                userArr: [
                    `• ID: \`\`\`${member.user.id}\`\`\``,
                    `• Username: \`\`\`${member.user.tag}\`\`\``,
                    `• Created: \`\`\`${member.user.createdAt}\`\`\``,
                    `• Status: \`\`\`${member.user.presence.status ? member.user.presence.status : 'None'}\`\`\``
                ]
            }

            embed.setThumbnail(member.user.displayAvatarURL())
            embed.addField('❯ Member Details', chosenUser.memArr.join('\n'))
            embed.addField('❯ User Details', chosenUser.userArr.join('\n'))
            return message.channel.send(embed)
        }
    }
}