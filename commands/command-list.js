const {prefix} = require('../config.json');

module.exports = {
    name: 'command-list',
    description: 'shows the list of commands',
    aliases: '[help]',
    usage:'<command-name>',
    cooldown: 10,
    execute(message, args){
        const data = [];
        const {commands} = message.client;

        if(!args.length) {
            data.push('Here is a list of my commands.');
            data.push(commands.map(commands => commands.name).join('\n'));
            data.push(`\nYou can send \`${prefix}help <command-name>\` to get info on a specific command!`);

            return message.author.send(data, {split:true})
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply({content:'I\'ve sent you a DM with all my commands!'});
                });


        }
        const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
            return message.reply({content:'that\'s not a valid command!'});
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        if (command.wip) data.push(`**Work in Progress:** ${command.wip}`)

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        //fix me
		//message.channel.send({Array: Util.splitMessage(data)});
    },
};