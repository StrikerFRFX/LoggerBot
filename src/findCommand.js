exports.findCommand = (cmd, msg, fs) => {
    try {
        const CommandsFolder = fs.readdirSync('./commands');
        for (const group of CommandsFolder) {
            try {
                const commands = fs.readdirSync('./commands/' + group);
                for (const command of commands) {
                    if (command.slice(0, -3) === cmd) {
                        const c = require('../commands/' + group + '/' + command);
                        const comm = new c();
                        return comm;
                    }
                }
            } catch (err) {
                msg.reply(`An error occured!\n\`\`\`${err.message}\`\`\`\nPlease check spelling of command, otherwise create a support ticket in the main server and quote this error.`);
            }
        }
    } catch (err) {
        msg.reply(`An error occured!\n\`\`\`${err.message}\`\`\`\nPlease check spelling of command, otherwise otherwise create a support ticket in the main server and quote this error.`);
    }
};
