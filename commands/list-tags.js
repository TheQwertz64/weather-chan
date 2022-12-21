module.exports = {
    name: 'list-tags',
    description: 'list the tags in the server',
    async execute(message){
        const {Tags} = require('../index.js');
        const tagList = await Tags.findAll({ attributes: ['name'] });
        const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
        return message.channel.send(`List of tags: ${tagString}`);

    }
}