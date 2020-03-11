const { Command } = require('discord-akairo');
const path = require('path');
const fs = require('fs');
const { findCommand } = require('../../src/findCommand');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'halp'],
            args: [
            {
                id: 'cmdName',
                type: 'string'
            }],
            typing: true
        });
    }
    async exec(msg, args) {
        const cmdName = args.cmdName;
        if (cmdName) {
            const cmdHelp = findCommand(cmdName, msg, fs).help['help'];
            if (cmdHelp) {
                const help = this.client.util.embed()
                    .setAuthor(this.client.user.username)
                    .setTitle(`__Help for ${cmdHelp.name}__`)
                    .setColor('#32CD32')
                    .setThumbnail(this.client.user.avatarURL())
                    .setTimestamp()
                    .addField('Description', cmdHelp.description)
                    .addField('Category', cmdHelp.category)
                    .addField('Usage', cmdHelp.usage)
                    .addField('Aliases', cmdHelp.aliases)
                    .addField('Can be used in DMs?', cmdHelp.DMs)
                    .addField('User Required Perms', cmdHelp.UserPerms)
                    .addField('Kantan\'s Required Perms', cmdHelp.KantanPerms)
                    .setFooter('© Striker#1337 ||  JT Development');
                return msg.channel.send({
                    embed: help,
                });
            } else {
                return msg.reply('Sorry, that command doesn\'t exist');
            }
        } else {
           // const FunCommands = fs.readdirSync('./commands/Fun').map(file => path.basename(file, path.extname(file)));
            const GeneralCommands = fs.readdirSync('./commands/general').map(file => path.basename(file, path.extname(file)));
            //const ModerationCommands = fs.readdirSync('./commands/Moderation').map(file => path.basename(file, path.extname(file)));
            //const UtilCommands = fs.readdirSync('./commands/Util').map(file => path.basename(file, path.extname(file)));
            const helpString = `
            __**Kantan's Commands**__\n
            Kantan is an easy to use and simplistic Discord Bot.
            You can even use some commands in your DMs!
            If you need more details on any of the commands listed, use \`--help <command>\`
            If you need any further help, you can always join the support server and make a ticket (Server listed with \`--support\`).
            `;

            const help = this.client.util.embed()
                .setDescription(helpString)
                .addField('__**General Commands**__', GeneralCommands)
                .setFooter('© Striker#1337 ||  JT Development.')
                .setColor('#00fff8');

            await msg.author.send(help);
            //await msg.author.send(`\`\`\`=== Moderation Commands ===\n${ModerationCommands}\`\`\``);
            //await msg.author.send(`\`\`\`=== Fun Commands ===\n${FunCommands}\`\`\``);
            //await msg.author.send(`\`\`\`=== Util Commands ===\n${UtilCommands}\`\`\``);
            return msg.reply('I have sent it to your DMs!');
        }
    }
}

module.exports = HelpCommand;