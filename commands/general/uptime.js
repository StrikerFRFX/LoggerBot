const moment = require('moment');
require('moment-duration-format');
const { Command } = require('discord-akairo');

class UptimeCommand extends Command {
    constructor() {
        super('uptime', {
                aliases: ['uptime']
            }),

            this.help = {
                'help': {
                    name: 'Uptime',
                    description: 'Returns how long LoggerBot has been online for',
                    category: 'Main',
                    usage: '--uptime',
                    aliases: 'None',
                    DMs: 'Yes',
                    UserPerms: 'None',
                    BotPerms: 'Send Messages'
                }
            };
    }

    exec(msg) {
        const embed = this.client.util.embed()
            .setTitle('Uptime')
            .setDescription(moment.duration(this.client.uptime).format(' D [days], H [hours], m [minutes], s [seconds]'))
            .setColor('#00fff8')
            .setThumbnail(this.client.user.avatarURL())
            .setTimestamp();
        msg.channel.send({
            embed,
        });
    }
}

module.exports = UptimeCommand;