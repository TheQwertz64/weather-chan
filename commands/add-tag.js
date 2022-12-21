module.exports = {
    name: 'add-tag',
    description: 'adds a tag',
    args: true,
    usage: '<name>, <description>',
    async execute(message, args){
        const {Tags} = require('../index.js');
        const argsArr = args.join(' ');
        const splitArgs = argsArr.split(' ');
        const tagName = splitArgs.shift();
        const tagDescription = splitArgs.join(' ');

        try {
            // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
            const tag = await Tags.create({
                name: tagName,
                description: tagDescription,
                username: message.author.username,
            });
            return message.reply({content:`Tag ${tag.name} added.`});
        }
        catch (e) {
            console.log(e);
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.reply({content:'That tag already exists.'});
            }
            return message.reply({content:'Something went wrong with adding a tag.'});
        }
    }
    


}