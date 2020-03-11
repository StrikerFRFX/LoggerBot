const { Listener } = require('discord-akairo');
const superagent = require('superagent');
const prefix = '--';

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        const guilds = this.client.guilds.size;

        this.client.user.setActivity(`${prefix}help | ${guilds} servers`, {
            type: 'PLAYING',
        });

        console.log(`${this.client.user.username} is connected to the Discord WebSocket`);

        const channel = this.client.channels.get('670753607402127390');
        if (channel) channel.send(`${this.client.user.username} is now online!`);

        if (process.env.DBOTS == 'no') return;
        else {
            superagent.post('https://discordbots.org/api/bots/stats')
                .set('Authorization', process.env.DBTOKEN)
                .send({
                    server_count: this.client.guilds.size,
                })
                .then(() => console.log('Updated discordbots.org stats!'))
                .catch(err => console.error(`Error updating discordbots.org stats: ${err.body} || ${err}`));
        }
    }
}

module.exports = ReadyListener;
