const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
                category: 'general',
                aliases: ['ping', 'pong'],
                typing: true
            });

            this.help = {
                'help': {
                    name: 'Ping',
                    description: 'Checks the latency of the Bot.',
                    category: 'General',
                    usage: '--ping',
                    aliases: '--pong',
                    DMs: 'Yes.',
                    UserPerms: 'No extra perms required.',
                    KantanPerms: 'Send Messages in channel.'
                }
            };
    }

    async exec(msg) {
        

        let Os = 'o',
            Is = 'i';

        for (let x = 0; x < ping / 4; x++) {
            Os += 'o';
            Is += 'i';
        }

        const pingEmbed = this.client.util.embed()
            .setColor('#00fff8')
            .setTimestamp()
            .setThumbnail(this.client.user.avatarURL())
            .setFooter('© Striker#1337');

        msg.content == '--ping' ? pingEmbed.addField(`P${Os}ng!`, `${ping} ms`) : pingEmbed.addField(`P${Is}ng!`, `${ping} ms`);
        console.log(`Pinged by ${msg.author.tag}`);
        return message.edit('', {
            embed: pingEmbed,
        });
    }
}

module.exports = PingCommand;