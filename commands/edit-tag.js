module.exports = {
    name: 'edit-tag',
    description: 'edit a tag',
    usage: '<tag>',
    async execute(message, args){
        const {Tags} = require('../index.js');
        const argsArr = args.join(' ');
        const splitArgs = argsArr.split(' ');
        const tagName = splitArgs.shift();
        const tagDescription = splitArgs.join(' ');

        const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });

	    if (affectedRows > 0) {
		    return message.channel.send(`Tag ${tagName} was edited.`);
	    }

	    return message.reply(`Could not find a tag with name ${tagName}.`);
    }

}