const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');
const { version } = require('../../package.json');

class StatsCommand extends Command {
    constructor() {
        super('stats', {
            aliases: ['stats', 'statistics']
        });

        this.help = {
            'help': {
                name: 'Stats',
                description: 'Shows some stats about the Bot.',
                category: 'General',
                usage: '--stats',
                aliases: '--statistics',
                DMs: 'Yes.',
                UserPerms: 'No extra perms required.',
                KantanPerms: 'Send Messages in channel.'
            }
        };
    }

    async exec(msg) {

        const startTime = Date.now();
        const statsMsg = await msg.channel.send('Doing Stuff...')
        console.log('Pinging!');
        const endTime = Date.now();
        const ping = Math.round(endTime - startTime);

        const lastRestart = this.client.readyAt.toISOString().replace(/z|t/gi, ' ').trim();

        const totalMemUsage = Object.entries(process.memoryUsage())
            .map(
                ([key, value]) =>
                `${key}: ${Math.round(value / 1024 / 1024 * 100) / 100} MB`
            )
            .join('\n');

        const guildInfo = stripIndents `
    Guilds: ${this.client.guilds.size}
    Channels: ${this.client.channels.size}
    `;

        const cpuUsage = String(process.cpuUsage().system / 1000000) + '%';

        const statsEmbed = this.client.util.embed()
            .setTitle(`Kantan Version ${version}`)
            .setColor('#00fff8')
            .setTimestamp()
            .setThumbnail(this.client.user.avatarURL())
            .addField('Ping', ping, true)
            .addField('Memory Usage', totalMemUsage, true)
            .addField('Last restart', lastRestart, true)
            .addField('Guild Infos', guildInfo, true)
            .addField('CPU Usage', cpuUsage, true);
        statsMsg.edit({ embed: statsEmbed });
    }
}

module.exports = StatsCommand;