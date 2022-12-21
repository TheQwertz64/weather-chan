module.exports = {
    name: 'delete-tag',
    description: 'deletes a tag',
    usage: '<name>',
    async execute(message, args){
        const {Tags} = require('../index.js');
        const tagName = args;
        const rowCount = await Tags.destroy({ where: { name: tagName } });
        if (!rowCount) return message.reply('That tag doesn\'t exist.');

        return message.channel.send(`Tag ${args[0]} was deleted.`);

    }

}