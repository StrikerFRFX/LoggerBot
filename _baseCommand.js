const { Command } = require('discord-akairo');

class NameCommand extends Command {
    constructor() {
        super('command', {
                category: 'Category',
                aliases: ['command'],
                typing: true
            }),

            this.help = {
                'help': {
                    name: 'Commmand',
                    description: 'Description',
                    category: 'Category',
                    usage: '--command',
                    aliases: 'Aliases',
                    UserPerms: 'UserPerms',
                    YugaPerms: 'Send Messages'
                }
            };
    }

    exec(msg) {
        console.log(msg.content);
    }
}

module.exports = NameCommand;