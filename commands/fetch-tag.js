module.exports = {
    name: 'fetch-tag',
    description: 'fetches a tag',
    wip: true,
    execute(message){
        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const tag = Tags.findOne({ where: { name: tagName } });
        if (tag) {
	        // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
	        tag.increment('usage_count');
	        return message.channel.send(tag.get('description'));
        }
        return message.reply(`Could not find tag: ${tagName}`);
    }
}