module.exports = {
    name: 'fetch-tag',
    description: 'fetches a tag',
    usage: '<name>',
    wip: true,
    async execute(message, args){
        const {Tags} = require('../index.js');
        const tagName = args;
        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const tag = await Tags.findOne({ where: { name: tagName } });
        if (tag) {
	        // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
	        tag.increment('usage_count');
	        return message.channel.send(tag.get('description'));
        }
        return message.reply(`Could not find tag: ${tagName}`);
    }
}