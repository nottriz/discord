import chalk from 'chalk';
import * as defaults from '../util/Functions.js';
import { TwitchTokenManager } from '../util/TwitchTokenManager.js';
import { TwitchStreamManager } from '../util/TwitchStreamManager.js';

export default async function (client) {
    console.log(chalk.cyan.bold(`===> ${chalk.green.bold('READY!')} <===`))

    TwitchTokenManager.import();
    TwitchTokenManager.interval(60 * 2);

    // function getGuildListToConsole(client) {
    //     console.table(client.guilds.cache.reduce((acc, guild) => {
    //         acc[guild.id] = guild.name
    //         return acc
    //     }, {}))
    // }

    // @@setPresence
    setInterval(() => {
        client.user.setPresence({ activity: { name: defaults.randomArrElement(client.activityArray) }, status: defaults.randomArrElement(client.presenceArray) })
            // .then(console.log)
            .catch(console.error);
    }, 1000 * 60);

    // Testing...
    setInterval(() => {
        if (TwitchStreamManager.testing !== true) return;
        TwitchStreamManager.post(client, {
            caster: 'commanderroot',
            guildId: '768289504603275265',
            channelId: '768956331507580948',
            msgId: '824088379796619285'
        });
    }, 1000 * 5);

    // Real-Deal...
    setInterval(() => {
        if (TwitchStreamManager.testing === true) return;
        TwitchStreamManager.post(client, { caster: 'itsjusttriz', guildId: '466402083466379267', channelId: '748288027322875976', msgId: '770312500951908432', rolePingId: '748288230545162280' });
        TwitchStreamManager.post(client, { caster: 'bmwhd1', guildId: '314737648839294986', channelId: '780914960401694741', msgId: '780915508425261056' });
        TwitchStreamManager.post(client, { caster: 'domosplace', guildId: '155849052850880513', channelId: '770293246215192617', msgId: '770293386942218270', rolePingId: '797241646454407178' });
        TwitchStreamManager.post(client, { caster: 'finncapp', guildId: '585627689612869645', channelId: '770296176565682266', msgId: '770302037169930300', rolePingId: '744403558522159144' });
        TwitchStreamManager.post(client, { caster: 'blitzyuk', guildId: '758341730575319120', channelId: '827757443118792734', msgId: '827757994078502983' });
    }, 1000 * 60 * 5);
}